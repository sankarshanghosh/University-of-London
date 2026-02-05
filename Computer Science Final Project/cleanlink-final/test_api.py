import requests
import pytest

BASE_URL = "http://127.0.0.1:5000"

# --- POST Tests ---

def test_basic_match():
    payload = {
        "query": {
            "name": "Ajmn",
            "country_code": "AE"
        }
    }
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    assert response.status_code == 200
    result = response.json()["q0"]["result"]
    assert isinstance(result, list)
    assert result[0]["match"] is True
    assert "Ajman" in result[0]["name"]

def test_alternate_name_match():
    payload = {
        "query": {
            "name": "Surudeu",
            "country_code": "AD"
        }
    }
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    result = response.json()["q0"]["result"]
    assert result[0]["score"] >= 0.8

def test_region_boost_effect():
    payload = {
        "query": {
            "name": "Soldeu",
            "country_code": "AD",
            "region_code": "02"  # Known region_code for Soldeu
        }
    }
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    result = response.json()["q0"]["result"]
    assert result[0]["score"] > 0.85
    assert result[0]["match"] is True

def test_score_ordering():
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

def test_multiple_queries():
    payload = {
        "q1": {"name": "Ajmn", "country_code": "AE"},
        "q2": {"name": "Soldeu", "country_code": "AD", "region_code": "02"}
    }
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    data = response.json()
    assert "q1" in data and "q2" in data
    assert isinstance(data["q1"]["result"], list)
    assert isinstance(data["q2"]["result"], list)

def test_empty_query_object():
    payload = {"query": {}}
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    assert response.status_code == 200
    assert "q0" in response.json()

def test_missing_name_field():
    payload = {
        "query": {
            "country_code": "AD"
        }
    }
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    data = response.json()
    assert "q0" in data
    assert data["q0"]["result"] == []
    assert "error" in data["q0"]

def test_non_string_country_code():
    payload = {
        "query": {
            "name": "Soldeu",
            "country_code": 123  # Should be string
        }
    }
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    data = response.json()
    assert "q0" in data
    assert data["q0"]["result"] == []
    assert "error" in data["q0"]

def test_missing_content_type():
    response = requests.post(f"{BASE_URL}/reconcile", data="some invalid format")
    assert response.status_code == 415

def test_result_structure():
    payload = {
        "query": {
            "name": "Ajmn",
            "country_code": "AE"
        }
    }
    response = requests.post(f"{BASE_URL}/reconcile", json=payload)
    result = response.json()["q0"]["result"][0]
    for field in ["id", "name", "score", "match"]:
        assert field in result
    assert isinstance(result["score"], float)
    assert 0.0 <= result["score"] <= 1.0

# --- GET Tests ---

def test_metadata_endpoint():
    response = requests.get(f"{BASE_URL}/reconcile")
    assert response.status_code == 200
    data = response.json()
    assert data["name"].startswith("CleanLink+")
    assert "identifierSpace" in data
    assert "defaultTypes" in data
