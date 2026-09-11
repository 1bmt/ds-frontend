import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          Deep Scientific
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/partners">Partners</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header