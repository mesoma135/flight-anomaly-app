# ✈️ Flight Tracker & Anomaly Detection

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen)
![WebSockets](https://img.shields.io/badge/WebSockets-Real--Time-orange)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

A real-time backend system for tracking flights and detecting abnormal behavior using live aviation data, WebSockets, and time-series analysis. Built with scalability and machine learning integration in mind.

**Status:** In progress — backend core is functional; ML and frontend layers are planned and still in development.

---

## What It Does

- Streams **live flight updates** via WebSockets  
- Stores **historical flight snapshots** in MongoDB  
- Detects **anomalous flight behavior** (altitude, speed, heading deviations)  
- Exposes clean **REST APIs** for querying flights and anomalies  
- Designed to support **ML-based anomaly detection** (Isolation Forest, LSTM)

---

## Tech Stack

- **Node.js / Express / TypeScript**
- **MongoDB (Mongoose)**
- **WebSockets**
- External aviation data API

*(Planned: Python ML service, Redis caching, React map UI)*

---

## Why It Matters

Demonstrates:
- Real-time, event-driven backend design  
- Time-series data modeling  
- Scalable system architecture  
- Applied foundations for ML in production systems  

Built as a **portfolio-grade system**, not a demo.

---
