from flask import Blueprint, request, jsonify
from api.models.schemas import WhatIfRequest, WhatIfResponse
from api.services.ai_service import generate_alternate_reality
import json

bp = Blueprint('main', __name__, url_prefix='/api')

@bp.route('/generate', methods=['POST'])
def generate_scenario():
    try:
        # Parse request data
        data = request.json
        request_model = WhatIfRequest(**data)
        
        # Generate response using AI service
        response = generate_alternate_reality(request_model)
        
        return jsonify(response.dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
