from fastapi import FastAPI
from app.api.v1.endpoints import map_layers
from app.predictor import predict_temperature

app = FastAPI()

app.include_router(

    map_layers.router,

    prefix="/api/v1/maps",

    tags=["maps"],

)

@app.on_event("startup")
def startup_event():
    import os
    from dotenv import load_dotenv
    import ee
    load_dotenv()
    PROJECT_ID = os.getenv('GEE_PROJECT_ID')
    ee.Initialize(project=PROJECT_ID)



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