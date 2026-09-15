import Product from '../components/Product'
import { useProducts } from '../hooks/useProducts'

function Home() {
  return (
    <div className="container">
      <div className="page-intro">
        <h1>Leading Scientific Equipment &amp; Chemical Distributor</h1>
        <p>
          Serving the scientific community since January 2014 with premium laboratory
          equipment, chemicals, and instruments from world-renowned manufacturers and
          international partners.
        </p>
      </div>

      <div className="home-highlights">
        <div className="info-card">
          <h2>Trusted Supply</h2>
          <p>Focused on dependable sourcing and consistent service for research and lab operations.</p>
        </div>
        <div className="info-card">
          <h2>Scientific Partners</h2>
          <p>We support institutions, laboratories, and industries with solutions built around quality.</p>
        </div>
        <div className="info-card">
          <h2>Customer Support</h2>
          <p>From product selection to follow-up, we aim to be a reliable partner in your workflow.</p>
        </div>
      </div>
    </div>
  )
}

export default Home