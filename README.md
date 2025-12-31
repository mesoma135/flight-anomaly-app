# Flight Tracker & Anomaly Detection App

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen)
![WebSockets](https://img.shields.io/badge/WebSockets-Real--Time-orange)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

A **real-time, event-driven system** for tracking live flight data and detecting anomalous flight behavior using **time-series analysis, machine learning, and containerized microservices**.

This project is designed to mirror **production-grade backend and ML workflows**, including Docker orchestration and scheduled ML pipelines.

---
## Problem Statement

Modern aviation systems generate massive volumes of **real-time flight telemetry**, including altitude, speed, heading, and positional data. While this data is widely available, most applications focus on **visualization and tracking**, leaving a gap in **automated detection of abnormal or potentially unsafe flight behavior**.

Traditional monitoring systems often rely on static rules or manual inspection, which:
- do not scale well with high-frequency, global flight data
- struggle to detect subtle or evolving anomalies
- are poorly suited for real-time or near–real-time analysis

There is a need for a **scalable, automated system** that can continuously ingest live flight data, model normal behavior over time, and flag anomalous patterns in a reproducible and production-ready manner.

---

## What This Project Addresses

This project addresses that gap by building a **real-time, ML-enabled backend platform** that:

- Continuously ingests **live aviation data**
- Persists historical flight snapshots for time-series analysis
- Performs feature engineering on evolving flight behavior
- Applies machine learning techniques to detect anomalies
- Separates data ingestion, processing, and ML concerns into independent services
- Runs reliably using containerized, reproducible infrastructure

The system is designed not just to detect anomalies, but to demonstrate **how machine learning pipelines can be integrated into real backend systems**, rather than existing as isolated notebooks or scripts.

---

## Personal Motivation

Aviation has always been a personal interest of mine for as long as I can remember, particularly the complexity involved in managing thousands of aircraft simultaneously while maintaining safety and efficiency. This project was inspired by that interest, combined with a desire to explore how **real-time systems, time-series data, and machine learning** work together in production environments.

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

### Services (Containerized)

- **Backend API** — Node.js / Express / TypeScript 
- **ML Pipeline Service** — Python  
- **MongoDB** — Persistent time-series storage  
- **Redis** — Caching and fast access  

All services communicate over an **internal Docker network** using service names (not `localhost`).

---

## Tech Stack

### Backend
- Node.js  
- Express  
- TypeScript  
- WebSockets  

### Machine Learning
- Python  
- Feature engineering pipeline  
- Config-driven execution  
- Scheduled retraining / inference loops  

### Infrastructure & DevOps
- Docker  
- Docker Compose  
- Environment-based configuration  
- Infrastructure-as-Code principles  

### Data
- MongoDB (time-series storage)  
- Redis (caching)

---

## 📁 Repository Structure
