import asyncio
from app.predictor import predict_temperature
import pandas as pd

# Hardcoded location (Lucknow)
lat = 26.8467
lon = 80.9462

def run_test(name, ndvi_change, ndbi_change, ndwi_change, radiation_factor):
    print(f"--- Test: {name} ---")
    print(f"Inputs: NDVI {ndvi_change}, NDBI {ndbi_change}, NDWI {ndwi_change}, Rad {radiation_factor}")
    result = predict_temperature(lat, lon, ndvi_change, ndbi_change, ndwi_change, radiation_factor)
    
    print(f"Original NDVI: {result['original_features']['NDVI']} -> Modified NDVI: {result['static_features']['NDVI']}")
    print(f"Original NDBI: {result['original_features']['NDBI']} -> Modified NDBI: {result['static_features']['NDBI']}")
    print(f"Original NDWI: {result['original_features']['NDWI']} -> Modified NDWI: {result['static_features']['NDWI']}")
    print(f"Original Rad: {result['original_features']['Avg_Radiation']} -> Modified Rad: {result['static_features']['Avg_Radiation']}")
    
    print(f"Baseline Temp: {result['current_temperature']}°C")
    print(f"Predicted Temp: {result['predicted_temperature']}°C")
    print(f"Net Change: {result['temperature_change']}°C")
    print("\n")

if __name__ == "__main__":
    run_test("User Bug Example", -0.027, 0.04, -0.0225, 1.0)
    run_test("A: Urban Greening +30%", 0.30, 0, 0, 1.0)
    run_test("B: Urban Greening -30%", -0.30, 0, 0, 1.0)
    run_test("C: Dev +20%", 0, 0.20, 0, 1.0)
    run_test("D: Dev -20%", 0, -0.20, 0, 1.0)
    run_test("E: Water +15%", 0, 0, 0.15, 1.0)
    run_test("F: Water -15%", 0, 0, -0.15, 1.0)
    run_test("G: Cool Roofs 100%", 0, 0, 0, 0.8)

