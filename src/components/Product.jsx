import { useState } from 'react'
import ProductDetail from './ProductDetail'

function Product({
  id,
  product_name,
  product_number,
  price,
  in_stock,
  picture_url,
  company,
  category,
  description,
}) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const product = {
    id,
    product_name,
    product_number,
    price,
    in_stock,
    picture_url,
    company,
    category,
    description,
  }

  return (
    <>
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
          <span className={`product-badge ${in_stock ? 'in-stock' : 'out-of-stock'}`}>
            {in_stock ? 'In stock' : 'Out of stock'}
          </span>
        </div>

        <div className="product-body">
          <div className="product-labels">
            {company && <span className="product-company">{company}</span>}
            {category && <span className="product-category">{category}</span>}
          </div>

          <h3 className="product-name">{product_name}</h3>

          <div className="product-meta-row">
            <span className="product-number">#{product_number}</span>
            <span className="product-price">₹{price}</span>
          </div>

          <button
            className="btn btn-secondary btn-view"
            onClick={() => setIsDetailOpen(true)}
          >
            View Details
          </button>
        </div>
      </article>

      <ProductDetail
        product={product}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  )
}

export default Product
