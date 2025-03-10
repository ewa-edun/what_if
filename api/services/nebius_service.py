import requests
import json
from api import config

def get_iam_token():
    """Get IAM token from Nebius Cloud for authentication"""
    # Implementation depends on Nebius Cloud API specifics
    response = requests.post(
        "https://iam.api.cloud.nebius.cloud/iam/v1/tokens",
        headers={"Content-Type": "application/json"},
        data=json.dumps({"yandexPassportOauthToken": config.NEBIUS_API_KEY})
    )
    return response.json().get("iamToken")

def invoke_nebius_model(prompt, temperature=config.MODEL_TEMPERATURE):
    """Call Nebius AI model API to generate text"""
    token = get_iam_token()
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "modelUri": config.NEBIUS_MODEL_URI,
        "request": {
            "prompt": prompt,
            "temperature": temperature,
            "maxTokens": 1000
        }
    }
    
    response = requests.post(
        f"https://llm.api.cloud.nebius.cloud/foundationModels/v1/completion",
        headers=headers,
        data=json.dumps(payload)
    )
    
    return response.json()
