function Product({
  product_name,
  product_number,
  price,
  in_stock,
  picture_url,
  company,
}) {

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={picture_url || "https://picsum.photos/seed/placeholder/500/500"}
          alt={product_name}
          className="product-image"
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/seed/fallback/500/500"
          }}
        />
        {!in_stock && <span className="product-badge out-of-stock">OUT OF STOCK</span>}
      </div>

      <div className="product-body">
        {company && <span className="product-company">{company}</span>}

        <h3 className="product-name">{product_name}</h3>

        <div className="product-meta-row">
          <span className="product-number">{product_number}</span>
          <span className="product-price">₹{price}</span>
        </div>
      </div>
    </article>
  )
}

export default Product