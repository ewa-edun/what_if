function ExplanationPanel({ explanations }) {
  return (
    <div className="explanation-panel">
      <h3>How We Arrived at This Reality</h3>
      <div className="explanations">
        {explanations.map((item, index) => (
          <div key={index} className="explanation-item">
            <h4>{item.factor}</h4>
            <p>{item.reasoning}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExplanationPanel
