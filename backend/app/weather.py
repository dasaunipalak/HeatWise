import requests


def get_live_weather(latitude, longitude):

    url = "https://api.open-meteo.com/v1/forecast"

    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,relative_humidity_2m,wind_speed_10m"
    }

    response = requests.get(url, params=params)

    data = response.json()

    current = data["current"]

    # print(current)

    return {
        "AirTemp": current["temperature_2m"],
        "Humidity": current["relative_humidity_2m"],
        "Wind": current["wind_speed_10m"]
    }