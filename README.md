# 🚀 HeatWise

> AI-powered Urban Heat Intelligence Platform for Visualizing, Predicting, and Simulating Heat Mitigation Strategies.

---

## 📌 Problem & Domain

Rising temperatures, rapid urban development, and shrinking green spaces have made localized heat a growing challenge for cities. However, understanding how land cover, vegetation, built-up areas, and weather conditions contribute to heat requires specialized geospatial tools that are often inaccessible to planners, researchers, and communities.

HeatWise addresses this challenge by combining satellite imagery, real-time weather data, machine learning, and geospatial analytics into an interactive platform. Users can visualize heat distribution, explore environmental factors, and simulate mitigation strategies such as increasing green cover or adopting cool roofs to support data-driven urban planning and climate-resilient decision-making.

**Themes Selected:**

- ✅ Climate & Sustainability Systems
- ✅ Infrastructure, Mobility & Smart Systems
- ✅ Public Systems, Governance & Civic Tech

---

## 🎯 Objective

HeatWise empowers urban planners, researchers, policymakers, and communities to understand and mitigate urban heat.

### Target Users

- Urban Planners
- Municipal Corporations
- Environmental Researchers
- Smart City Authorities
- Students & Citizens

### Pain Point

Current urban heat analysis often requires multiple GIS tools, technical expertise, and fragmented datasets, making it difficult to evaluate heat mitigation strategies efficiently.

### Our Solution

HeatWise provides an AI-powered interactive platform that allows users to:

- Visualize real-time geospatial heat data
- Explore environmental layers
- Predict localized surface temperatures
- Simulate mitigation strategies such as increasing vegetation or cool roofs
- Receive actionable recommendations for sustainable urban development

---

## 🧠 Team & Approach

### Team Name:

GeoForge

### Team Members:

- **Ananya** — **GitHub:** [Ananya0907](https://github.com/Ananya0907) | **LinkedIn:** [Ananya](https://www.linkedin.com/in/ananya-bb8020381/) | **Role:** UI/UX Design, Frontend Development & Backend Integration

- **Dhruvika Rawat** — **GitHub:** [dhruvika05](https://github.com/dhruvika05) | **LinkedIn:** [Dhruvika Rawat](https://www.linkedin.com/in/dhruvika-rawat-821633377/) | **Role:** Backend Development, APIs, Google Earth Engine & Simulation Engine

- **Manasvi Sharma** — **GitHub:** [manasvisharma2231](https://github.com/manasvisharma2231) | **LinkedIn:** [Manasvi Sharma](https://www.linkedin.com/in/manasvi-sharma-a29901366/) | **Role:** Machine Learning, Backend, Geospatial Processing & Deployment

- **Palak Dasauni** — **GitHub:** [dasaunipalak](https://github.com/dasaunipalak) | **LinkedIn:** [Palak Dasauni](https://www.linkedin.com/in/palakdasauni/) | **Role:** Interactive Mapping, Layer Integration & Testing

### Our Approach:

Urban heat affects millions of people, yet most available solutions are either static or require specialized GIS expertise.

Our goal was to build an intuitive platform where anyone could visualize urban heat conditions, understand contributing factors, and immediately test mitigation strategies.

During development we faced challenges including:

- Processing large satellite datasets efficiently
- Integrating Google Earth Engine with FastAPI
- Building smooth interactive map visualizations
- Designing realistic heat mitigation simulations

By combining machine learning with geospatial analysis, we created a platform capable of both visualization and scenario-based decision support.

---

## 🛠️ Tech Stack

### Core Technologies Used:
- Frontend: React, TypeScript, Tailwind CSS, Leaflet
- Backend: FastAPI, Python
- Database: XGBoost, Scikit-learn, Pandas, NumPy
- APIs: Google Earth Engine API, Open-Meteo Weather API, Open-Meteo Air Quality API,  OpenStreetMap Nominatim API
- Geospatial: Google Earth Engine, Rasterio, GeoPandas
- Hosting: Vercel (Frontend), Render (Backend)

### Additional Technologies Used:

- ✅ AI / Machine Learning
- ✅ Cloud

---

## ✨ Key Features

- ✅ Interactive heat map visualization using satellite imagery
- ✅ Multiple geospatial layers including LST, NDVI, NDBI, NDWI and Land Use
- ✅ AI-powered localized surface temperature prediction
- ✅ Urban heat mitigation simulation (Green Cover, Cool Roofs, Development Density)
- ✅ Dynamic recommendations for climate-resilient planning
- ✅ Real-time weather integration
- ✅ Interactive map interface with location search

---

## 📽️ Demo & Deliverables

- **Demo Video Link:** [Watch on YouTube](https://www.youtube.com/watch?v=JuyiG5ePe34)
- **Deployment Link:** [HeatWise Live](https://heat-wise-live.vercel.app/)
- **Pitch Deck/PPT:** [View Presentation](https://docs.google.com/presentation/d/1j20lwomEpo0uILYrzzvMT1cyHY-wepGV/edit?slide=id.p1#slide=id.p1)
---

## 🧪 How to Run the Project

## Requirements:

- Python 3.11+
- Node.js 20+
- Google Earth Engine Account
- OpenWeather API Key

---
## Local Setup :

### Backend

```bash
git clone https://github.com/dasaunipalak/HeatWise.git

cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

###
Frontend

```bash
cd frontend

npm install

npm run dev
```

---

### Environment Variables

Create a `.env` file.

```env
OPENWEATHER_API_KEY=YOUR_API_KEY

GEE_PROJECT=YOUR_PROJECT_ID
```

---

## 🧬 Future Scope

- Multi-city historical heat analysis
- AI-powered urban planning assistant
- Time-series climate projections
- Community reporting dashboard
- Carbon impact estimation
- Integration with government planning portals

---

## 📎 Resources / Credits

### Datasets

- **MODIS Land Surface Temperature (MOD11A1)** – NASA
- **Sentinel-2 Surface Reflectance** – Copernicus Programme / European Space Agency (ESA)
- **Dynamic World Land Cover (V1)** – Google & World Resources Institute (WRI)

### APIs & Services

- Google Earth Engine
- OpenWeather API

### Open Source Libraries

- React
- TypeScript
- Tailwind CSS
- Leaflet
- FastAPI
- XGBoost
- Scikit-learn
- Rasterio
- GeoPandas
- Pandas
- NumPy

### Acknowledgements

We gratefully acknowledge the teams behind Google Earth Engine, NASA, the Copernicus Programme (ESA), Dynamic World, OpenWeather, and the open-source community for providing the datasets, APIs, and libraries that made this project possible.

---

## 🏁 Final Words

HeatWise was built to make advanced geospatial analytics accessible through an intuitive, AI-powered platform.

By combining satellite imagery, machine learning, and interactive simulations, we hope to support smarter urban planning decisions and contribute toward more climate-resilient and sustainable cities.

Thank you for checking out HeatWise! 🌍
