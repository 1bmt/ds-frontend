import { Link } from 'react-router-dom'

const trustPoints = [
  'Laboratory Equipment',
  'Research Chemicals',
  'Scientific Instruments',
  'Trusted Supply Network',
]

function Home() {
  return (
    <div className="container home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Since 2014</span>
          <h1>Trusted scientific solutions for modern laboratories.</h1>
          <p>
            Deep Scientific helps research institutions, labs, and industries source
            dependable laboratory equipment, chemicals, and instruments from reputable
            global manufacturers.
          </p>

          <div className="hero-badges" aria-label="Core capabilities">
            {trustPoints.map((item) => (
              <span key={item} className="badge-pill">{item}</span>
            ))}
          </div>

          <div className="hero-actions">
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
          <span>Years of service</span>
        </div>
        <div className="trust-item">
          <strong>9+</strong>
          <span>Domestic partners</span>
        </div>
        <div className="trust-item">
          <strong>100%</strong>
          <span>Support-focused</span>
        </div>
      </section>

      <section className="home-about" id="about">
        <div className="section-heading">
          <span className="eyebrow">About us</span>
          <h2>Built on expertise, trust, and long-term scientific partnerships.</h2>
        </div>

        <div className="about-grid">
          <div className="about-copy">
            <p>
              Deep Scientific was established in January 2014 as a leading distributor of
              scientific equipment and laboratory chemicals in Delhi, India. We support
              research institutions, laboratories, pharmaceutical companies, and educational
              institutions with reliable sourcing and practical solutions.
            </p>
            <p>
              Over the years, we have built strong relationships with globally recognized
              manufacturers and suppliers, helping us deliver quality-driven products and
              dependable support to a wide range of scientific applications.
            </p>
          </div>

          <div className="about-feature-list">
            <div className="feature-item">
              <h3>Quality first</h3>
              <p>We supply products that meet the expectations of precise research and operational environments.</p>
            </div>
            <div className="feature-item">
              <h3>Global network</h3>
              <p>Our partnerships help bring advanced scientific technologies and trusted solutions to the Indian market.</p>
            </div>
            <div className="feature-item">
              <h3>Customer focus</h3>
              <p>From product selection to long-term support, we aim to make every interaction smooth and reliable.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner" aria-label="Contact call to action">
        <div>
          <span className="eyebrow eyebrow-light">Let’s talk</span>
          <h3>Need a dependable scientific supply partner?</h3>
        </div>
        <div className="cta-actions">
          <Link to="/partners" className="btn btn-secondary btn-cta">Explore partners</Link>
          <Link to="/contact" className="btn btn-primary btn-cta">Contact us</Link>
        </div>
      </section>
    </div>
  )
}

export default Home