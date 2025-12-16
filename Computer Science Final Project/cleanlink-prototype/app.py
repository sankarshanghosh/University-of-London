from flask import Flask, request, jsonify, Response
from rapidfuzz import fuzz
import csv, json

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
def reconcile_post():
    content_type = request.headers.get("Content-Type", "")

    if "application/json" in content_type:
        queries = request.get_json(force=True)
    elif "application/x-www-form-urlencoded" in content_type:
        # OpenRefine form-encodes the query JSON under a key like 'queries'
        raw = request.form.get("queries")
        if not raw:
            return jsonify({"error": "Missing 'queries' in form data"}), 400
        queries = json.loads(raw)
    else:
        return jsonify({"error": f"Unsupported Content-Type: {content_type}"}), 415

    # Handle single-query mode
    if "query" in queries:
        queries = {"q0": queries["query"]}

    results = {}
    for key, query in queries.items():
        input_name = (query.get("name", "") or query.get("query", "")).strip()
        input_country = query.get("country_code", "").strip()

        input_combined = f"{input_name} {input_country}".strip()

        matches = []
        for row in data:
            target_combined = f"{row['name']} {row['country_code']}".strip()
            score = fuzz.token_sort_ratio(input_combined, target_combined) / 100

            matches.append({
                "id": row["id"],
                "name": f"{row['name']} ({row['country_code']})",
                "score": score,
                "match": score > 0.85
            })

        matches.sort(key=lambda x: x["score"], reverse=True)
        results[key] = { "result": matches[:3] }

    return jsonify(results)


@app.route("/reconcile", methods=["GET"])
def reconcile_metadata():
    metadata = {
        "name": "CleanLink+ Cities Reconciliation",
        "identifierSpace": "http://example.org/ids",
        "schemaSpace": "http://example.org/schema",
        "view": {
            "url": "http://example.org/view/{{id}}"
        },
        "defaultTypes": [
            {
                "id": "city",
                "name": "City"
            }
        ]
    }

    callback = request.args.get("callback")
    if callback:
        jsonp = f"{callback}({json.dumps(metadata)})"
        return Response(jsonp, mimetype="application/javascript")
    else:
        return jsonify(metadata)

if __name__ == "__main__":
    app.run(debug=True)
