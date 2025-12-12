from flask import Flask, request, jsonify
import pandas as pd
from rapidfuzz import process, fuzz

app = Flask(__name__)

# Load dataset
df = pd.read_csv("cleanlink_cities_50.csv")

@app.route("/reconcile", methods=["POST"])
def reconcile():
    query = request.json.get("query", {}).get("query", "")
    if not query:
        return jsonify({"error": "Missing query"}), 400

    # Fuzzy match against 'name' column
    choices = df['name'].tolist()
    results = process.extract(query, choices, scorer=fuzz.WRatio, limit=3)

    # Format results for reconciliation spec
    formatted = []
    for match_name, score, index in results:
        row = df.iloc[index]
        formatted.append({
            "id": str(row["id"]),
            "name": match_name,
            "score": score / 100,
            "match": score > 85,
            "type": [{"id": "city", "name": "City"}]
        })

    return jsonify({"result": formatted})

if __name__ == "__main__":
    app.run(debug=True)
