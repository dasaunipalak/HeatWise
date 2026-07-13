import requests


def get_aqi_status(aqi):
    if aqi is None:
        return "Unavailable"
    if aqi <= 50:
        return "Good"
    if aqi <= 100:
        return "Moderate"
    if aqi <= 150:
        return "Unhealthy for sensitive groups"
    if aqi <= 200:
        return "Unhealthy"
    return "Very unhealthy"


def get_live_weather(latitude, longitude):
    weather_response = requests.get(
        "https://api.open-meteo.com/v1/forecast",
        params={
            "latitude": latitude,
            "longitude": longitude,
            "current": (
                "temperature_2m,relative_humidity_2m,"
                "wind_speed_10m,wind_direction_10m"
            ),
        },
        timeout=10,
    )
    weather_response.raise_for_status()
    current = weather_response.json()["current"]

    air_quality_response = requests.get(
        "https://air-quality-api.open-meteo.com/v1/air-quality",
        params={
            "latitude": latitude,
            "longitude": longitude,
            "current": "us_aqi",
        },
        timeout=10,
    )
    air_quality_response.raise_for_status()
    aqi = air_quality_response.json().get("current", {}).get("us_aqi")

    return {
        "AirTemp": current["temperature_2m"],
        "Humidity": current["relative_humidity_2m"],
        "Wind": current["wind_speed_10m"],
        "WindDirection": current["wind_direction_10m"],
        "AQI": aqi,
        "AQIStatus": get_aqi_status(aqi),
    }