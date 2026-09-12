import { Link } from 'react-router-dom'
import { isLoggedIn } from '../lib/auth'

function Header() {
  const loggedIn = isLoggedIn()

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
          {loggedIn ? (
            <Link to="/add_product">Add Product</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header