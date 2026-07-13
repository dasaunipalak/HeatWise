from app.model_loader import model
import pandas as pd

# Create a baseline row
baseline = {
    'NDVI': 0.15,
    'NDBI': 0.20,
    'NDWI': 0.05,
    'LULC_Map': 2.0,
    'AirTemp': 34.0,
    'Humidity': 60.0,
    'Wind': 15.0,
    'Elevation': 120.0,
    'Avg_Radiation': 15.0
}

def predict(modifications):
    row = baseline.copy()
    row.update(modifications)
    df = pd.DataFrame([row])
    df = df[model.feature_names_in_]
    return model.predict(df)[0]

base_temp = predict({})
print(f"Baseline: {base_temp:.2f}C")

print("\n--- Sweeping NDVI (higher should be cooler) ---")
print(f"NDVI 0.05 (less green): {predict({'NDVI': 0.05}):.2f}C")
print(f"NDVI 0.15 (baseline)  : {predict({'NDVI': 0.15}):.2f}C")
print(f"NDVI 0.25 (more green): {predict({'NDVI': 0.25}):.2f}C")
print(f"NDVI 0.45 (much green): {predict({'NDVI': 0.45}):.2f}C")

print("\n--- Sweeping NDBI (higher should be hotter) ---")
print(f"NDBI 0.00 (less built): {predict({'NDBI': 0.00}):.2f}C")
print(f"NDBI 0.20 (baseline)  : {predict({'NDBI': 0.20}):.2f}C")
print(f"NDBI 0.40 (more built): {predict({'NDBI': 0.40}):.2f}C")
print(f"NDBI 0.60 (much built): {predict({'NDBI': 0.60}):.2f}C")

print("\n--- Sweeping NDWI (higher should be cooler) ---")
print(f"NDWI 0.00 (less water): {predict({'NDWI': 0.00}):.2f}C")
print(f"NDWI 0.05 (baseline)  : {predict({'NDWI': 0.05}):.2f}C")
print(f"NDWI 0.20 (more water): {predict({'NDWI': 0.20}):.2f}C")

print("\n--- Sweeping Radiation (lower should be cooler) ---")
print(f"Rad 10.0 (less sun) : {predict({'Avg_Radiation': 10.0}):.2f}C")
print(f"Rad 15.0 (baseline) : {predict({'Avg_Radiation': 15.0}):.2f}C")
print(f"Rad 20.0 (more sun) : {predict({'Avg_Radiation': 20.0}):.2f}C")

