from fastapi import FastAPI

from app.predictor import predict_temperature

app = FastAPI()


@app.get("/")
def home():
    return {"message": "HeatPulse Backend Running"}


@app.get("/predict")
def predict(
    latitude: float,
    longitude: float,
    plant_trees: bool = False,
    cool_roofs: bool = False
):

    result = predict_temperature(
    latitude,
    longitude,
    plant_trees,
    cool_roofs
)

    return {
        "latitude": latitude,
        "longitude": longitude,
        **result
    }