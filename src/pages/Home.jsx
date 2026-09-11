import Product from '../components/Product'
import { useProducts } from '../hooks/useProducts'

function Home() {
  const { products, loading, error } = useProducts()

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

      <div className="products">
        {loading && <p className="status">Loading products…</p>}
        {error && <p className="status error">Couldn't load products: {error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="status">No products available.</p>
        )}
        {!loading && !error &&
          products.map(p => <Product key={p.id} {...p} />)}
      </div>
    </div>
  )
}

export default Home