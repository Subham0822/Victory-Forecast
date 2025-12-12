from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
import os
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Esports Oracle API")

# CORS middleware to allow frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:9002"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models on startup
models = {}
MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "models")

try:
    models['valorant'] = joblib.load(os.path.join(MODELS_DIR, "valorant_best_Gradient_Boosting.pkl"))
    models['csgo'] = joblib.load(os.path.join(MODELS_DIR, "csgo_best_Logistic_Regression.pkl"))
    models['pubg'] = joblib.load(os.path.join(MODELS_DIR, "pubg_winplace_model.pkl"))
    models['lol'] = joblib.load(os.path.join(MODELS_DIR, "xgb_lol_model.pkl"))
    print("All models loaded successfully!")
except Exception as e:
    print(f"Error loading models: {e}")
    raise

# Request/Response models
class ValorantTeamStats(BaseModel):
    rating: float
    acs: float
    k: float
    d: float
    a: float
    tkmd: float
    kast: float
    adr: float
    hs: float
    fk: float
    fd: float
    fkmd: float

class ValorantTeamVsTeamRequest(BaseModel):
    team1: ValorantTeamStats
    team2: ValorantTeamStats

class ValorantTeamVsTeamResponse(BaseModel):
    team1_prob: float
    team2_prob: float
    winner: str

class CsgoTeamStats(BaseModel):
    rank: int
    avg_money: float
    round_win_rate: float
    ct_rounds: int
    t_rounds: int

class CsgoTeamVsTeamRequest(BaseModel):
    team1: CsgoTeamStats
    team2: CsgoTeamStats

class CsgoTeamVsTeamResponse(BaseModel):
    team1_prob: float
    team2_prob: float
    winner: str

class PubgPlayerStats(BaseModel):
    walkDistance: float
    boosts: float
    weaponsAcquired: float
    damageDealt: float
    heals: float
    kills: float
    rideDistance: float
    longestKill: float
    DBNOs: float
    killPlace: float

class PubgPlayerPlacementResponse(BaseModel):
    placement: float

class LolTeamStats(BaseModel):
    towerKills: int
    inhibitorKills: int
    baronKills: int
    dragonKills: int
    riftHeraldKills: int

class LolMatchPredictionRequest(BaseModel):
    team1: LolTeamStats
    team2: LolTeamStats

class LolMatchPredictionResponse(BaseModel):
    winner: int  # 1 or 2
    team1_prob: float
    team2_prob: float

@app.get("/")
def root():
    return {"message": "Esports Oracle API is running"}

@app.post("/api/valorant/vs", response_model=ValorantTeamVsTeamResponse)
def predict_valorant_team_vs_team(request: ValorantTeamVsTeamRequest):
    try:
        # Prepare team1 data
        team1_data = pd.DataFrame([{
            'rating': request.team1.rating,
            'acs': request.team1.acs,
            'k': request.team1.k,
            'd': request.team1.d,
            'a': request.team1.a,
            'tkmd': request.team1.tkmd,
            'kast': request.team1.kast,
            'adr': request.team1.adr,
            'hs': request.team1.hs,
            'fk': request.team1.fk,
            'fd': request.team1.fd,
            'fkmd': request.team1.fkmd
        }])
        
        # Prepare team2 data
        team2_data = pd.DataFrame([{
            'rating': request.team2.rating,
            'acs': request.team2.acs,
            'k': request.team2.k,
            'd': request.team2.d,
            'a': request.team2.a,
            'tkmd': request.team2.tkmd,
            'kast': request.team2.kast,
            'adr': request.team2.adr,
            'hs': request.team2.hs,
            'fk': request.team2.fk,
            'fd': request.team2.fd,
            'fkmd': request.team2.fkmd
        }])
        
        # Get probabilities
        team1_prob = models['valorant'].predict_proba(team1_data)[0][1]
        team2_prob = models['valorant'].predict_proba(team2_data)[0][1]
        
        # Normalize probabilities
        total = team1_prob + team2_prob
        team1_prob_norm = team1_prob / total
        team2_prob_norm = team2_prob / total
        
        winner = "team1" if team1_prob_norm > team2_prob_norm else "team2"
        
        return ValorantTeamVsTeamResponse(
            team1_prob=team1_prob_norm,
            team2_prob=team2_prob_norm,
            winner=winner
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.post("/api/csgo/vs", response_model=CsgoTeamVsTeamResponse)
def predict_csgo_team_vs_team(request: CsgoTeamVsTeamRequest):
    try:
        # Feature engineering (same as training)
        rank_diff = request.team2.rank - request.team1.rank
        ct_diff = (request.team1.ct_rounds - request.team1.t_rounds) - (request.team2.ct_rounds - request.team2.t_rounds)
        avg_money_diff = request.team1.avg_money - request.team2.avg_money
        round_winrate_diff = request.team1.round_win_rate - request.team2.round_win_rate
        
        # Build feature vector
        input_data = pd.DataFrame([{
            'rank_diff': rank_diff,
            'ct_diff': ct_diff,
            'avg_money_diff': avg_money_diff,
            'round_winrate_diff': round_winrate_diff,
            'rank_1': request.team1.rank,
            'rank_2': request.team2.rank,
            'ct_1': request.team1.ct_rounds,
            'ct_2': request.team2.ct_rounds,
            't_1': request.team1.t_rounds,
            't_2': request.team2.t_rounds,
            'avg_money_t1': request.team1.avg_money,
            'avg_money_t2': request.team2.avg_money,
            'round_win_rate_t1': request.team1.round_win_rate,
            'round_win_rate_t2': request.team2.round_win_rate
        }])
        
        # Predict probabilities
        prob = models['csgo'].predict_proba(input_data)[0][1]
        team1_prob = prob
        team2_prob = 1 - prob
        
        winner = "team1" if team1_prob > team2_prob else "team2"
        
        return CsgoTeamVsTeamResponse(
            team1_prob=team1_prob,
            team2_prob=team2_prob,
            winner=winner
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.post("/api/pubg/predict", response_model=PubgPlayerPlacementResponse)
def predict_pubg_placement(request: PubgPlayerStats):
    try:
        # Feature order must match model's expected feature order
        feature_order = ['walkDistance', 'boosts', 'weaponsAcquired', 'damageDealt', 
                         'heals', 'kills', 'rideDistance', 'longestKill', 'DBNOs', 'killPlace']
        data = pd.DataFrame([{
            'walkDistance': request.walkDistance,
            'boosts': request.boosts,
            'weaponsAcquired': request.weaponsAcquired,
            'damageDealt': request.damageDealt,
            'heals': request.heals,
            'kills': request.kills,
            'rideDistance': request.rideDistance,
            'longestKill': request.longestKill,
            'DBNOs': request.DBNOs,
            'killPlace': request.killPlace
        }], columns=feature_order)
        
        # Make prediction
        prediction = models['pubg'].predict(data)[0]
        
        return PubgPlayerPlacementResponse(placement=float(prediction))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.post("/api/lol/predict", response_model=LolMatchPredictionResponse)
def predict_lol_match(request: LolMatchPredictionRequest):
    try:
        # Calculate differences
        tower_diff = request.team1.towerKills - request.team2.towerKills
        inhibitor_diff = request.team1.inhibitorKills - request.team2.inhibitorKills
        baron_diff = request.team1.baronKills - request.team2.baronKills
        dragon_diff = request.team1.dragonKills - request.team2.dragonKills
        herald_diff = request.team1.riftHeraldKills - request.team2.riftHeraldKills
        
        # Create dataframe
        data = pd.DataFrame([{
            "t1_towerKills": request.team1.towerKills,
            "t1_inhibitorKills": request.team1.inhibitorKills,
            "t1_baronKills": request.team1.baronKills,
            "t1_dragonKills": request.team1.dragonKills,
            "t1_riftHeraldKills": request.team1.riftHeraldKills,
            "t2_towerKills": request.team2.towerKills,
            "t2_inhibitorKills": request.team2.inhibitorKills,
            "t2_baronKills": request.team2.baronKills,
            "t2_dragonKills": request.team2.dragonKills,
            "t2_riftHeraldKills": request.team2.riftHeraldKills,
            "tower_diff": tower_diff,
            "inhibitor_diff": inhibitor_diff,
            "baron_diff": baron_diff,
            "dragon_diff": dragon_diff,
            "herald_diff": herald_diff
        }])
        
        # Prediction
        pred = models['lol'].predict(data)[0]
        proba = models['lol'].predict_proba(data)[0][1]  # probability Team 1 wins
        
        team1_prob = proba
        team2_prob = 1 - proba
        
        return LolMatchPredictionResponse(
            winner=int(pred),
            team1_prob=team1_prob,
            team2_prob=team2_prob
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

