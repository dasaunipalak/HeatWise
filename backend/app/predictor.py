import pandas as pd

from app.diagnostics import get_heat_drivers

from app.model_loader import model
from app.raster_utils import get_static_features
from app.weather import get_live_weather


def predict_temperature(
    latitude,
    longitude,
    plant_trees=False,
    cool_roofs=False
):

    # Get static features from raster
    static_features = get_static_features(latitude, longitude)
    drivers = get_heat_drivers(static_features)

    # Simulate planting trees
    if plant_trees:
        static_features["NDVI"] = min(
            static_features["NDVI"] + 0.2,
            1.0
        )

    # Simulate cool roofs
    if cool_roofs:
        static_features["Avg_Radiation"] *= 0.8

    # Get live weather
    weather = get_live_weather(latitude, longitude)

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

    prediction = model.predict(input_df)

    return {
    "predicted_temperature": float(prediction[0]),
    "weather": weather,
    "static_features": static_features,
    "drivers": drivers
}
