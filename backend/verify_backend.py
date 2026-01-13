import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_health():
    print(f"Testing Health Endpoint at {BASE_URL}/health...")
    try:
        r = requests.get(f"{BASE_URL}/health", timeout=5)
        print(f"Health Check Status: {r.status_code}")
        print(f"Health Check Response: {r.text}")
        return r.status_code == 200
    except requests.exceptions.ConnectionError:
        print("❌ Critical Error: Could not connect to backend. Is it running?")
        return False
    except Exception as e:
        print(f"❌ Health Check Failed with error: {e}")
        return False

def test_cors():
    print(f"\nTesting CORS configuration for origin http://localhost:5173...")
    try:
        # Simulate preflight options request from frontend port
        headers = {
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type"
        }
        r = requests.options(f"{BASE_URL}/api/v1/resumes/score", headers=headers, timeout=5)
        
        print(f"CORS Preflight Status: {r.status_code}")
        allow_origin = r.headers.get('access-control-allow-origin')
        print(f"Access-Control-Allow-Origin Header: {allow_origin}")
        
        if r.status_code == 200 and (allow_origin == 'http://localhost:5173' or allow_origin == '*'):
            print("✅ CORS is correctly configured.")
            return True
        else:
            print("❌ CORS Configuration Error.")
            return False
    except Exception as e:
        print(f"[ERR] CORS Check Failed: {e}")
        return False

if __name__ == "__main__":
    print("--- STARTING BACKEND DIAGNOSTICS ---")
    health_ok = test_health()
    
    if health_ok:
        cors_ok = test_cors()
        if cors_ok:
            print("\n[OK] DIAGNOSTICS PASSED: Backend is reachable and configured for Frontend.")
        else:
            print("\n[WARN] DIAGNOSTICS RESULT: Backend is UP, but CORS is misconfigured.")
    else:
        print("\n[ERR] DIAGNOSTICS RESULT: Backend is NOT REACHABLE.")
    print("--- DIAGNOSTICS COMPLETE ---")
