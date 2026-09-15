import { Link } from 'react-router-dom'
import { domesticPartners, internationalPartners } from '../data/partners'

const partnerLinks = [...domesticPartners, ...internationalPartners]

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          Deep Scientific
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <div className="nav-dropdown partners-dropdown-shell">
            <Link to="/partners" className="nav-link-dropdown">
              Partners <span aria-hidden="true">▾</span>
            </Link>
            <div className="partners-dropdown" role="menu" aria-label="Partner websites">
              {partnerLinks.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-option"
                  role="menuitem"
                >
                  {partner.name}
                </a>
              ))}
            </div>
          </div>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
