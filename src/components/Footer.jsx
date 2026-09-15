import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">Deep Scientific</div>
          <p className="footer-copy">
            Supplying dependable scientific solutions for research, education, and industry.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/partners">Partners</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-meta">
          <span>Delhi, India</span>
          <span>hello@deepscientific.in</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Deep Scientific</span>
        <span>Built for scientific discovery</span>
      </div>
    </footer>
  )
}

export default Footer