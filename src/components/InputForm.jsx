function InputForm({ formData, handleInputChange, handleSubmit, isLoading }) {
  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="form-group">
        <label htmlFor="decision">What decision would you like to change?</label>
        <input
          type="text"
          id="decision"
          name="decision"
          value={formData.decision}
          onChange={handleInputChange}
          placeholder="e.g., What if I chose art instead of CS?"
          required
          className="form-control"
          disabled={isLoading}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="context">Additional context (optional)</label>
        <textarea
          id="context"
          name="context"
          value={formData.context}
          onChange={handleInputChange}
          placeholder="Tell us about your current job, skills, personality traits, etc."
          className="form-control"
          rows="4"
          disabled={isLoading}
        />
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Alternate Reality'}
      </button>
    </form>
  )
}

export default InputForm
