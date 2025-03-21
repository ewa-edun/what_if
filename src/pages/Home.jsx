import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InputForm from '../components/InputForm'
import ModeSelector from '../components/ModeSelector'
import SavedScenarios from '../components/SavedScenarios'
import { generateScenario, saveScenario } from '../services/aiService'

function Home() {
  const [formData, setFormData] = useState({
    decision: '',
    context: '',
    mode: 'realistic' // Default mode
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleModeChange = (mode) => {
    setFormData(prev => ({
      ...prev,
      mode
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Show loading state
      setIsLoading(true)
      setError(null)
      
      // Call our AI service
      const result = await generateScenario(
        formData.decision,
        formData.context,
        formData.mode
      )
      
      // Save the scenario
      saveScenario(formData, result)
      
      // Navigate to result page with the data
      navigate('/result', { state: { formData, result } })
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to generate scenario. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="card">
            <h1>What If?</h1>
            <p>Explore alternate realities based on different life decisions</p>
            
            <InputForm 
              formData={formData} 
              handleInputChange={handleInputChange} 
              handleSubmit={handleSubmit} 
              isLoading={isLoading}
            />
            
            <ModeSelector 
              selectedMode={formData.mode} 
              handleModeChange={handleModeChange} 
            />
            
            {error && <div className="error-message">{error}</div>}
          </div>
          
          <SavedScenarios />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home
