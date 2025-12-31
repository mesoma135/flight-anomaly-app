# Flight Tracker & Anomaly Detection App

A **real-time, event-driven system** for tracking live flight data and detecting anomalous flight behavior using **time-series analysis, machine learning, and containerized microservices**.

---

## Problem Statement

With thousands of aircraft airborne at any given moment, identifying anomalous flight behavior becomes increasingly difficult to do manually or on a flight-by-flight basis. While many deviations are benign, subtle or evolving, anomalies can easily be overlooked when attention is spread across large volumes of real-time flight data.

This project aims to make it easier to surface **unusual flight patterns at scale** by programmatically analyzing historical and live flight telemetry, and make it easier . Rather than inspecting individual flights, the system focuses on modeling *normal behavior over time* and flagging deviations automatically, allowing attention to be directed where it matters most.

---

## Inspiration

This project was inspired by tools like **Flightradar24**, which sparked my interest in large-scale flight tracking and real-time aviation data. While platforms like these excel at visualization and situational awareness, I was curious about what could be built on top of similar data to **analyze behavior**, not just display it.

There is a need for a **scalable and automated system** that can continuously ingest live flight data, model normal behavior over time, and flag anomalous patterns in a reproducible and production-ready manner.

---

## What This Project Addresses

This project addresses that gap by building a **real-time, ML-enabled backend platform** that:

- Continuously ingests **live aviation data**
- Persists historical flight snapshots for time-series analysis
- Performs feature engineering on evolving flight behavior
- Applies machine learning techniques to detect anomalies
- Separates data ingestion, processing, and ML concerns into independent services
- Runs reliably using containerized, reproducible infrastructure
  
---

By working with live flight data, this project allowed me to:
- explore real-world, noisy data streams and extract, load and transoform the data
- think critically about system design under continuous data flow
- apply ML concepts in a way that reflects how they are actually used in practice
  
---

## Project Status

**In Progress**

What I've done so far:
- Backend
- ML pipeline & feature engineering
- Containerized services & orchestration
- Automated ML scheduling & data pipeline scripting

What I'm yet to work on/complete:
-  Frontend
  
---

## What This System Does

- Streams **live flight updates** using WebSockets  
- Stores **historical flight snapshots** in MongoDB  
- Performs **feature engineering** on live aviation data  
- Detects **anomalous flight behavior** (altitude, speed, heading deviations)  
- Runs a **scheduled ML pipeline** for anomaly detection  
- Exposes clean APIs for querying flights and anomalies  
- Designed for extensibility to advanced models (Isolation Forest, LSTM)

---

## Architecture Overview

### Technologies

- **Backend API** — Node.js / Express / TypeScript 
- **ML Pipeline Service** — Python  
- **MongoDB** — Persistent time-series storage  
- **Redis** — Caching and fast access

---
