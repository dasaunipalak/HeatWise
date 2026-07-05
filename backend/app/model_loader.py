import joblib
import pandas as pd
import rasterio
from pathlib import Path
BASE_DIR = Path(_file_).resolve().parent.parent
MODEL_PATH = BASE_DIR / "data" / "lucknow_heat_model.pkl"
CSV_PATH = BASE_DIR / "data" / "lucknow_static_fabric.csv"
TIFF_PATH = BASE_DIR / "data" / "Lucknow_Training_v7.tif"

model = joblib.load(MODEL_PATH)

static_df = pd.read_csv(CSV_PATH)

raster = rasterio.open(TIFF_PATH)

print("✅ Model Loaded")

print("✅ CSV Loaded")

print("✅ Raster Loaded")

print(model.feature_importances_)
print(model.feature_names_in_)