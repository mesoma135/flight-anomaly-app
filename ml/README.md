# Flight Anomaly ML (Offline)

This folder contains offline machine learning experiments
for analyzing historical flight anomalies.

## Goals
- Analyze anomaly patterns
- Assign relative risk / confidence scores
- Support (not replace) rule-based detection

## Safety Rules
- ML does NOT run in production
- ML does NOT trigger alerts
- Backend works without ML

## Data Sources
- MongoDB: anomalies, flight snapshots