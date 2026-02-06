from flask import Flask, request, jsonify, Response
from rapidfuzz import fuzz
import csv, json
import sqlite3

app = Flask(__name__)

DB_PATH = "cities.db"

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
        if not isinstance(query, dict):
            results[key] = {"result": [], "error": "Invalid query format (expected object)"}
            continue

        # Raw access before converting or stripping
        raw_name = query.get("name", "") or query.get("query", "")
        raw_country = query.get("country_code", "")
        raw_region = query.get("region_code", "")

        # Type checks BEFORE using str.strip()
        if not isinstance(raw_name, str) or not raw_name.strip():
            results[key] = {"result": [], "error": "Missing or invalid 'name' or 'query' field"}
            continue
        if raw_country and not isinstance(raw_country, str):
            results[key] = {"result": [], "error": "Invalid 'country_code' (must be string)"}
            continue
        if raw_region and not isinstance(raw_region, str):
            results[key] = {"result": [], "error": "Invalid 'region_code' (must be string)"}
            continue

        # Now safely strip after validation
        input_name = raw_name.strip()
        input_country = raw_country.strip()
        input_region = raw_region.strip()

        input_combined = f"{input_name} {input_country}".strip().lower()

        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, alternate_names, country_code, region_code FROM cities")
        rows = cursor.fetchall()

        matches = []
        for row in rows:
            row_id, name, alternate_names, country, region = row

            name_main = f"{name} {country}".strip().lower()
            alt_names = [alt.strip().lower() for alt in (alternate_names or "").split(",") if alt.strip()]
            input_combined = f"{input_name} {input_country}".strip().lower()

            score_main = fuzz.token_sort_ratio(input_combined, name_main)
            score_alt = max(
                (fuzz.token_sort_ratio(input_combined, f"{alt} {country}") for alt in alt_names),
                default=0
            )
            score = max(score_main, score_alt) / 100

            region_boost = 0.05 if input_region and region == input_region else 0
            boosted_score = min(score + region_boost, 1.0)

            matches.append({
                "id": row_id,
                "name": f"{name} ({country})",
                "score": boosted_score,
                "match": boosted_score >= 0.80
            })

        conn.close()

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
        ],
        "propertySettings": [
            {
                "id": "country_code",
                "name": "Country Code",
                "type": {
                    "id": "http://www.w3.org/2001/XMLSchema#string",
                    "name": "string"
                },
                "extendable": True
            },
            {
                "id": "region_code",
                "name": "Region Code",
                "type": {
                    "id": "http://www.w3.org/2001/XMLSchema#string",
                    "name": "string"
                },
                "extendable": True
            }
        ]
    }

    callback = request.args.get("callback")
    if callback:
        jsonp = f"{callback}({json.dumps(metadata)})"
        return Response(jsonp, mimetype="application/javascript")
    else:
        return jsonify(metadata)
    
@app.route("/suggest/property", methods=["GET"])
def suggest_property():
    prefix = request.args.get("prefix", "").lower()

    properties = [
        {"id": "country_code", "name": "Country Code"},
        {"id": "region_code", "name": "Region Code"}
    ]

    # Optional prefix filtering (OpenRefine uses this)
    if prefix:
        properties = [
            p for p in properties
            if p["id"].lower().startswith(prefix)
            or p["name"].lower().startswith(prefix)
        ]

    return jsonify({
        "result": properties
    })


if __name__ == "__main__":
    app.run(debug=True)
