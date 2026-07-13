import pandas as pd
from app.model_loader import model
import matplotlib.pyplot as plt

# Get the model
booster = model.get_booster()

# Print feature importance
importance = booster.get_score(importance_type='gain')
print("Feature Importance (Gain):")
for k, v in sorted(importance.items(), key=lambda item: item[1], reverse=True):
    print(f"{k}: {v:.4f}")

importance_weight = booster.get_score(importance_type='weight')
print("\nFeature Importance (Weight):")
for k, v in sorted(importance_weight.items(), key=lambda item: item[1], reverse=True):
    print(f"{k}: {v:.4f}")

