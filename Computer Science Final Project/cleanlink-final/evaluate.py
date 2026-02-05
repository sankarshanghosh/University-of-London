import requests
import json

BASE_URL = "http://127.0.0.1:5000/reconcile"
TEST_FILE = "eval_testcases.json"

with open(TEST_FILE, "r", encoding="utf-8") as f:
    test_cases = json.load(f)

true_positives = 0
false_positives = 0
false_negatives = 0

for idx, test in enumerate(test_cases):
    query = test["query"]
    expected_id = test["expected_id"]

    payload = {"query": query}
    response = requests.post(BASE_URL, json=payload)
    response_json = response.json()
    result = response_json.get("q0", {}).get("result", [])

    top_match = result[0] if result else None
    top_id = top_match["id"] if top_match and top_match["match"] else None

    if top_id == expected_id:
        true_positives += 1
        outcome = "✅ correct"
    elif expected_id is None and top_id is None:
        true_positives += 1
        outcome = "✅ correct (no match expected)"
    elif expected_id is None and top_id:
        false_positives += 1
        outcome = "❌ false positive"
    elif expected_id and not top_id:
        false_negatives += 1
        outcome = "❌ missed match"
    else:
        false_positives += 1
        false_negatives += 1
        outcome = "❌ wrong match"

    print(f"[{idx+1}] Query: {query['name']} → Expected: {expected_id}, Got: {top_id} → {outcome}")

# Metrics
precision = true_positives / (true_positives + false_positives) if (true_positives + false_positives) else 0
recall = true_positives / (true_positives + false_negatives) if (true_positives + false_negatives) else 0
f1_score = (2 * precision * recall) / (precision + recall) if (precision + recall) else 0

print("\n--- Evaluation Summary ---")
print(f"Precision: {precision:.2f}")
print(f"Recall:    {recall:.2f}")
print(f"F1 Score:  {f1_score:.2f}")
