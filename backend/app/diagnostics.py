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

def get_recommendations(static_features, temperature, drivers):
    recommendations = []

    if temperature >= 42:
        recommendations.append({
            "priority": "critical",
            "title": "Immediate heat protection",
            "message": (
                f"Predicted surface temperature is {temperature:.1f}°C. "
                "Provide shade, drinking water, cooling stations, and heat warnings."
            )
        })

    if "Low vegetation cover" in drivers:
        recommendations.append({
            "priority": "high",
            "title": "Increase tree and shade cover",
            "message": (
                "Low vegetation is contributing to heat. Prioritize native shade trees, "
                "green corridors, and shaded pedestrian routes."
            )
        })

    if "High built-up density" in drivers:
        recommendations.append({
            "priority": "high",
            "title": "Reduce heat from built surfaces",
            "message": (
                "Dense built-up surfaces are storing heat. Use cool roofs, reflective paving, "
                "and shaded parking or streets."
            )
        })

    if "Low water availability" in drivers:
        recommendations.append({
            "priority": "medium",
            "title": "Improve local cooling and water retention",
            "message": (
                "Low water presence reduces natural cooling. Add rain gardens, permeable areas, "
                "and maintain suitable local water features."
            )
        })

    if "High solar radiation" in drivers:
        recommendations.append({
            "priority": "medium",
            "title": "Reduce direct solar exposure",
            "message": (
                "High solar radiation is increasing heat. Add shade structures, solar canopies, "
                "and high-reflectance roofs."
            )
        })

    if not recommendations:
        recommendations.append({
            "priority": "low",
            "title": "Maintain current conditions",
            "message": (
                "No dominant heat driver was detected. Continue monitoring temperature, "
                "vegetation, and built-up expansion in this area."
            )
        })

    return recommendations