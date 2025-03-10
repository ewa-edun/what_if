// This is a simplified mock service that simulates AI responses
// In a real implementation, this would call the Nebius AI API

const generateScenario = async (decision, context, mode) => {
  // In a real implementation, this would be an API call to Nebius
  // For now, we'll simulate a response with a delay
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a mock response based on the mode
      const scenarios = {
        optimistic: {
          scenario: `In this optimistic alternate reality where you ${decision}, your life took an incredibly positive turn. Opportunities aligned perfectly, and your natural talents flourished in ways you hadn't imagined possible.`,
          explanation: [
            {
              factor: "Perfect timing",
              reasoning: "Your decision coincided with a major industry shift, putting you at the forefront of innovation."
            },
            {
              factor: "Skill alignment",
              reasoning: "Your natural abilities were perfectly suited for this path, allowing you to excel beyond expectations."
            },
            {
              factor: "Network effects",
              reasoning: "This choice connected you with influential mentors who accelerated your growth and opened doors."
            }
          ]
        },
        realistic: {
          scenario: `In this realistic alternate reality where you ${decision}, your life followed a different but plausible path. There were both challenges and rewards, much like your current reality, but with different focal points and outcomes.`,
          explanation: [
            {
              factor: "Market conditions",
              reasoning: "Based on historical data, this career path would have exposed you to different economic cycles and opportunities."
            },
            {
              factor: "Skill development",
              reasoning: "You would have developed a different but equally valuable skill set, with its own advantages and limitations."
            },
            {
              factor: "Work-life balance",
              reasoning: "This path typically offers a different rhythm of work and personal time, affecting your lifestyle in measurable ways."
            }
          ]
        },
        chaotic: {
          scenario: `In this chaotic alternate reality where you ${decision}, your life took unexpected and sometimes bizarre turns! While still within the realm of possibility, this path led to surprising situations and unconventional outcomes.`,
          explanation: [
            {
              factor: "Butterfly effect",
              reasoning: "Small initial changes cascaded into major life differences through a series of unlikely but connected events."
            },
            {
              factor: "Unexpected connections",
              reasoning: "This path introduced you to highly unusual people and opportunities that wouldn't have crossed your path otherwise."
            },
            {
              factor: "Hidden talents",
              reasoning: "The challenges of this path revealed abilities you never knew you had, sending your life in surprising directions."
            }
          ]
        }
      };
      
      // Return the appropriate scenario based on mode
      resolve(scenarios[mode] || scenarios.realistic);
    }, 2000); // Simulate a 2-second API call
  });
};

// Save scenario to localStorage
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

// Get all saved scenarios
const getSavedScenarios = () => {
  try {
    return JSON.parse(localStorage.getItem('whatIfScenarios') || '[]');
  } catch (error) {
    console.error('Error getting scenarios:', error);
    return [];
  }
};

export { generateScenario, saveScenario, getSavedScenarios };
