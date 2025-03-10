from pydantic import BaseModel
from typing import List, Optional

class WhatIfRequest(BaseModel):
    decision: str
    context: Optional[str] = ""
    mode: str = "realistic"

class ExplanationItem(BaseModel):
    factor: str
    reasoning: str

class WhatIfResponse(BaseModel):
    scenario: str
    explanation: List[ExplanationItem]
