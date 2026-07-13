import ee

from datetime import datetime, timedelta
from functools import lru_cache


LAYER_METADATA = {
    "surface_temp": {
        "vis": {
            "min": 30,
            "max": 45,
            "palette": [
                "#1D4ED8",
                "#06B6D4",
                "#22C55E",
                "#FACC15",
                "#F97316",
                "#DC2626",
                "#7F1D1D",
            ],
        },
    },
    "ndvi_veg": {
        "vis": {
            "min": 0,
            "max": 0.8,
            "palette": [
                "#3B82F6",
                "#9CA3AF",
                "#FACC15",
                "#4ADE80",
                "#166534",
            ],
        },
    },
    "ndbi_builtup": {
        "vis": {
            "min": -0.05,
            "max": 0.30,
            "palette": [
                "#16A34A",
                "#84CC16",
                "#FACC15",
                "#FB923C",
                "#EF4444",
                "#991B1B",
            ],
        },
    },
    "ndwi_water": {
        "vis": {
            "min": -0.2,
            "max": 0.5,
            "palette": [
                "#854D0E",
                "#06B6D4",
                "#1D4ED8",
            ],
        },
    },
    "lulc_classification": {
        "vis": {
            "min": 0,
            "max": 8,
            "palette": [
                "#419BDF",  # Water
                "#397D49",  # Trees
                "#88B053",  # Grass
                "#7A87C6",  # Flooded vegetation
                "#E49635",  # Crops
                "#DFC35A",  # Shrub & scrub
                "#C4281B",  # Built area
                "#A59B8F",  # Bare ground
                "#B39FE1",  # Snow and ice
            ],
        },
    },
}


@lru_cache(maxsize=64)
def get_gee_tile_url(layer_type: str, date_key: str, bounds_key: str):
    """
    Build one cached Earth Engine tile URL for the active map viewport.

    Nearby map views reuse a normalized, buffered bounds key.
    """
    if layer_type not in LAYER_METADATA:
        return None

    try:
        west, south, east, north = map(float, bounds_key.split(","))
        geometry = ee.Geometry.Rectangle([west, south, east, north], None, False)

        end_date = datetime.strptime(date_key, "%Y-%m-%d")

        modis_start = (end_date - timedelta(days=30)).strftime("%Y-%m-%d")
        sentinel_start = (end_date - timedelta(days=60)).strftime("%Y-%m-%d")
        lulc_start = (end_date - timedelta(days=90)).strftime("%Y-%m-%d")
        today = end_date.strftime("%Y-%m-%d")

        if layer_type == "surface_temp":
            image = (
                ee.ImageCollection("MODIS/061/MOD11A1")
                .filterBounds(geometry)
                .filterDate(modis_start, today)
                .select("LST_Day_1km")
                .median()
                .multiply(0.02)
                .subtract(273.15)
                .clip(geometry)
            )

        elif layer_type == "ndvi_veg":
            image = (
                ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
                .filterBounds(geometry)
                .filterDate(sentinel_start, today)
                .filter(ee.Filter.lte("CLOUDY_PIXEL_PERCENTAGE", 20))
                .median()
                .normalizedDifference(["B8", "B4"])
                .clip(geometry)
            )

        elif layer_type == "ndbi_builtup":
            image = (
                ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
                .filterBounds(geometry)
                .filterDate(sentinel_start, today)
                .filter(ee.Filter.lte("CLOUDY_PIXEL_PERCENTAGE", 20))
                .median()
                .normalizedDifference(["B11", "B8"])
                .clip(geometry)
            )

        elif layer_type == "ndwi_water":
            image = (
                ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
                .filterBounds(geometry)
                .filterDate(sentinel_start, today)
                .filter(ee.Filter.lte("CLOUDY_PIXEL_PERCENTAGE", 20))
                .median()
                .normalizedDifference(["B3", "B8"])
                .clip(geometry)
            )

        elif layer_type == "lulc_classification":
            image = (
                ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1")
                .filterBounds(geometry)
                .filterDate(lulc_start, today)
                .select("label")
                .mode()
                .clip(geometry)
            )

        else:
            return None

        map_id = image.getMapId(LAYER_METADATA[layer_type]["vis"])

        return map_id["tile_fetcher"].url_format

    except Exception as error:
        print(f"GEE error while creating {layer_type}: {error}")
        return None
