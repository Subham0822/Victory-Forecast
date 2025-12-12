import streamlit as st
import pandas as pd
import joblib

# Load model
model = joblib.load("models/xgb_lol_model.pkl")

# App title
st.title("🎮 League of Legends Win Predictor")
st.markdown("""
This app predicts **whether Team 1 will win or lose** based on match stats.  
Adjust the sliders on the sidebar to simulate game performance.
""")

# Sidebar inputs
st.sidebar.header("🧩 Enter Game Stats")

t1_tower = st.sidebar.slider("Team 1 Tower Kills", 0, 11, 5)
t2_tower = st.sidebar.slider("Team 2 Tower Kills", 0, 11, 5)

t1_inhibitor = st.sidebar.slider("Team 1 Inhibitor Kills", 0, 5, 1)
t2_inhibitor = st.sidebar.slider("Team 2 Inhibitor Kills", 0, 5, 1)

t1_baron = st.sidebar.slider("Team 1 Baron Kills", 0, 5, 0)
t2_baron = st.sidebar.slider("Team 2 Baron Kills", 0, 5, 0)

t1_dragon = st.sidebar.slider("Team 1 Dragon Kills", 0, 7, 2)
t2_dragon = st.sidebar.slider("Team 2 Dragon Kills", 0, 7, 2)

t1_herald = st.sidebar.slider("Team 1 Rift Herald Kills", 0, 3, 1)
t2_herald = st.sidebar.slider("Team 2 Rift Herald Kills", 0, 3, 1)

# Compute differences (the model expects these too)
tower_diff = t1_tower - t2_tower
inhibitor_diff = t1_inhibitor - t2_inhibitor
baron_diff = t1_baron - t2_baron
dragon_diff = t1_dragon - t2_dragon
herald_diff = t1_herald - t2_herald

# Create dataframe
data = pd.DataFrame([{
    "t1_towerKills": t1_tower,
    "t1_inhibitorKills": t1_inhibitor,
    "t1_baronKills": t1_baron,
    "t1_dragonKills": t1_dragon,
    "t1_riftHeraldKills": t1_herald,
    "t2_towerKills": t2_tower,
    "t2_inhibitorKills": t2_inhibitor,
    "t2_baronKills": t2_baron,
    "t2_dragonKills": t2_dragon,
    "t2_riftHeraldKills": t2_herald,
    "tower_diff": tower_diff,
    "inhibitor_diff": inhibitor_diff,
    "baron_diff": baron_diff,
    "dragon_diff": dragon_diff,
    "herald_diff": herald_diff
}])

# Prediction
pred = model.predict(data)[0]
proba = model.predict_proba(data)[0][1]  # probability Team 1 wins

# Result Display
st.subheader("📊 Prediction Result:")
if pred == 1:
    st.success(f"🏆 Team 1 is predicted to **WIN** ({proba*100:.2f}% confidence)")
else:
    st.error(f"❌ Team 1 is predicted to **LOSE** ({(1-proba)*100:.2f}% confidence)")

# Show input summary
st.write("### Input Summary")
st.dataframe(data)
