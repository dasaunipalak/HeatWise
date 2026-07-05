def get_heat_drivers(static_features):

    drivers = []

    # Vegetation
    if static_features["NDVI"] < 0.2:
        drivers.append("Low vegetation cover")

    # Built-up area
    if static_features["NDBI"] > 0.2:
        drivers.append("High built-up density")

    # Water
    if static_features["NDWI"] < 0:
        drivers.append("Low water availability")

    # Radiation
    if static_features["Avg_Radiation"] > 65:
        drivers.append("High solar radiation")

    return drivers

