import os
from dotenv import load_dotenv

load_dotenv()

# Basic config
DEBUG = os.getenv('DEBUG', 'False') == 'True'
PORT = int(os.getenv('PORT', 5000))

# Nebius Cloud config
NEBIUS_API_KEY = os.getenv('NEBIUS_API_KEY')
NEBIUS_FOLDER_ID = os.getenv('NEBIUS_FOLDER_ID')
NEBIUS_MODEL_URI = os.getenv('NEBIUS_MODEL_URI', 'gpt://yandexgpt-lite')

# AI model config
MODEL_TEMPERATURE = float(os.getenv('MODEL_TEMPERATURE', 0.7))
