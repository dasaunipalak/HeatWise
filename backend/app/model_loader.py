import joblib
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "data" / "india_heat_model.pkl"


model = joblib.load(MODEL_PATH)


print("✅ Model Loaded")


print(model.feature_importances_)
print(model.feature_names_in_)