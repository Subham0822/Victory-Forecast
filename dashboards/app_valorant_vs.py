import streamlit as st
import pandas as pd
import joblib
import plotly.graph_objects as go

# Load trained model
model = joblib.load("models/valorant_best_Gradient_Boosting.pkl")

st.set_page_config(page_title="Valorant Win Predictor", page_icon="🎯", layout="wide")

st.title("🎮 Valorant Team vs Team Win Predictor + Radar Chart")
st.markdown("""
Compare **two teams’ stats** head-to-head and visualize their strengths ⚔️  
Trained using real Valorant match data.
""")

# -------------------------------
# Helper for collecting team stats
# -------------------------------
def team_input(team_label):
    st.subheader(f"{team_label} Stats")
    rating = st.number_input(f"{team_label} - Average Rating", 0.0, 3.0, 1.0, step=0.01)
    acs = st.number_input(f"{team_label} - Average Combat Score (ACS)", 0, 400, 200, step=5)
    k = st.number_input(f"{team_label} - Total Kills", 0, 200, 80)
    d = st.number_input(f"{team_label} - Total Deaths", 0, 200, 75)
    a = st.number_input(f"{team_label} - Total Assists", 0, 200, 35)
    tkmd = st.number_input(f"{team_label} - Total Kill Minus Deaths", -100, 200, 10)
    kast = st.number_input(f"{team_label} - Average KAST (%)", 0.0, 1.0, 0.75, step=0.01)
    adr = st.number_input(f"{team_label} - Average Damage/Round (ADR)", 0, 300, 150)
    hs = st.number_input(f"{team_label} - Headshot Rate (%)", 0.0, 1.0, 0.25, step=0.01)
    fk = st.number_input(f"{team_label} - Total First Kills", 0, 50, 5)
    fd = st.number_input(f"{team_label} - Total First Deaths", 0, 50, 5)
    fkmd = st.number_input(f"{team_label} - Total First Kill Minus Deaths", -20, 20, 0)

    return pd.DataFrame({
        'rating': [rating],
        'acs': [acs],
        'k': [k],
        'd': [d],
        'a': [a],
        'tkmd': [tkmd],
        'kast': [kast],
        'adr': [adr],
        'hs': [hs],
        'fk': [fk],
        'fd': [fd],
        'fkmd': [fkmd]
    })

# -------------------------------
# Input layout
# -------------------------------
col1, col2 = st.columns(2)
with col1:
    team1_name = st.text_input("Team 1 Name", "Team Alpha")
    team1_data = team_input("Team 1")

with col2:
    team2_name = st.text_input("Team 2 Name", "Team Omega")
    team2_data = team_input("Team 2")

# -------------------------------
# Prediction
# -------------------------------
if st.button("⚔️ Predict Match Outcome"):
    team1_prob = model.predict_proba(team1_data)[0][1]
    team2_prob = model.predict_proba(team2_data)[0][1]

    total = team1_prob + team2_prob
    team1_prob_norm = team1_prob / total
    team2_prob_norm = team2_prob / total

    winner = team1_name if team1_prob_norm > team2_prob_norm else team2_name
    st.markdown(f"### 🏆 Predicted Winner: **{winner}**")

    col1, col2 = st.columns(2)
    with col1:
        st.metric(team1_name, f"{team1_prob_norm:.2%}")
        st.progress(float(team1_prob_norm))
    with col2:
        st.metric(team2_name, f"{team2_prob_norm:.2%}")
        st.progress(float(team2_prob_norm))

    # -------------------------------
    # Radar Chart Comparison
    # -------------------------------
    st.markdown("---")
    st.subheader("📊 Team Stats Comparison (Radar Chart)")

    radar_features = ['rating', 'acs', 'kast', 'adr', 'hs', 'fkmd']
    team1_vals = team1_data[radar_features].iloc[0].tolist()
    team2_vals = team2_data[radar_features].iloc[0].tolist()

    # Normalize for fair visualization (0–1 scale)
    all_vals = team1_vals + team2_vals
    min_val, max_val = min(all_vals), max(all_vals)
    if max_val - min_val == 0:
        max_val = 1  # avoid div by 0
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

    st.markdown("⚙️ *Radar chart shows relative performance across core metrics like Rating, ACS, ADR, KAST, HS%, and FK–FD differential.*")
