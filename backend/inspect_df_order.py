import pandas as pd
from app.model_loader import model
import pickle

with open('app/models/random_forest_model.pkl', 'rb') as f:
    raw_model = pickle.load(f)
    
print("raw model type:", type(raw_model))
print("feature_names_in_:", getattr(raw_model, 'feature_names_in_', None))

