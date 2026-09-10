function Product({ name, number, price, in_stock, picture, description, category, company }) {
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img
          src={picture || "https://picsum.photos/seed/placeholder/400/300"}
          alt={name}
          className="product-image"
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/seed/fallback/400/300";
          }}
        />
        {!in_stock && <span className="product-badge out-of-stock">Out of Stock</span>}
        {in_stock && <span className="product-badge in-stock">In Stock</span>}
      </div>

      <div className="product-body">
        <div className="product-meta">
          {company && <span className="product-company">{company}</span>}
          {category && <span className="product-category">{category}</span>}
        </div>

        <h3 className="product-name">{name}</h3>
        {number && <p className="product-number">{number}</p>}
        {description && <p className="product-description">{description}</p>}

        <div className="product-footer">
          <span className="product-price">₹{price}</span>
          <button className="btn btn-primary" disabled={!in_stock}>
            {in_stock ? "View Details" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product