import streamlit as st
import pandas as pd
import joblib
import plotly.graph_objects as go

# -------------------------------
# Load trained model
# -------------------------------
model = joblib.load("models/csgo_best_Logistic_Regression.pkl")

st.set_page_config(page_title="CS:GO Match Win Predictor", page_icon="🔫", layout="wide")

st.title("🔫 CS:GO Team vs Team Win Predictor")
st.markdown("""
Compare two CS:GO teams' stats — economy, ranks, round performance —  
and predict **which team is more likely to win a map!**
""")

# -------------------------------
# Helper for team inputs
# -------------------------------
def team_input(team_label):
    st.subheader(f"{team_label} Stats")

    rank = st.number_input(f"{team_label} Rank (lower = better)", 1, 200, 50)
    avg_money = st.number_input(f"{team_label} Average Economy", 0.0, 20000.0, 7500.0, step=100.0)
    round_win_rate = st.number_input(f"{team_label} Round Win Rate (0–1)", 0.0, 1.0, 0.5, step=0.01)
    ct_rounds = st.number_input(f"{team_label} Rounds Won as CT", 0, 30, 8)
    t_rounds = st.number_input(f"{team_label} Rounds Won as T", 0, 30, 7)

    return {
        'rank': rank,
        'avg_money': avg_money,
        'round_win_rate': round_win_rate,
        'ct_rounds': ct_rounds,
        't_rounds': t_rounds
    }

# -------------------------------
# Layout for Team 1 vs Team 2 input
# -------------------------------
col1, col2 = st.columns(2)
with col1:
    team1_name = st.text_input("Team 1 Name", "Team Alpha")
    team1 = team_input("Team 1")

with col2:
    team2_name = st.text_input("Team 2 Name", "Team Omega")
    team2 = team_input("Team 2")

# -------------------------------
# Predict
# -------------------------------
if st.button("⚔️ Predict Match Outcome"):
    # Feature engineering (same as training)
    rank_diff = team2['rank'] - team1['rank']
    ct_diff = (team1['ct_rounds'] - team1['t_rounds']) - (team2['ct_rounds'] - team2['t_rounds'])
    avg_money_diff = team1['avg_money'] - team2['avg_money']
    round_winrate_diff = team1['round_win_rate'] - team2['round_win_rate']

    # Build feature vector
    input_data = pd.DataFrame([{
        'rank_diff': rank_diff,
        'ct_diff': ct_diff,
        'avg_money_diff': avg_money_diff,
        'round_winrate_diff': round_winrate_diff,
        'rank_1': team1['rank'],
        'rank_2': team2['rank'],
        'ct_1': team1['ct_rounds'],
        'ct_2': team2['ct_rounds'],
        't_1': team1['t_rounds'],
        't_2': team2['t_rounds'],
        'avg_money_t1': team1['avg_money'],
        'avg_money_t2': team2['avg_money'],
        'round_win_rate_t1': team1['round_win_rate'],
        'round_win_rate_t2': team2['round_win_rate']
    }])

    # Predict probabilities
    prob = model.predict_proba(input_data)[0][1]
    team1_prob = prob
    team2_prob = 1 - prob

    winner = team1_name if team1_prob > team2_prob else team2_name

    # Display results
    st.subheader("🏁 Match Prediction Result")
    st.markdown(f"### 🏆 Predicted Winner: **{winner}**")

    col1, col2 = st.columns(2)
    with col1:
        st.metric(f"{team1_name}", f"{team1_prob:.2%}")
        st.progress(float(team1_prob))
    with col2:
        st.metric(f"{team2_name}", f"{team2_prob:.2%}")
        st.progress(float(team2_prob))

    # -------------------------------
    # Radar Chart Comparison
    # -------------------------------
    st.markdown("---")
    st.subheader("📊 Team Stats Comparison")

    radar_features = ['avg_money', 'round_win_rate', 'ct_rounds', 't_rounds']
    team1_vals = [team1[f] for f in ['avg_money', 'round_win_rate', 'ct_rounds', 't_rounds']]
    team2_vals = [team2[f] for f in ['avg_money', 'round_win_rate', 'ct_rounds', 't_rounds']]

    # Normalize values for fair visualization
    all_vals = team1_vals + team2_vals
    min_val, max_val = min(all_vals), max(all_vals)
    if max_val - min_val == 0:
        max_val = 1
    team1_norm = [(v - min_val) / (max_val - min_val) for v in team1_vals]
    team2_norm = [(v - min_val) / (max_val - min_val) for v in team2_vals]

    fig = go.Figure()

    fig.add_trace(go.Scatterpolar(
        r=team1_norm + [team1_norm[0]],
        theta=radar_features + [radar_features[0]],
        fill='toself',
        name=team1_name,
        line_color='royalblue'
    ))

    fig.add_trace(go.Scatterpolar(
        r=team2_norm + [team2_norm[0]],
        theta=radar_features + [radar_features[0]],
        fill='toself',
        name=team2_name,
        line_color='tomato'
    ))

    fig.update_layout(
        polar=dict(radialaxis=dict(visible=True, range=[0, 1])),
        showlegend=True,
        template="plotly_dark",
        height=600
    )

    st.plotly_chart(fig, use_container_width=True)

    st.markdown("⚙️ *Radar chart compares economy, round win rate, and side performance.*")
