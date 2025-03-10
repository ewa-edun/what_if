from api.models.schemas import WhatIfRequest, WhatIfResponse, ExplanationItem
from api.services.nebius_service import invoke_nebius_model
import json

def create_prompt(request: WhatIfRequest):
    """Create a prompt for the AI model based on user input"""
    mode_descriptions = {
        "optimistic": "Focus on the best possible outcomes.",
        "realistic": "Consider the most likely outcomes based on data and trends.",
        "chaotic": "Explore unusual but still plausible outcomes."
    }
    
    mode_instruction = mode_descriptions.get(request.mode, mode_descriptions["realistic"])
    
    prompt = f"""
    You are an AI that creates alternate reality scenarios based on life decisions.
    
    USER DECISION: "{request.decision}"
    
    ADDITIONAL CONTEXT: "{request.context}"
    
    MODE: {request.mode.upper()} - {mode_instruction}
    
    Generate an alternate reality scenario based on this decision. 
    Provide a detailed description of how the person's life might be different.
    
    Then, explain your reasoning by identifying 3-5 key factors that influenced this alternate reality.
    For each factor, provide evidence-based reasoning.
    
    Format your response as JSON with the following structure:
    {{
        "scenario": "detailed description of the alternate reality",
        "explanation": [
            {{"factor": "factor name 1", "reasoning": "explanation of how this factor influenced the outcome"}},
            ...and so on for each factor
        ]
    }}
    """
    
    return prompt

def parse_ai_response(response_text):
    """Parse the AI model output into our response schema"""
    try:
        # First attempt to find and extract JSON
        start_index = response_text.find('{')
        end_index = response_text.rfind('}') + 1
        
        if start_index >= 0 and end_index > start_index:
            json_str = response_text[start_index:end_index]
            result = json.loads(json_str)
            
            # Validate the parsed result has the expected structure
            if "scenario" not in result or "explanation" not in result:
                raise ValueError("AI response missing required fields")
                
            return result
        else:
            raise ValueError("No valid JSON found in AI response")
    except Exception as e:
        # Fallback parsing logic if JSON extraction fails
        # This is simplified - would need more robust parsing in production
        return {
            "scenario": "We couldn't generate a proper scenario at this time.",
            "explanation": [
                {"factor": "Error", "reasoning": f"Failed to parse AI response: {str(e)}"}
            ]
        }

def generate_alternate_reality(request: WhatIfRequest) -> WhatIfResponse:
    """Generate an alternate reality scenario based on user input"""
    # Create prompt for the AI
    prompt = create_prompt(request)
    
    # Call Nebius AI model
    ai_response = invoke_nebius_model(prompt)
    
    # Extract the text from the response
    # The exact path to extract response text depends on Nebius API response structure
    response_text = ai_response.get("response", {}).get("alternatives", [{}])[0].get("message", {}).get("text", "")
    
    # Parse the AI response
    parsed_response = parse_ai_response(response_text)
    
    # Create and return our response object
    return WhatIfResponse(
        scenario=parsed_response["scenario"],
        explanation=[
            ExplanationItem(factor=item["factor"], reasoning=item["reasoning"])
            for item in parsed_response["explanation"]
        ]
    )
