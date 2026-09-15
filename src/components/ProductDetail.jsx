import { useEffect } from 'react'

function ProductDetail({ product, isOpen, onClose }) {
  // Close modal on Escape key
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'auto'
      }
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="product-detail-title">
        <div className="modal-content">
          {/* Close button */}
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close product details"
          >
            ✕
          </button>

          <div className="product-detail-wrapper">
            {/* Image section */}
            <div className="product-detail-image">
              <img
                src={product.picture_url || "https://picsum.photos/seed/placeholder/500/500"}
                alt={product.product_name}
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/seed/fallback/500/500"
                }}
              />
              <span className={`product-badge ${product.in_stock ? 'in-stock' : 'out-of-stock'}`}>
                {product.in_stock ? 'In stock' : 'Out of stock'}
              </span>
            </div>

            {/* Details section */}
            <div className="product-detail-info">
              <div className="product-detail-labels">
                {product.company && <span className="product-company">{product.company}</span>}
                {product.category && <span className="product-category">{product.category}</span>}
              </div>

              <h2 id="product-detail-title" className="product-detail-name">
                {product.product_name}
              </h2>

              <div className="product-detail-meta">
                <div className="meta-item">
                  <span className="meta-label">Product Number</span>
                  <span className="meta-value">#{product.product_number}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Price</span>
                  <span className="meta-value price">₹{product.price}</span>
                </div>
              </div>

              {product.description && (
                <div className="product-detail-description">
                  <h3>Description</h3>
                  <p>{product.description}</p>
                </div>
              )}

              <div className="product-detail-actions">
                <button className="btn btn-primary" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
