# 🐝 BuzzWeight

**BuzzWeight** is a production-grade **IoT monitoring and analytics platform for beehives**, built to collect, aggregate, and visualize sensor data from multiple trailers in real time.  
The system was actively deployed and operated with **5 trailers in production** before being archived and published for portfolio purposes.

---

## 🚀 Project Overview

BuzzWeight solves a real operational problem in beekeeping: **continuous monitoring of hive conditions at scale** without exposing users to raw, noisy sensor data.

Rather than streaming unfiltered readings, the platform focuses on:
- Aggregated, meaningful metrics
- Clear operational dashboards
- Exportable historical data for analysis

The application was **not public-facing** and was designed strictly for internal use by administrators and employees.

---

## 🧠 Core Features

- 📊 **Trailer-level data aggregation**  
  Multiple sensors per trailer (e.g. 4 scales → 1 averaged metric)

- ⏱ **Time-series analytics**  
  Visualized over rolling windows (e.g. last 24 hours)

- 🌡 **Environmental monitoring**  
  Weight, temperature, humidity (sensor-dependent)

- 📈 **Operational dashboards**  
  Clean, minimal UI focused on decision-making

- 📁 **CSV / Excel export**  
  For offline analysis and reporting

- 🔐 **Authentication & role-based access**  
  Admin vs employee access separation

- 🚦 **Optimized traffic & performance**  
  Aggregation-first design to minimize server load and redundant requests

---

## 🏗 Architecture

High-level data flow:
Sensors → JSON API on-site server → Aggregation Layer → Central server → Supabase (Postgres) → Next.js Dashboard

- Sensors continuously send raw readings
- Data is aggregated per trailer and per time window
- The frontend consumes only processed, relevant data

---

## 🛠 Tech Stack

### Frontend
- React
- Next.js
- TypeScript

### Backend / Data
- Supabase
  - PostgreSQL
  - Authentication
- Custom JSON API for sensor ingestion

### Data Handling
- Time-series aggregation
- Averaging across multiple sensors
- Export-friendly formats (CSV)

---

## 📦 Deployment Status

- ✅ Previously **active in production**
- 🛑 Currently **archived / no longer maintained**
- 📂 Published publicly for **portfolio and reference purposes**

---

## 🎯 Why This Project Matters

BuzzWeight demonstrates:
- Real-world IoT data ingestion and aggregation
- Scalable dashboard design
- Performance-conscious architecture
- Practical use of modern tooling (Next.js + Supabase)
- End-to-end system thinking — from hardware data to actionable insight

This is **not a tutorial project** or a mock demo. It was built to run, scale, and be used.

---

## 📄 License

This project is published for **educational and portfolio purposes**.  
Reuse or modification is permitted with attribution.


