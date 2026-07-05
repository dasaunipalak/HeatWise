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

def get_static_features(latitude, longitude):
   
    point = ee.Geometry.Point([longitude, latitude])


    s2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED") \
           .filterBounds(point) \
           .filterDate('2026-01-01', '2026-07-05') \
           .median()
    

    dem = ee.Image("USGS/SRTMGL1_003")
    

    lulc = ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1") \
             .filterBounds(point) \
             .median()


    rad = ee.ImageCollection("ECMWF/ERA5_LAND/DAILY_AGGR") \
            .select('surface_solar_radiation_downwards_sum') \
            .filterDate('2026-06-01', '2026-07-05') \
            .median()


    def get_val(img, band_name):
        res = img.reduceRegion(reducer=ee.Reducer.first(), geometry=point, scale=30).get(band_name)
        return res.getInfo()

  
    features = {
        "NDVI": float(get_val(s2.normalizedDifference(['B8', 'B4']), 'nd') or 0),
        "NDBI": float(get_val(s2.normalizedDifference(['B11', 'B8']), 'nd') or 0),
        "NDWI": float(get_val(s2.normalizedDifference(['B3', 'B8']), 'nd') or 0),
        "LULC_Map": int(get_val(lulc, 'label') or 0),
        "Elevation": float(get_val(dem, 'elevation') or 0),
        "Avg_Radiation": float(get_val(rad, 'surface_solar_radiation_downwards_sum') or 0),
        
    }
    
    return features