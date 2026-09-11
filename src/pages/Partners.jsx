import { domesticPartners, internationalPartners } from '../data/partners'

function PartnerCard({ partner }) {
  return (
    <article className="partner-card">
      <div className="partner-card-head">
        <h3 className="partner-name">{partner.name}</h3>
        <span className="partner-tagline">{partner.tagline}</span>
      </div>

      <p className="partner-products">{partner.products}</p>
      <p className="partner-description">{partner.description}</p>

      <div className="partner-card-foot">
        {partner.location && (
          <span className="partner-location">📍 {partner.location}</span>
        )}
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="partner-link"
        >
          Visit Website <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}

function Partners() {
  return (
    <div className="container">
      <div className="page-intro">
        <h1>Our Trading Partners</h1>
        <p>
          Premium scientific equipment and chemicals from leading global manufacturers
        </p>
      </div>

      {/* Domestic */}
      <section className="partners-section">
        <header className="partners-section-head">
          <h2>Domestic Representatives</h2>
          <span className="partners-count">{domesticPartners.length} partners</span>
        </header>

        <div className="partners-grid">
          {domesticPartners.map(p => (
            <PartnerCard key={p.name} partner={p} />
          ))}
        </div>
      </section>

      {/* International */}
      <section className="partners-section">
        <header className="partners-section-head">
          <h2>International Partners</h2>
        </header>
        <p className="partners-section-sub">
          Bringing global expertise and innovative solutions to the Indian scientific community
        </p>

        <div className="partners-grid partners-grid-international">
          {internationalPartners.map(p => (
            <PartnerCard key={p.name} partner={p} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Partners