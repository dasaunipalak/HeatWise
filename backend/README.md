### HeatWise Backend
HeatWise is a geospatial AI service that predicts local temperatures by synthesizing satellite data from Google Earth Engine, live weather updates, and a machine learning regression model.

## 🚀 Key Features
Geospatial Processing: Fetches real-time environmental data (NDVI, NDBI, NDWI, Radiation) using Google Earth Engine.

Predictive Analytics: Uses a high-performance XGBoost model to estimate localized heat profiles.

Production-Ready API: Built with FastAPI, featuring modular diagnostics and environmental isolation.

## 🛠 Prerequisites
Python 3.11+

Homebrew (for macOS users)

Google Earth Engine account [Sign up here](https://signup.earthengine.google.com/) to get your project access.

## ⚙️ Setup Instructions
# 1. Clone the repository
Bash
git clone <your-repository-url>
cd backend
# 2. Prepare the Environment
Create a .env file from the example:

Bash
cp .env.example .env
Open the .env file and add your Google Cloud Project ID:

Plaintext
GEE_PROJECT_ID=your-project-id-here
# 3. Install Dependencies
Bash
# Install system-level dependencies for XGBoost
brew install libomp

# Install Python requirements
pip install -r requirements.txt
# 4. Model Setup
Since the model file is excluded from Git for security, please:

Place your india_heat_model.pkl file into the /data folder.

Ensure the directory structure looks like this:

HEATWISE
backend/
├── app/
├── data/
│   └── india_heat_model.pkl
├── .env
└── requirements.txt
# 5. Run the Application
Bash
uvicorn app.main:app --reload
The API will be available at http://127.0.0.1:8000.