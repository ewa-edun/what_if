function ModeSelector({ selectedMode, handleModeChange }) {
  const modes = [
    { id: 'optimistic', label: 'Optimistic', description: 'Best possible version of events' },
    { id: 'realistic', label: 'Realistic', description: 'Most likely version based on data' },
    { id: 'chaotic', label: 'Chaotic', description: 'Wild but still logical outcomes' }
  ]
  
  return (
    <div className="mode-selector">
      <h3>Choose a Reality Mode</h3>
      <div className="modes">
        {modes.map(mode => (
          <div 
            key={mode.id}
            className={`mode-option ${selectedMode === mode.id ? 'selected' : ''}`}
            onClick={() => handleModeChange(mode.id)}
          >
            <h4>{mode.label}</h4>
            <p>{mode.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ModeSelector
