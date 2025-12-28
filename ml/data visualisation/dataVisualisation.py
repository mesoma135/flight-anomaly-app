import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path

base_dir = Path(__file__).resolve().parents[1]
data_path = base_dir/"data"/"processedData"/"scored_features.csv"
output_dir = base_dir/"visualizations" / "output"
output_dir.mkdir(parents=True, exist_ok=True)

df = pd.read_csv(data_path)
df["window_end_time"] = pd.to_datetime(df["window_end_time"])

# Anomaly score distribution
plt.figure(figsize=(8, 5))
sns.histplot(df["anomaly_score"], bins=50, kde=True)
plt.title("Anomaly Score Distribution")
plt.xlabel("Anomaly Score")
plt.ylabel("Count")
plt.tight_layout()
plt.savefig(output_dir / "anomaly_distribution.png")
plt.close()

# Anomaly score over time
plt.figure(figsize=(10, 5))
plt.scatter(
    df["window_end_time"],
    df["anomaly_score"],
    c=df["has_anomaly"].map({1: "blue", -1: "red"}),
    alpha=0.6
)
plt.title("Anomaly Scores Over Time")
plt.xlabel("Time")
plt.ylabel("Anomaly Score")
plt.tight_layout()
plt.savefig(output_dir / "anomaly_over_time.png")
plt.close()

# Velocity vs anomaly score
plt.figure(figsize=(8, 5))
sns.scatterplot(
    data=df,
    x="std_velocity",
    y="anomaly_score",
    hue="has_anomaly",
    palette={1: "blue", -1: "red"},
    alpha=0.7
)
plt.title("Velocity vs Anomaly Score")
plt.tight_layout()
plt.savefig(output_dir / "velocity_vs_anomaly.png")
plt.close()

# Per-flight anomaly timeline
flight = (
    df.sort_values("anomaly_score")
      .iloc[0]["flightIcao24"]
)

flight_df = df[df["flightIcao24"] == flight]

plt.figure(figsize=(10, 5))
plt.plot(
    flight_df["window_end_time"],
    flight_df["anomaly_score"],
    marker="o"
)
plt.axhline(0, linestyle="--", color="gray")
plt.title(f"Anomaly Score Over Time — Flight {flight}")
plt.xlabel("Time")
plt.ylabel("Anomaly Score")
plt.tight_layout()
plt.savefig(output_dir / "flight_timeline.png")
plt.close()

df["has_anomaly"].value_counts(normalize=True)

print("Visualizations saved to ml/visualizations/output/")