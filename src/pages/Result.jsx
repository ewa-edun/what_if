import { useLocation, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ResultDisplay from '../components/ResultDisplay'
import ExplanationPanel from '../components/ExplanationPanel'

function Result() {
  const location = useLocation()
  const { formData, result } = location.state || { formData: null, result: null }
  
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="container">
          {formData && result ? (
            <>
              <div className="card">
                <h1>Your Alternate Reality</h1>
                <p>What if: <strong>{formData.decision}</strong></p>
                <p>Mode: <strong>{formData.mode.charAt(0).toUpperCase() + formData.mode.slice(1)}</strong></p>
                
                <ResultDisplay scenario={result.scenario} />
                <ExplanationPanel explanations={result.explanation} />
                
                <div className="actions">
                  <Link to="/" className="btn btn-secondary">Try Another Scenario</Link>
                </div>
              </div>
            </>
          ) : (
            <div className="card">
              <h2>No scenario data found</h2>
              <p>Please return to the home page to create a new scenario.</p>
              <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Result
