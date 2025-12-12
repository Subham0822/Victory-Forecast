import streamlit as st
import pandas as pd
import joblib

# Load trained model
model = joblib.load("models/pubg_winplace_model.pkl")

# App title
st.title("🎯 PUBG Player Win Placement Predictor")
st.markdown("""
Predict your **win placement percentile (0 = last, 1 = winner)**  
based on your in-game stats. Adjust the sliders to see how performance changes outcomes.
""")

# Sidebar inputs
st.sidebar.header("🎮 Player Match Stats")

walkDistance = st.sidebar.slider("Walk Distance (meters)", 0, 10000, 2000)
rideDistance = st.sidebar.slider("Ride Distance (meters)", 0, 20000, 5000)
boosts = st.sidebar.slider("Boosts Used", 0, 20, 2)
heals = st.sidebar.slider("Heals Used", 0, 20, 2)
damageDealt = st.sidebar.slider("Damage Dealt", 0, 1500, 300)
kills = st.sidebar.slider("Kills", 0, 20, 2)
DBNOs = st.sidebar.slider("DBNOs (Knocks)", 0, 10, 1)
longestKill = st.sidebar.slider("Longest Kill Distance (m)", 0, 500, 50)
killPlace = st.sidebar.slider("Kill Placement Rank", 1, 100, 50)
weaponsAcquired = st.sidebar.slider("Weapons Acquired", 0, 20, 3)

# Prepare input - order must match model's expected feature order
feature_order = ['walkDistance', 'boosts', 'weaponsAcquired', 'damageDealt', 
                 'heals', 'kills', 'rideDistance', 'longestKill', 'DBNOs', 'killPlace']
data = pd.DataFrame([{
    'walkDistance': walkDistance,
    'boosts': boosts,
    'weaponsAcquired': weaponsAcquired,
    'damageDealt': damageDealt,
    'heals': heals,
    'kills': kills,
    'rideDistance': rideDistance,
    'longestKill': longestKill,
    'DBNOs': DBNOs,
    'killPlace': killPlace
}], columns=feature_order)

# Make prediction
prediction = model.predict(data)[0]

# Display result
st.subheader("📈 Predicted Win Placement Percentile:")
st.metric(label="Predicted winPlacePerc", value=f"{prediction:.2f}")

# Interpret percentile
if prediction > 0.8:
    st.success("🏆 Great job! You're likely to finish **Top 20% or better**!")
elif prediction > 0.5:
    st.info("💪 You're in the **Top 50% range** — solid performance!")
else:
    st.warning("😬 Below average — try increasing movement or healing!")

# Show input summary
st.write("### Input Summary")
st.dataframe(data)
