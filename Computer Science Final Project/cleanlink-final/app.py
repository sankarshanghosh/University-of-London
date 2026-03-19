from flask import Flask, request, jsonify, Response  # Web framework
from rapidfuzz import fuzz  # Fuzzy string matching
import csv, json  # Data handling
import sqlite3  # Database access
import unicodedata  # Unicode normalization

def normalize(text):
    """
    Normalize input text by removing diacritics, converting to lowercase, and stripping whitespace.
    """
    if not text:
        return ""
    text = unicodedata.normalize("NFKD", text)
    return ''.join(c for c in text if not unicodedata.combining(c)).lower().strip()

app = Flask(__name__)  # Initialize Flask app

DB_PATH = "cities.db"  # Path to SQLite database

@app.route("/reconcile", methods=["POST"])
def reconcile_post():
    """
    Handle reconciliation POST requests from OpenRefine.
    Accepts JSON or form-encoded queries, validates input, performs fuzzy matching against cities database,
    and returns top matches with scores.
    """
    content_type = request.headers.get("Content-Type", "")

    # Parse input queries based on Content-Type
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

    # Handle single-query mode (OpenRefine sometimes sends a single query)
    if "query" in queries:
        queries = {"q0": queries["query"]}

    results = {}
    for key, query in queries.items():
        # Validate query format
        if not isinstance(query, dict):
            results[key] = {"result": [], "error": "Invalid query format (expected object)"}
            continue

        # Extract fields from query
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

        # Normalize input fields for matching
        input_name = normalize(raw_name)
        input_country = normalize(raw_country)
        input_region = normalize(raw_region)

        input_combined = f"{input_name} {input_country}".strip()

        # Query cities database
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, alternate_names, country_code, region_code FROM cities")
        rows = cursor.fetchall()

        matches = []
        for row in rows:
            row_id, name, alternate_names, country, region = row

            # Prepare main and alternate names for matching
            name_main = f"{name} {country}".strip().lower()
            alt_names = [alt.strip().lower() for alt in (alternate_names or "").split(",") if alt.strip()]

            # Fuzzy match input against main and alternate names
            score_main = fuzz.token_sort_ratio(input_combined, name_main)
            score_alt = max(
                (fuzz.token_sort_ratio(input_combined, f"{alt} {country}") for alt in alt_names),
                default=0
            )
            score = max(score_main, score_alt) / 100

            # Boost score if region matches
            region_boost = 0.05 if input_region and region == input_region else 0
            boosted_score = min(score + region_boost, 1.0)

            # Append match result
            matches.append({
                "id": row_id,
                "name": f"{name} ({country})",
                "score": boosted_score,
                "match": boosted_score >= 0.80  # True if score is above threshold
            })

        conn.close()

        # Sort matches by score and return top 3
        matches.sort(key=lambda x: x["score"], reverse=True)
        results[key] = { "result": matches[:3] }

    return jsonify(results)


@app.route("/reconcile", methods=["GET"])
def reconcile_metadata():
    """
    Return reconciliation service metadata for OpenRefine discovery.
    Supports JSONP via 'callback' parameter.
    """
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
        # Return JSONP if callback is specified
        jsonp = f"{callback}({json.dumps(metadata)})"
        return Response(jsonp, mimetype="application/javascript")
    else:
        return jsonify(metadata)
    
@app.route("/suggest/property", methods=["GET"])
def suggest_property():
    """
    Suggest available property fields for reconciliation (used by OpenRefine).
    Supports optional prefix filtering.
    """
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
    # Run Flask app in debug mode
    app.run(debug=True)
