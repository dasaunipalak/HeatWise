# 🔥 HeatWise

HeatWise is an AI-powered urban heat analysis platform that combines satellite imagery, Google Earth Engine, real-time weather data, and machine learning to visualize localized heat patterns and simulate the impact of urban planning interventions.

Designed for planners, researchers, and citizens, HeatWise enables users to explore heat distribution, analyze environmental factors, and evaluate mitigation strategies such as increasing green cover, implementing cool roofs, or modifying urban density.

---

## 🚀 Project Resources

| Resource | Link |
|----------|------|
| 🌐 **Live Website** | https://heat-wise-live.vercel.app/|
| 🎥 **Demo Video** | [demo video](https://www.youtube.com/watch?v=JuyiG5ePe34)|
| 📊 **Project Presentation** | [presentation](https://docs.google.com/presentation/d/1j20lwomEpo0uILYrzzvMT1cyHY-wepGV/edit?slide=id.p6#slide=id.p6)|

---

## 👥 Team Members

- **Ananya** – **UI/UX Design, Frontend Development & Backend Integration**  
  Designed the user interface, developed the dashboard and interactive map interface, integrated frontend components with backend services, and implemented geospatial layer visualizations.

- **Dhruvika Rawat** – **Backend Development, APIs, Google Earth Engine & Simulation Engine**  
  Developed backend services and APIs, integrated Google Earth Engine, and implemented the simulation engine for urban heat mitigation scenarios.

- **Manasvi Sharma** – **Machine Learning, Backend, Geospatial Processing & Deployment**  
  Built the machine learning pipeline, handled geospatial data preprocessing, contributed to backend development, and managed model and application deployment.

- **Palak Dasauni** – **Interactive Mapping, Layer Integration & Testing**  
  Implemented interactive map functionality, integrated geospatial data layers into the frontend, and conducted end-to-end testing and system integration.

---

## ✨ Features

* 🗺️ **Interactive Heat Maps** – Explore land surface temperature with smooth pan-and-zoom visualization that adapts to different map scales.
* 🤖 **AI-Based Temperature Prediction** – Uses an XGBoost model to estimate localized land surface temperatures from environmental features.
* 🌳 **Heat Mitigation Simulator** – Experiment with urban greening, cool roofs, water bodies, and development intensity to observe predicted temperature changes.
* 🌦️ **Live Weather Integration** – Incorporates real-time meteorological data into the prediction pipeline.
* 🌍 **Google Earth Engine Powered** – Retrieves and processes satellite imagery for geospatial analysis.
* ⚡ **FastAPI Backend** – Modular backend architecture with efficient APIs and scalable service integration.

---

## 🛠️ Technology Stack

| Area                 | Technology                            |
| -------------------- | ------------------------------------- |
| **Frontend**         | Next.js, React, Tailwind CSS, Leaflet |
| **Backend**          | FastAPI, Python 3.11+, Uvicorn        |
| **Machine Learning** | XGBoost, Joblib                       |
| **Geospatial**       | Google Earth Engine, Rasterio         |
| **Data Processing**  | Pandas, NumPy                         |

---

## 🏗️ Project Architecture

```text
Satellite Imagery + Live Weather
                │
                ▼
      Google Earth Engine
                │
                ▼
     Feature Extraction Pipeline
                │
                ▼
      XGBoost Prediction Model
                │
                ▼
         FastAPI Backend
                │
                ▼
   Interactive Next.js Dashboard
```

---

## 📂 Project Structure

```text
HeatWise/
├── frontend/
│   ├── src/app/
│   └── src/components/
│       ├── Map
│       ├── Sidebar
│       ├── Legend
│       └── Simulation Controls
│
├── backend/
│   ├── app/
│   │   ├── api/v1/
│   │   ├── services/
│   │   ├── predictor.py
│   │   ├── raster_utils.py
│   │   └── diagnostics.py
│   │
│   ├── data/
│   │   └── india_heat_model.pkl
│   │
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

# ⚙️ Local Setup

## 1. Prerequisites

* Node.js 20+
* Python 3.11+
* Google Cloud Project with Earth Engine API enabled
* Google Cloud Service Account JSON Key
* Homebrew (macOS only, required for XGBoost)

---

## 2. Backend Setup

```bash
cd backend

python3 -m venv .venv
source .venv/bin/activate

# macOS only
brew install libomp

pip install -r requirements.txt
```

### Environment Variables (`backend/.env`)

```env
GEE_PROJECT_ID=your-google-cloud-project-id
GEE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GEE_SERVICE_ACCOUNT_KEY_FILE=/absolute/path/to/service-account.json
CORS_ORIGINS=http://localhost:3000
```

### Run Backend

```bash
uvicorn app.main:app --reload --port 8000
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🧪 Testing & Diagnostics

HeatWise includes diagnostic utilities for validating the prediction pipeline and geospatial processing.

| Script               | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `test_pipeline.py`   | End-to-end pipeline validation              |
| `inspect_model.py`   | Verify model structure and feature ordering |
| `inspect_data.py`    | Validate raster data and extracted features |
| `test_gee_bounds.py` | Test Earth Engine clipping                  |
| `test_gee_stats.py`  | Validate multiscale statistics              |

Run any script using:

```bash
python inspect_model.py
```

---

## 🔒 Security

Do **not** commit the following files:

* `backend/.env`
* Google Earth Engine service account keys
* Proprietary or custom-trained `.pkl` models

Store sensitive credentials securely using environment variables.

---

## 🚀 Future Improvements

* Support additional cities and regions
* Enhanced AI recommendations for urban planning
* 3D heat visualization
* Exportable simulation reports
* Historical and seasonal heat trend analysis
* User-defined intervention scenarios

---

## 📄 License

This project is intended for educational and research purposes.
