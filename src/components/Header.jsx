import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">What If?</Link>
          <nav>
            <Link to="/" className="btn btn-secondary">Home</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
