import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from pathlib import Path
from pymongo import MongoClient
from pymongo import UpdateOne
from datetime import datetime, timezone
import os
from dotenv import load_dotenv

base_dir = Path(__file__).resolve().parents[1]
data_path = base_dir /"data"/"processedData"/"features.csv"
model_dir = Path("ml/models")
model_dir.mkdir(parents=True, exist_ok=True)
output_path = base_dir/"data"/"processedData"/"scored_features.csv"

df = pd.read_csv(data_path)

x = df.drop(columns=["flightIcao24", "window_end_time"], errors="ignore")

scaler = StandardScaler()
x_scaled = scaler.fit_transform(x)

joblib.dump(scaler, model_dir / "scaler.joblib")

model = IsolationForest(
    n_estimators=200,
    contamination=0.02,
    random_state=42
)
model.fit(x_scaled)

df["anomaly_score"] = model.decision_function(x_scaled)
df["has_anomaly"] = model.predict(x_scaled)  # -1 = anomaly, 1 = normal

(df.sort_values("anomaly_score").head(10))
df.to_csv(output_path, index=False)

joblib.dump(model, "ml/models/isolation_forest.joblib")

print("Model trained and anomalies scored")

load_dotenv(dotenv_path=base_dir.parent / "backend" / ".env")
mongo_uri = os.getenv("ML_MONGO_URI")

if not mongo_uri:
    raise RuntimeError("ML_MONGO_URI not found")
    
client = MongoClient(mongo_uri)

db = client["flight_anomaly"]     
collection = db["flightanomaliesml"]
    
anomalies = df[df["has_anomaly"] == -1]
    
    
docs = []

for _, row in anomalies.iterrows():
    docs.append({
        "flightIcao24": row["flightIcao24"],
        "window_end_time": row["window_end_time"],
        "anomaly_score": float(row["anomaly_score"]),
        "model": "isolation_forest_v1",
        "features": {
            "mean_altitude": float(row["mean_altitude"]),
            "std_velocity": float(row["std_velocity"]),
            "max_vertical_speed": float(row["max_vertical_speed"]),
            "heading_variance": float(row["heading_variance"]),
        },
        "created_at": datetime.now(timezone.utc)
    })

if docs:
    collection.insert_many(docs)
    print(f"Inserted {len(docs)} anomaly events")
else:
    print("No anomalies to insert")