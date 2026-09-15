import { Link } from 'react-router-dom'

const trustPoints = [
  'Lab Instruments',
  'Lab Chemicals',
  'Thermo Pipettes',
  'Diagnostic Products',
]

function Home() {
  return (
    <div className="container home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Since 2014</span>
          <h1>Leading Scientific Equipment &amp; Chemical Distributor</h1>
          <p>
            Deep Scientific delivers laboratory instruments, chemicals, diagnostic products,
            and scientific essentials to institutions, research teams, and industries that
            need trusted quality and dependable service.
          </p>

          <div className="hero-badges" aria-label="Core capabilities">
            {trustPoints.map((item) => (
              <span key={item} className="badge-pill">{item}</span>
            ))}
          </div>

          <div className="hero-actions">
            <Link to="/about" className="btn btn-secondary">
              About us
            </Link>
            <Link to="/partners" className="btn btn-primary">
              Our Partners
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact us
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-label="Deep Scientific operations">
          <div className="hero-image-grid">
            <img
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80"
              alt="Scientific laboratory equipment"
              className="hero-image hero-image-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=700&q=80"
              alt="Laboratory bench and research tools"
              className="hero-image hero-image-sm hero-image-top"
            />
            <img
              src="https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=700&q=80"
              alt="Scientist working in a laboratory"
              className="hero-image hero-image-sm hero-image-bottom"
            />
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Business highlights">
        <div className="trust-item">
          <strong>10+</strong>
          <span>Years of experience</span>
        </div>
        <div className="trust-item">
          <strong>9+</strong>
          <span>Domestic partners</span>
        </div>
        <div className="trust-item">
          <strong>Trusted</strong>
          <span>For quality and timely supply</span>
        </div>
      </section>

      <section className="cta-banner" aria-label="Contact call to action">
        <div>
          <span className="eyebrow eyebrow-light">Let’s talk</span>
          <h3>Looking for trusted lab products and dependable supply support?</h3>
        </div>
        <div className="cta-actions">
          <Link to="/about" className="btn btn-secondary btn-cta">About us</Link>
          <Link to="/partners" className="btn btn-secondary btn-cta">Explore partners</Link>
          <Link to="/contact" className="btn btn-primary btn-cta">Contact us</Link>
        </div>
      </section>
    </div>
  )
}

export default Home