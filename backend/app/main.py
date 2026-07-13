import os
from fastapi import FastAPI
from app.weather import get_live_weather
from app.api.v1.endpoints import map_layers
from app.predictor import predict_temperature
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:3000",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(

    map_layers.router,

    prefix="/api/v1/maps",

    tags=["maps"],

)

@app.on_event("startup")
def startup_event():
    from dotenv import load_dotenv
    import ee

    load_dotenv()

    credentials = ee.ServiceAccountCredentials(
        os.environ["GEE_SERVICE_ACCOUNT_EMAIL"],
        os.environ["GEE_SERVICE_ACCOUNT_KEY_FILE"],
    )

    ee.Initialize(
        credentials,
        project=os.environ["GEE_PROJECT_ID"],
    )



@app.get("/")
def home():
    return {"message": "HeatPulse Backend Running"}


@app.get("/predict")

def predict(
    latitude: float,
    longitude: float,
    ndvi_change: float = 0.0,
    ndbi_change: float = 0.0,
    ndwi_change: float = 0.0,
    radiation_factor: float = 1.0
):
    print(ndvi_change, ndbi_change, ndwi_change, radiation_factor)
    result = predict_temperature(
        latitude,
        longitude,
        ndvi_change,
        ndbi_change,
        ndwi_change,
        radiation_factor
    )

    return {
        "latitude": latitude,
        "longitude": longitude,
        **result
    }
@app.get("/weather")
def weather(latitude: float, longitude: float):
    return get_live_weather(latitude, longitude)