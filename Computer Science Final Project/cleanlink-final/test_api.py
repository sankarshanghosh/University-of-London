import requests
import pytest

BASE_URL = "http://127.0.0.1:5000"

# --- Reconcile POST Tests ---

def test_basic_match():
    payload = {
        "query": {
            "name": "Ajmn",
            "country_code": "AE"
        }
    }
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "q0" in data
    result = data["q0"]["result"]
    assert isinstance(result, list)
    assert result[0]["match"] is True
    assert "Ajman" in result[0]["name"]

def test_poor_match_returns_low_score():
    payload = {
        "query": {
            "name": "XyzNotARealCity"
        }
    }
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    result = response.json()["q0"]["result"]
    assert result[0]["score"] < 0.5

def test_multiple_queries():
    payload = {
        "q1": {"name": "Ajmn", "country_code": "AE"},
        "q2": {"name": "Alain", "country_code": "AE"}
    }
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "q1" in data and "q2" in data
    assert isinstance(data["q1"]["result"], list)
    assert isinstance(data["q2"]["result"], list)

def test_empty_query():
    payload = {"query": {}}
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    assert response.status_code == 200
    assert "q0" in response.json()

def test_missing_content_type():
    response = requests.post(f"{BASE_URL}/reconcile", data="garbage data")
    assert response.status_code == 415

def test_score_is_sorted():
    payload = {
        "query": {
            "name": "Ajmn",
            "country_code": "AE"
        }
    }
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    result = response.json()["q0"]["result"]
    scores = [r["score"] for r in result]
    assert scores == sorted(scores, reverse=True)

def test_result_structure():
    payload = {
        "query": {
            "name": "Ajmn",
            "country_code": "AE"
        }
    }
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    result = response.json()["q0"]["result"][0]
    assert all(k in result for k in ["id", "name", "score", "match"])
    assert isinstance(result["score"], float)
    assert 0.0 <= result["score"] <= 1.0

# --- Reconcile GET (Metadata) ---

def test_metadata_endpoint():
    response = requests.get(f"{BASE_URL}/reconcile")
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert "identifierSpace" in data
    assert "defaultTypes" in data
    assert data["name"].startswith("CleanLink+")
