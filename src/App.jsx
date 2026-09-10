import Header from './components/Header'
import Product from './components/Product'
import { useProducts } from './hooks/useProducts'

function App() {
  const { products, loading, error } = useProducts()

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Leading Scientific Equipment & Chemical Distributor</h1>
        <p>
          Serving the scientific community since January 2014 with premium laboratory
          equipment, chemicals, and instruments from world-renowned manufacturers and
          international partners.
        </p>

        <div className="products">
          {loading && <p className="status">Loading products…</p>}

          {error && (
            <p className="status error">
              Couldn't load products: {error}
            </p>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="status">No products available.</p>
          )}

          {!loading && !error &&
            products.map(product => (
              <Product key={product.id} {...product} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default App