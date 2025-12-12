import streamlit as st
import pandas as pd
import numpy as np
import joblib

# Load trained model
model = joblib.load("models/valorant_best_Gradient_Boosting.pkl")

st.set_page_config(page_title="Valorant Win Predictor", page_icon="🎯", layout="centered")

st.title("🎯 Valorant Team Win Probability Predictor")
st.markdown("Predict whether a Valorant team will **win or lose** based on their team performance stats.")

# Sidebar input fields
st.sidebar.header("Enter Team Statistics")
rating = st.sidebar.number_input("Team Average Rating", 0.0, 3.0, 1.0, step=0.01)
acs = st.sidebar.number_input("Average Combat Score (ACS)", 0, 400, 200, step=5)
k = st.sidebar.number_input("Total Kills", 0, 200, 80)
d = st.sidebar.number_input("Total Deaths", 0, 200, 75)
a = st.sidebar.number_input("Total Assists", 0, 200, 35)
tkmd = st.sidebar.number_input("Total Kill Minus Deaths", -100, 200, 10)
kast = st.sidebar.number_input("Average KAST (%)", 0.0, 1.0, 0.75, step=0.01)
adr = st.sidebar.number_input("Average Damage/Round (ADR)", 0, 300, 150)
hs = st.sidebar.number_input("Headshot Rate (%)", 0.0, 1.0, 0.25, step=0.01)
fk = st.sidebar.number_input("Total First Kills", 0, 50, 5)
fd = st.sidebar.number_input("Total First Deaths", 0, 50, 5)
fkmd = st.sidebar.number_input("Total First Kill - Deaths", -20, 20, 0)

# Convert to DataFrame
input_data = pd.DataFrame({
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

# Predict
if st.button("Predict Win Probability 🚀"):
    pred_prob = model.predict_proba(input_data)[0][1]
    pred_label = "WIN ✅" if pred_prob >= 0.5 else "LOSE ❌"

    st.subheader(f"Prediction: **{pred_label}**")
    st.progress(int(pred_prob * 100))
    st.write(f"**Win Probability:** {pred_prob:.2%}")
