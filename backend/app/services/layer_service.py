import ee
from functools import lru_cache

# Metadata ensures color mapping is fixed to physical data values
LAYER_METADATA = {
    "surface_temp": {
        "vis": {"min": 0, "max": 60, "palette": ["#1D4ED8", "#06B6D4", "#22C55E", "#FACC15", "#F97316", "#DC2626", "#7F1D1D"]},
    },
    "ndvi_veg": {
        "vis": {"min": -1, "max": 1, "palette": ["#3B82F6", "#9CA3AF", "#FACC15", "#4ADE80", "#166534"]},
    },
    "ndbi_builtup": {
        "vis": {"min": 0, "max": 1, "palette": ["#22C55E", "#FACC15", "#EF4444"]},
    },
    "ndwi_water": {
        "vis": {"min": -1, "max": 1, "palette": ["#854d0e", "#06b6d4", "#1d4ed8"]},
    },
    "lulc_classification": {
        "vis": {"min": 1, "max": 10, "palette": ["#006400", "#ffbb22", "#ffff4c", "#f096ff", "#fa0000"]}
    }
}

@lru_cache(maxsize=32)
def get_gee_tile_url(layer_type: str):
    try:
        if layer_type == "surface_temp":
            image = ee.ImageCollection("MODIS/006/MOD11A1").first().select('LST_Day_1km').multiply(0.02).subtract(273.15)
        elif layer_type == "ndvi_veg":
            image = ee.ImageCollection("COPERNICUS/S2_SR").first().normalizedDifference(['B8', 'B4'])
        elif layer_type == "ndbi_builtup":
            image = ee.ImageCollection("COPERNICUS/S2_SR").first().normalizedDifference(['B11', 'B8'])
        elif layer_type == "ndwi_water":
            image = ee.ImageCollection("COPERNICUS/S2_SR").first().normalizedDifference(['B3', 'B8'])
        elif layer_type == "lulc_classification":
            image = ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1").first().select('label')
        else:
            return None

        viz_params = LAYER_METADATA[layer_type]["vis"]
        map_id = image.getMapId(viz_params)
        return map_id['tile_fetcher'].url_format
    except Exception as e:
        print(f"GEE Error: {e}")
        return None