from flask import Flask, request, jsonify
from rapidfuzz import fuzz
import csv

app = Flask(__name__)

# Load your cities.csv into memory
data = []
with open("cities.csv", newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        data.append({
            "id": row["id"],
            "name": row["name"],
            "country_code": row["country_code"]
        })

@app.route("/reconcile", methods=["POST"])
def reconcile():
    query_data = request.get_json()["query"]
    input_name = query_data.get("name", "")
    input_country = query_data.get("country_code")  # optional

    # Prepare input string for fuzzy matching
    input_combined = f"{input_name} {input_country}" if input_country else input_name

    results = []
    for row in data:
        target_country = row.get("country_code", "")
        target_combined = f"{row['name']} {target_country}" if input_country else row["name"]

        score = fuzz.token_sort_ratio(input_combined, target_combined) / 100

        results.append({
            "id": row["id"],
            "name": f"{row['name']} ({row['country_code']})",
            "score": score,
            "match": score > 0.85
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    return jsonify({"result": results[:3]})

if __name__ == "__main__":
    app.run(debug=True)
