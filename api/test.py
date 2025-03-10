import requests

# Test the API
response = requests.post(
    "http://localhost:5000/api/generate",
    json={
        "decision": "What if I had studied medicine instead of engineering?",
        "context": "I'm currently a software engineer with 5 years of experience.",
        "mode": "optimistic"
    }
)

print(f"Status code: {response.status_code}")
print(f"Response: {response.json()}")
