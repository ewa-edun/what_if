import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const generateScenario = async (decision, context, mode) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are an AI that creates alternate reality scenarios based on life decisions.
      
      USER DECISION: "${decision}"
      ADDITIONAL CONTEXT: "${context}"
      MODE: ${mode.toUpperCase()}
      
      ${mode === 'optimistic' ? 'Focus on the best possible outcomes.' :
        mode === 'realistic' ? 'Consider the most likely outcomes based on data and trends.' :
        'Explore unusual but still plausible outcomes.'}
      
      Generate an alternate reality scenario and explain your reasoning with 3-5 key factors.
      
      Format your response exactly like this JSON structure:
      {
        "scenario": "detailed description of the alternate reality",
        "explanation": [
          {"factor": "factor name 1", "reasoning": "explanation of how this factor influenced the outcome"},
          {"factor": "factor name 2", "reasoning": "explanation of how this factor influenced the outcome"}
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}') + 1;
      const jsonStr = text.slice(jsonStart, jsonEnd);
      
      const parsed = JSON.parse(jsonStr);
      return parsed;
    } catch (e) {
      console.error('Error parsing AI response:', e);
      
      return {
        scenario: text,
        explanation: [
          {
            factor: "AI Response",
            reasoning: "Generated from Gemini API"
          }
        ]
      };
    }

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    
    return {
      scenario: "We couldn't generate a scenario at this time. Please try again later.",
      explanation: [
        {
          factor: "Error",
          reasoning: "There was an error connecting to the AI service. Please try again."
        }
      ]
    };
  }
};

const saveScenario = (formData, result) => {
  try {
    const scenarios = JSON.parse(localStorage.getItem('whatIfScenarios') || '[]');
    scenarios.push({
      id: Date.now(),
      date: new Date().toISOString(),
      formData,
      result
    });
    localStorage.setItem('whatIfScenarios', JSON.stringify(scenarios));
    return true;
  } catch (error) {
    console.error('Error saving scenario:', error);
    return false;
  }
};

const getSavedScenarios = () => {
  try {
    return JSON.parse(localStorage.getItem('whatIfScenarios') || '[]');
  } catch (error) {
    console.error('Error getting scenarios:', error);
    return [];
  }
};

export { generateScenario, saveScenario, getSavedScenarios };
