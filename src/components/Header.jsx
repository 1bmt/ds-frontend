import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Delhi <span>Scientific</span>
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/partners">Partners</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  )
}

export default Header