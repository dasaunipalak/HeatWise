import ee

from datetime import datetime, timedelta

ZONE_RADIUS_METERS = 1_000

DYNAMIC_WORLD_CLASSES = [
    "water",
    "trees",
    "grass",
    "flooded_vegetation",
    "crops",
    "shrub_and_scrub",
    "built",
    "bare",
    "snow_and_ice",
]


def get_static_features(latitude, longitude, radius_meters=ZONE_RADIUS_METERS):
    """Return zone-average features and confident land-cover shares."""
    point = ee.Geometry.Point([longitude, latitude])
    zone = point.buffer(radius_meters)

    # Avoid requesting incomplete imagery from the most recent few days.
    end_date = datetime.utcnow().date() - timedelta(days=7)
    start_date = end_date - timedelta(days=60)

    start = start_date.isoformat()
    end = (end_date + timedelta(days=1)).isoformat()

    sentinel = (
        ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
        .filterBounds(zone)
        .filterDate(start, end)
        .filter(ee.Filter.lte("CLOUDY_PIXEL_PERCENTAGE", 20))
        .median()
    )

    dynamic_world_collection = (
        ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1")
        .filterBounds(zone)
        .filterDate(start, end)
    )

    # Mean probabilities are more reliable than treating every hard label as fact.
    dynamic_world_probabilities = (
        dynamic_world_collection
        .select(DYNAMIC_WORLD_CLASSES)
        .mean()
    )

    # Highest-probability land class for each pixel, then the zone's most common class.
    dominant_pixel_class = (
        dynamic_world_probabilities
        .toArray()
        .arrayArgmax()
        .arrayGet([0])
        .rename("label")
    )

    dem = ee.Image("USGS/SRTMGL1_003")

    radiation = (
        ee.ImageCollection("ECMWF/ERA5_LAND/DAILY_AGGR")
        .select("surface_solar_radiation_downwards_sum")
        .filterDate(start, end)
        .median()
    )

    def get_mean(image, band_name, scale=30):
        value = image.reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=zone,
            scale=scale,
            maxPixels=10_000_000,
        ).get(band_name).getInfo()

        return float(value) if value is not None else 0.0

    def get_mode(image, band_name, scale=10):
        value = image.reduceRegion(
            reducer=ee.Reducer.mode(),
            geometry=zone,
            scale=scale,
            maxPixels=10_000_000,
        ).get(band_name).getInfo()

        return int(value) if value is not None else 0

    max_probability = dynamic_world_probabilities.reduce(ee.Reducer.max())

    built_probability = dynamic_world_probabilities.select("built")
    water_probability = dynamic_world_probabilities.select("water")

    # Trees, grass and shrubs are urban/natural greenery.
    # Crops are deliberately excluded from heat-mitigation green cover.
    green_probability = (
        dynamic_world_probabilities
        .select(["trees", "grass", "shrub_and_scrub"])
        .reduce(ee.Reducer.sum())
    )

    # A pixel counts only when that class is both dominant and reasonably confident.
    built_up_mask = (
        built_probability.gte(0.60)
        .And(built_probability.eq(max_probability))
        .rename("cover")
    )

    water_mask = (
        water_probability.gte(0.60)
        .And(water_probability.eq(max_probability))
        .rename("cover")
    )

    vegetation_mask = (
        green_probability.gte(0.50)
        .And(green_probability.gte(max_probability))
        .rename("cover")
    )

    return {
        "NDVI": get_mean(
            sentinel.normalizedDifference(["B8", "B4"]),
            "nd",
            10,
        ),
        "NDBI": get_mean(
            sentinel.normalizedDifference(["B11", "B8"]),
            "nd",
            20,
        ),
        "NDWI": get_mean(
            sentinel.normalizedDifference(["B3", "B8"]),
            "nd",
            10,
        ),
        "LULC_Map": get_mode(dominant_pixel_class, "label"),
        "Elevation": get_mean(dem, "elevation", 30),
        "Avg_Radiation": get_mean(
            radiation,
            "surface_solar_radiation_downwards_sum",
            11_000,
        ),
        "Vegetation_Cover": get_mean(vegetation_mask, "cover", 10),
        "BuiltUp_Cover": get_mean(built_up_mask, "cover", 10),
        "Water_Cover": get_mean(water_mask, "cover", 10),
        "Zone_Radius_Meters": radius_meters,
    }
