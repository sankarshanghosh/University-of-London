import requests  # For HTTP requests to the API
import json      # For loading test cases

BASE_URL = "http://127.0.0.1:5000/reconcile"  # API endpoint
TEST_FILE = "eval_testcases.json"              # Test cases file

with open(TEST_FILE, "r", encoding="utf-8") as f:
    # Load test cases from JSON file
    test_cases = json.load(f)

true_positives = 0  # Correct matches
false_positives = 0  # Incorrect matches returned
false_negatives = 0  # Missed expected matches

for idx, test in enumerate(test_cases):
    # Extract query and expected result
    query = test["query"]
    expected_id = test["expected_id"]

    # Send query to reconciliation API
    payload = {"query": query}
    response = requests.post(BASE_URL, json=payload)
    response_json = response.json()
    result = response_json.get("q0", {}).get("result", [])

    # Get top match from API response
    top_match = result[0] if result else None
    top_id = top_match["id"] if top_match else None
    top_match_flag = top_match["match"] if top_match else False

    # Convert IDs to string for comparison
    expected_str = str(expected_id).strip() if expected_id is not None else None
    top_id_str = str(top_id).strip() if top_id is not None else None

    # Evaluate outcome
    if expected_str == top_id_str:
        true_positives += 1
        outcome = "✅ correct"
    elif expected_str is None and top_id_str is None:
        true_positives += 1
        outcome = "✅ correct (no match expected)"
    elif expected_str is None and top_id_str:
        false_positives += 1
        outcome = "❌ false positive"
    elif expected_str and not top_id_str:
        false_negatives += 1
        outcome = "❌ missed match"
    else:
        false_positives += 1
        false_negatives += 1
        outcome = "❌ wrong match"

    # Print result for each test case
    print(f"[{idx+1}] Query: {query['name']} → Expected: {expected_str}, Got: {top_id_str} → {outcome}")

# Calculate and print evaluation metrics
precision = true_positives / (true_positives + false_positives) if (true_positives + false_positives) else 0
recall = true_positives / (true_positives + false_negatives) if (true_positives + false_negatives) else 0
f1_score = (2 * precision * recall) / (precision + recall) if (precision + recall) else 0

print("\n--- Evaluation Summary ---")
print(f"Precision: {precision:.2f}")
print(f"Recall:    {recall:.2f}")
print(f"F1 Score:  {f1_score:.2f}")