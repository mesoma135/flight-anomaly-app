import yaml
import pandas as pd
from pathlib import Path
import os
from dotenv import load_dotenv
from pymongo import MongoClient



base_dir = Path(__file__).resolve().parents[1]

load_dotenv(dotenv_path=base_dir.parent / "backend" / ".env")

config_path = base_dir /"config"/"modelConfig.yaml"
input_path = base_dir /"data"/"sampleData"/"flightSnapshots.csv"
output_path = base_dir/"data"/"processedData"/"features.csv"

def loadConfig():
    with open(config_path, "r") as f:
        return yaml.safe_load(f)

def loadData():
    return pd.read_csv(input_path)

def load_live_data():
    mongo_uri = os.getenv("ML_MONGO_URI")

    if not mongo_uri:
        raise RuntimeError("ML_MONGO_URI not found")

    client = MongoClient(mongo_uri)

    db = client["flight_anomaly"]     
    collection = db["FlightSnapshot"]  

    docs = list(collection.find({}, {"_id": 0}))
    
    if not docs:
        print("No live data found in MongoDB.")
        return pd.DataFrame()
    
    return pd.DataFrame(docs)

def buildFeatures(df: pd.DataFrame, window_size: int):
    feature_rows = []
    for flight_id, group in df.groupby("flight_id"):
        group = group.sort_values("timestamp")
        recent = group.tail(window_size)
        if len(recent) < window_size:
            continue
    
    features = {"flight_id": flight_id, 
                "mean_altitude": recent["altitude"].mean(), 
                "std_velocity":recent["speed"].std(), 
                "max_vertical_speed": recent["verticalSpeed"].abs().max(),
                "heading_variance": recent["heading"].var()
                }
    feature_rows.append(features)
    return pd.DataFrame(feature_rows)

def main():
    config = loadConfig()
    window_size = config["features"]["window_size"]

    # choose data source
    if config.get("data", {}).get("source") == "mongo":
        df = load_live_data()
    else:
        df = loadData()

    if df.empty:
        print("No data available. Skipping feature generation.")
        return

    features_df = buildFeatures(df, window_size)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    features_df.to_csv(output_path, index=False)

    print(f"Features saved to {output_path}")

if __name__ == "__main__":
    main()