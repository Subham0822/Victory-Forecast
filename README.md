# Victory Forecast - Esports Prediction Platform

A comprehensive machine learning-powered platform for predicting outcomes in popular esports games including Valorant, CS:GO, PUBG, and League of Legends.

## 🎮 Features

- **Valorant Team vs Team Predictions** - Predict match outcomes using team statistics
- **CS:GO Team vs Team Predictions** - Analyze team performance and predict winners
- **PUBG Player Placement Predictions** - Forecast player rankings in matches
- **League of Legends Match Predictions** - Predict match outcomes based on team data
- **Team Name Generator** - AI-powered team name generation
- **Interactive Dashboards** - Streamlit-based analytics dashboards for each game

## 📁 Project Structure

```
Victory Forecast/
├── backend/              # FastAPI backend server
│   ├── app.py           # Main API server
│   └── requirements.txt # Python dependencies
├── client/              # Next.js frontend application
│   ├── src/             # Source code
│   ├── package.json     # Node.js dependencies
│   └── README.md        # Frontend documentation
├── dashboards/          # Streamlit dashboard applications
│   ├── app_csgo_vs.py
│   ├── app_valorant_vs.py
│   ├── dashboard_lol.py
│   ├── dashboard_pubg.py
│   └── dashboard_valo.py
├── data/                # Training and reference data (download from Kaggle - see Datasets section)
│   ├── csgo/
│   ├── LeagueofLegends.csv
│   ├── pubg.csv
│   └── valo.csv
├── models/              # Trained ML models
│   ├── valorant_best_Gradient_Boosting.pkl
│   ├── csgo_best_Logistic_Regression.pkl
│   ├── pubg_winplace_model.pkl
│   └── xgb_lol_model.pkl
└── notebooks/           # Jupyter notebooks for model development
    ├── csgo.ipynb
    ├── LOL.ipynb
    ├── pubg.ipynb
    └── valo.ipynb
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+ and npm
- pip (Python package manager)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. Ensure model files are present in the `../models/` directory:

   - `valorant_best_Gradient_Boosting.pkl`
   - `csgo_best_Logistic_Regression.pkl`
   - `pubg_winplace_model.pkl`
   - `xgb_lol_model.pkl`

4. Start the backend server:

```bash
python app.py
```

Or using uvicorn directly:

```bash
uvicorn app:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install Node.js dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:9002`

### Dataset Setup

**Note:** The CSV data files are not included in this repository. You need to download them from Kaggle and place them in the `data/` directory.

1. Download the following datasets from Kaggle:

   **CS:GO Dataset:**

   - [CS:GO Match Results](https://www.kaggle.com/datasets/christianlillelund/csgo-matchmaking-damage) - Download `results.csv`, `players.csv`, `picks.csv`, and `economy.csv`
   - Place all CS:GO files in `data/csgo/` directory

   **League of Legends Dataset:**

   - [League of Legends Ranked Matches](https://www.kaggle.com/datasets/paololol/league-of-legends-ranked-matches) - Download and rename to `LeagueofLegends.csv`
   - Place in `data/` directory

   **PUBG Dataset:**

   - [PUBG Finish Placement Prediction](https://www.kaggle.com/datasets/ckay16/pubg-finish-placement-prediction) - Download and rename to `pubg.csv`
   - Place in `data/` directory

   **Valorant Dataset:**

   - [Valorant Match Data](https://www.kaggle.com/datasets/kyawsanhtet/valorant-match-data) - Download and rename to `valo.csv`
   - Place in `data/` directory

2. After downloading, your `data/` directory structure should look like:
   ```
   data/
   ├── csgo/
   │   ├── economy.csv
   │   ├── picks.csv
   │   ├── players.csv
   │   └── results.csv
   ├── LeagueofLegends.csv
   ├── pubg.csv
   └── valo.csv
   ```

### Dashboard Setup

1. Install dashboard dependencies (from root directory):

```bash
pip install -r requirements.txt
```

2. Run any dashboard:

```bash
streamlit run dashboards/dashboard_lol.py
streamlit run dashboards/app_valorant_vs.py
streamlit run dashboards/app_csgo_vs.py
streamlit run dashboards/dashboard_pubg.py
```

## 📡 API Endpoints

### Valorant Team vs Team

- **POST** `/api/valorant/vs`
- Predicts match outcome between two Valorant teams

### CS:GO Team vs Team

- **POST** `/api/csgo/vs`
- Predicts match outcome between two CS:GO teams

### PUBG Player Placement

- **POST** `/api/pubg/predict`
- Predicts player placement/ranking in PUBG matches

### League of Legends Match Prediction

- **POST** `/api/lol/predict`
- Predicts match outcome for League of Legends games

## 🧪 Testing the API

You can test the API using curl or any HTTP client:

```bash
curl -X POST http://localhost:8000/api/valorant/vs \
  -H "Content-Type: application/json" \
  -d '{
    "team1": {
      "rating": 1.0,
      "acs": 200,
      "k": 80,
      "d": 75,
      "a": 35,
      "tkmd": 10,
      "kast": 0.75,
      "adr": 150,
      "hs": 0.25,
      "fk": 5,
      "fd": 5,
      "fkmd": 0
    },
    "team2": {
      "rating": 1.0,
      "acs": 200,
      "k": 80,
      "d": 75,
      "a": 35,
      "tkmd": 10,
      "kast": 0.75,
      "adr": 150,
      "hs": 0.25,
      "fk": 5,
      "fd": 5,
      "fkmd": 0
    }
  }'
```

## 🛠️ Technologies Used

### Backend

- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pandas** - Data manipulation
- **Joblib** - Model serialization
- **Scikit-learn** - Machine learning
- **XGBoost** - Gradient boosting models

### Frontend

- **Next.js 15** - React framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Firebase** - Backend services
- **Genkit AI** - AI integration

### Dashboards

- **Streamlit** - Interactive dashboard framework

## 📊 Machine Learning Models

The platform uses various ML models trained on historical esports data:

- **Valorant**: Gradient Boosting Classifier
- **CS:GO**: Logistic Regression
- **PUBG**: Custom placement prediction model
- **League of Legends**: XGBoost Classifier

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 📊 Datasets

This project uses the following datasets from Kaggle. **Please download them and place in the `data/` directory before running the dashboards or training models.**

### CS:GO

- **Dataset:** [CS:GO Matchmaking Damage](https://www.kaggle.com/datasets/christianlillelund/csgo-matchmaking-damage)
- **Files needed:** `results.csv`, `players.csv`, `picks.csv`, `economy.csv`
- **Location:** Place all files in `data/csgo/` directory

### League of Legends

- **Dataset:** [League of Legends Ranked Matches](https://www.kaggle.com/datasets/paololol/league-of-legends-ranked-matches)
- **File needed:** Download and rename to `LeagueofLegends.csv`
- **Location:** Place in `data/` directory

### PUBG

- **Dataset:** [PUBG Finish Placement Prediction](https://www.kaggle.com/datasets/ckay16/pubg-finish-placement-prediction)
- **File needed:** Download and rename to `pubg.csv`
- **Location:** Place in `data/` directory

### Valorant

- **Dataset:** [Valorant Match Data](https://www.kaggle.com/datasets/kyawsanhtet/valorant-match-data)
- **File needed:** Download and rename to `valo.csv`
- **Location:** Place in `data/` directory

**Note:** If the above Kaggle links don't match your exact datasets, please update them with the correct links to your data sources.

## 🙏 Acknowledgments

- Kaggle dataset contributors for providing the esports data
- Open source libraries and frameworks used in this project
