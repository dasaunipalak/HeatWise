# HeatWise

HeatWise is an urban heat analysis platform that combines satellite imagery, live weather data, Google Earth Engine, and machine learning to explore local heat conditions and mitigation options.

## Features

- Interactive map with surface temperature, vegetation, built-up, water, and land-use layers
- Google Earth Engine-powered satellite imagery
- Location search and current local weather conditions
- ML-based surface-temperature prediction and intervention simulation
- Light and dark themes
- Responsive viewport-based map-layer loading

## Technology

| Area | Technology |
| --- | --- |
| Frontend | Next.js, React, Tailwind CSS, Leaflet |
| Backend | FastAPI, Python |
| Geospatial data | Google Earth Engine |
| Prediction model | XGBoost, Joblib |

## Project Structure

```text
HeatWise/
├── frontend/                 # Next.js application
├── backend/
│   ├── app/                  # FastAPI application code
│   ├── data/
│   │   └── india_heat_model.pkl
│   ├── requirements.txt
│   └── .env.example
└── README.md
```

## Requirements

- Node.js 20 or later
- Python 3.11 or later
- A Google Cloud project with Google Earth Engine enabled
- An authorized Google Earth Engine service account

## Local Setup

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Create `backend/.env` with the following values:

```env
GEE_PROJECT_ID=your-google-cloud-project-id
GEE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GEE_SERVICE_ACCOUNT_KEY_FILE=/absolute/path/to/gee-service-account.json
CORS_ORIGINS=http://localhost:3000
```

The model file must be available at:

```text
backend/data/india_heat_model.pkl
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment Variables

| Variable | Description |
| --- | --- |
| `GEE_PROJECT_ID` | Google Cloud project used with Earth Engine |
| `GEE_SERVICE_ACCOUNT_EMAIL` | Email address of the Earth Engine service account |
| `GEE_SERVICE_ACCOUNT_KEY_FILE` | Local path to the service-account JSON key |
| `CORS_ORIGINS` | Comma-separated addresses allowed to call the API |

## Security

Never commit the following files:

- `backend/.env`
- Google Earth Engine service-account JSON keys
