import os
from dotenv import load_dotenv
import ee

load_dotenv() 
PROJECT_ID = os.getenv('GEE_PROJECT_ID')

try:
    ee.Initialize(project=PROJECT_ID)
except Exception:
    ee.Authenticate()
    ee.Initialize(project=PROJECT_ID)

ZONE_RADIUS_METERS = 1_000


def get_static_features(latitude, longitude, radius_meters=ZONE_RADIUS_METERS):
    """Return mean satellite features and classified cover for a circular zone."""
    point = ee.Geometry.Point([longitude, latitude])
    zone = point.buffer(radius_meters)


    s2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED") \
           .filterBounds(zone) \
           .filterDate('2026-01-01', '2026-07-05') \
           .median()
    

    dem = ee.Image("USGS/SRTMGL1_003")
    

    lulc = ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1") \
             .filterBounds(zone) \
             .filterDate('2026-01-01', '2026-07-05') \
             .select('label') \
             .mode()


    rad = ee.ImageCollection("ECMWF/ERA5_LAND/DAILY_AGGR") \
            .select('surface_solar_radiation_downwards_sum') \
            .filterDate('2026-06-01', '2026-07-05') \
            .median()


    def get_mean(img, band_name, scale=30):
        value = img.reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=zone,
            scale=scale,
            maxPixels=10_000_000,
        ).get(band_name).getInfo()
        return float(value) if value is not None else 0.0

    def get_mode(img, band_name, scale=10):
        value = img.reduceRegion(
            reducer=ee.Reducer.mode(),
            geometry=zone,
            scale=scale,
            maxPixels=10_000_000,
        ).get(band_name).getInfo()
        return int(value) if value is not None else 0

    # Dynamic World labels: water=0, trees=1, grass=2, flooded vegetation=3,
    # crops=4, shrub/scrub=5, built area=6, bare ground=7, snow/ice=8.
    vegetation_mask = lulc.remap([1, 2, 3, 4, 5], [1, 1, 1, 1, 1], 0).rename('cover')
    built_up_mask = lulc.eq(6).rename('cover')
    water_mask = lulc.eq(0).rename('cover')

  
    features = {
        "NDVI": get_mean(s2.normalizedDifference(['B8', 'B4']), 'nd', 10),
        "NDBI": get_mean(s2.normalizedDifference(['B11', 'B8']), 'nd', 20),
        "NDWI": get_mean(s2.normalizedDifference(['B3', 'B8']), 'nd', 10),
        "LULC_Map": get_mode(lulc, 'label'),
        "Elevation": get_mean(dem, 'elevation', 30),
        "Avg_Radiation": get_mean(rad, 'surface_solar_radiation_downwards_sum', 11_000),
        "Vegetation_Cover": get_mean(vegetation_mask, 'cover', 10),
        "BuiltUp_Cover": get_mean(built_up_mask, 'cover', 10),
        "Water_Cover": get_mean(water_mask, 'cover', 10),
        "Zone_Radius_Meters": radius_meters,
    }
    
    return features
