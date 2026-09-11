function Partners() {
  const partners = [
    { name: "TARSONS", logo: "/partners/tarsons.png" },
    { name: "Borosil", logo: "/partners/borosil.png" },
    // ...
  ]

  return (
    <div className="container">
      <div className="page-intro">
        <h1>Our Partners</h1>
        <p>
          We work with world-renowned manufacturers to bring you quality you can trust.
        </p>
      </div>

      <div className="partners-grid">
        {partners.map(p => (
          <div key={p.name} className="partner-card">
            <img src={p.logo} alt={p.name} />
            <span>{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Partners