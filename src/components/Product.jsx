function Product({ name, price, in_stock, picture, description }) {
  const badge = !in_stock ? "OUT OF STOCK" : null

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={picture || "https://picsum.photos/seed/placeholder/500/500"}
          alt={name}
          className="product-image"
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/seed/fallback/500/500"
          }}
        />

        {badge && <span className="product-badge">{badge}</span>}
      </div>

      <div className="product-body">
        <h3 className="product-name">{name}</h3>
        {description && <p className="product-subtitle">{description}</p>}

        <div className="product-price-row">
          <span className="product-price">₹{price}</span>
        </div>
      </div>
    </article>
  )
}

export default Product