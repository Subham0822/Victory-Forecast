# Esports Oracle Backend API

Python FastAPI backend server that loads ML models and provides prediction endpoints.

## Setup

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Make sure the model files are in the `../models/` directory:
   - valorant_best_Gradient_Boosting.pkl
   - csgo_best_Logistic_Regression.pkl
   - pubg_winplace_model.pkl
   - xgb_lol_model.pkl

## Running the Server

```bash
python app.py
```

Or using uvicorn directly:
```bash
uvicorn app:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

- POST `/api/valorant/vs` - Valorant team vs team prediction
- POST `/api/csgo/vs` - CS:GO team vs team prediction
- POST `/api/pubg/predict` - PUBG player placement prediction
- POST `/api/lol/predict` - League of Legends match prediction

## Testing

You can test the API using curl or any HTTP client:

```bash
curl -X POST http://localhost:8000/api/valorant/vs \
  -H "Content-Type: application/json" \
  -d '{"team1": {"rating": 1.0, "acs": 200, "k": 80, "d": 75, "a": 35, "tkmd": 10, "kast": 0.75, "adr": 150, "hs": 0.25, "fk": 5, "fd": 5, "fkmd": 0}, "team2": {"rating": 1.0, "acs": 200, "k": 80, "d": 75, "a": 35, "tkmd": 10, "kast": 0.75, "adr": 150, "hs": 0.25, "fk": 5, "fd": 5, "fkmd": 0}}'
```

