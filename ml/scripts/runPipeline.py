import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

base_dir = Path(__file__).resolve().parents[1]
isolation_forest_path = base_dir / "models" / "isolationForest.py"
features_path = base_dir / "features" / "buildFeatures.py"

def run_step(name, command):
    print(f"[{datetime.now(timezone.utc)}] Running: {name}")
    result = subprocess.run(command, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"{name} failed")
        print(result.stderr)
        sys.exit(1)
    else:
        print(f"{name} completed")

if __name__ == "__main__":
    run_step(
        "Feature Builder",
        ["python", features_path]
    )

    run_step(
        "Isolation Forest Scoring",
        ["python", isolation_forest_path]
    )

    print(f"\n[{datetime.now(timezone.utc)}] Pipeline run finished successfully\n")