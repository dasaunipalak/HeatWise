import pandas as pd

from app.diagnostics import get_heat_drivers
from app.model_loader import model
from app.raster_utils import get_static_features
from app.weather import get_live_weather


def predict_temperature(
    latitude,
    longitude,
    ndvi_change=0.0,
    ndbi_change=0.0,
    radiation_factor=1.0
):

    # Get static features from raster
    static_features = get_static_features(latitude, longitude)
    original_features = static_features.copy()
    
    # print("Original:", static_features)
    drivers = get_heat_drivers(static_features)

    # Apply vegetation intervention
    static_features["NDVI"] = min(
        max(static_features["NDVI"] + ndvi_change, 0.0),
        1.0
    )

    # Apply built-up density intervention
    static_features["NDBI"] = min(
        max(static_features["NDBI"] + ndbi_change, -1.0),
        1.0
    )

    # Apply cool roofs / shading intervention
    static_features["Avg_Radiation"] *= radiation_factor

    # print("After intervention:", static_features)

    # Get live weather
    weather = get_live_weather(latitude, longitude)
#     weather = {
#     "AirTemp": 34.0,
#     "Humidity": 61,
#     "Wind": 17.4
# }
# Original model input

    original_input = {

    "NDVI": original_features["NDVI"],

    "NDBI": original_features["NDBI"],

    "NDWI": original_features["NDWI"],

    "LULC_Map": original_features["LULC_Map"],

    "AirTemp": weather["AirTemp"],

    "Humidity": weather["Humidity"],

    "Wind": weather["Wind"],

    "Elevation": original_features["Elevation"],

    "Avg_Radiation": original_features["Avg_Radiation"],

}

    original_df = pd.DataFrame([original_input])

    original_df = original_df[model.feature_names_in_]

    original_prediction = model.predict(original_df)

    # Prepare model input
    features = {
        "NDVI": static_features["NDVI"],
        "NDBI": static_features["NDBI"],
        "NDWI": static_features["NDWI"],
        "LULC_Map": static_features["LULC_Map"],
        "AirTemp": weather["AirTemp"],
        "Humidity": weather["Humidity"],
        "Wind": weather["Wind"],
        "Elevation": static_features["Elevation"],
        "Avg_Radiation": static_features["Avg_Radiation"],
    }

    input_df = pd.DataFrame([features])
    input_df = input_df[model.feature_names_in_]

    # print(input_df)
    prediction = model.predict(input_df)
    current_temperature = float(original_prediction[0])
    predicted_temperature = float(prediction[0])
    temperature_change = predicted_temperature - current_temperature
    # print("Predicted temperature:", float(prediction[0]))

    return {
    "current_temperature": current_temperature,
    "predicted_temperature": predicted_temperature,
    "temperature_change": temperature_change,
    "weather": weather,
    "static_features": static_features,
    "drivers": drivers
}