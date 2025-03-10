import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSavedScenarios } from '../services/aiService'

function SavedScenarios() {
  const [scenarios, setScenarios] = useState([])
  
  useEffect(() => {
    // Load saved scenarios
    setScenarios(getSavedScenarios())
  }, [])
  
  if (scenarios.length === 0) {
    return null
  }
  
  return (
    <div className="saved-scenarios">
      <h3>Your Previous Scenarios</h3>
      <div className="scenario-list">
        {scenarios.map(item => (
          <div key={item.id} className="scenario-item">
            <h4>{item.formData.decision}</h4>
            <p>Mode: {item.formData.mode}</p>
            <p className="scenario-date">
              {new Date(item.date).toLocaleDateString()}
            </p>
            <Link 
              to="/result" 
              state={{ formData: item.formData, result: item.result }}
              className="btn btn-secondary btn-sm"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedScenarios
