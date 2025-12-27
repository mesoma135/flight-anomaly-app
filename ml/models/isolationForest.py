import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from pathlib import Path

base_dir = Path(__file__).resolve().parents[1]
data_path = base_dir /"data"/"processedData"/"features.csv"
model_dir = Path("ml/models")
model_dir.mkdir(parents=True, exist_ok=True)
output_path = base_dir/"data"/"processedData"/"scored_features.csv"

df = pd.read_csv(data_path)

# Drop identifiers (NOT features)
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

print("Model trained and anomalies scored")
