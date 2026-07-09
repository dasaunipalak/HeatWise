import ee
from functools import lru_cache
from datetime import datetime, timedelta

# Metadata ensures color mapping is fixed to physical data values
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
                "#7F1D1D"
            ]
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
                "#166534"
            ]
        },
    },

    "ndbi_builtup": {
        "vis": {
            "min": -0.05,
            "max": 0.30,
            "palette": [
                "#16a34a",  # Green
                "#84cc16",  # Lime
                "#facc15",  # Yellow
                "#fb923c",  # Orange
                "#ef4444",  # Red
                "#991b1b"   # Dark red
            ]
        }
    },

    "ndwi_water": {
        "vis": {
            "min": -0.2,
            "max": 0.5,
            "palette": [
                "#854d0e",
                "#06b6d4",
                "#1d4ed8"
            ]
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
                "#7A87C6",  # Flooded Vegetation
                "#E49635",  # Crops
                "#DFC35A",  # Shrub & Scrub
                "#C4281B",  # Built Area
                "#A59B8F",  # Bare Ground
                "#B39FE1"   # Snow/Ice
            ]
        }
    }
}

# @lru_cache(maxsize=32)
def get_gee_tile_url(
    layer_type: str,
    north: float,
    south: float,
    east: float,
    west: float
):
    try:
        geometry = ee.Geometry.Rectangle(
            [west, south, east, north]
        )
        end_date = datetime.utcnow()

        modis_start = (end_date - timedelta(days=30)).strftime("%Y-%m-%d")
        sentinel_start = (end_date - timedelta(days=180)).strftime("%Y-%m-%d")
        lulc_start = (end_date - timedelta(days=365)).strftime("%Y-%m-%d")
        today = end_date.strftime("%Y-%m-%d")

        if layer_type == "surface_temp":
            image = (
                ee.ImageCollection("MODIS/006/MOD11A1")
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
                .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
                .sort("CLOUDY_PIXEL_PERCENTAGE")
                .median()
                .normalizedDifference(["B8", "B4"])
                .clip(geometry)
            )
        elif layer_type == "ndbi_builtup":
            image = (
                ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
                .filterBounds(geometry)
                .filterDate(sentinel_start, today)
                .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
                .sort("CLOUDY_PIXEL_PERCENTAGE")
                .median()
                .normalizedDifference(["B11", "B8"])
                .clip(geometry)
            )
        elif layer_type == "ndwi_water":
            image = (
                ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
                .filterBounds(geometry)
                .filterDate(sentinel_start, today)
                .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
                .sort("CLOUDY_PIXEL_PERCENTAGE")
                .median()
                .normalizedDifference(["B3", "B8"])
                .clip(geometry)
            )
        elif layer_type == "lulc_classification":
            image = (
                ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1")
                .filterBounds(geometry)
                .filterDate(lulc_start, today)
                .mode()
                .select("label")
                .clip(geometry)
            )
        else:
            return None

        viz_params = LAYER_METADATA[layer_type]["vis"]
        map_id = image.getMapId(viz_params)
        print("Tile URL:", map_id["tile_fetcher"].url_format)
        return map_id['tile_fetcher'].url_format
    except Exception as e:
        print(f"GEE Error: {e}")
        return None