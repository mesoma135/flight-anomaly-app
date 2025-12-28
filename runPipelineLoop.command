cd "$(dirname "$0")"
while true; do
  python3 ml/scripts/runPipeline.py
  sleep 300
done