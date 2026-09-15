import { useMemo, useState } from 'react'
import Product from '../components/Product'
import { useProducts } from '../hooks/useProducts'

const EMPTY_FILTERS = {
  company: '',
  category: '',
  stock: 'all',
}

function getStockValue(stock) {
  if (stock === 'in-stock') return true
  if (stock === 'out-of-stock') return false
  return null
}

function Products() {
  const [draftFilters, setDraftFilters] = useState(EMPTY_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS)
  const [search, setSearch] = useState('')

  const apiFilters = useMemo(
    () => ({
      inStock: getStockValue(appliedFilters.stock),
      company: appliedFilters.company,
      category: appliedFilters.category,
    }),
    [appliedFilters]
  )
  const { products, loading, error, filterOptions, refetch } = useProducts(apiFilters)

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return products

    return products.filter((product) =>
      [product.product_name, product.product_number, product.company, product.category]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    )
  }, [products, search])

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setDraftFilters((filters) => ({ ...filters, [name]: value }))
  }

  const handleApplyFilters = (event) => {
    event.preventDefault()
    setAppliedFilters(draftFilters)
  }

  const handleClearFilters = () => {
    setDraftFilters(EMPTY_FILTERS)
    setAppliedFilters(EMPTY_FILTERS)
    setSearch('')
  }

  const hasActiveFilters =
    appliedFilters.company || appliedFilters.category || appliedFilters.stock !== 'all'

  return (
    <main className="catalog-page">
      <div className="catalog-hero">
        <div className="container catalog-hero-inner">
          <p className="catalog-eyebrow">Scientific supply catalogue</p>
          <h1>Find the right product for your lab</h1>
          <p>
            Browse trusted laboratory equipment, chemicals, and consumables from our
            established scientific partners.
          </p>
        </div>
      </div>

      <div className="container catalog-layout">
        <aside className="catalog-filters" aria-label="Product filters">
          <div className="catalog-filter-heading">
            <div>
              <p className="catalog-filter-label">Refine catalogue</p>
              <h2>Filters</h2>
            </div>
            {hasActiveFilters && (
              <button type="button" className="filter-clear" onClick={handleClearFilters}>
                Clear all
              </button>
            )}
          </div>

          <form className="filter-form" onSubmit={handleApplyFilters}>
            <div className="filter-field">
              <label htmlFor="product-company">Company</label>
              <select
                id="product-company"
                name="company"
                value={draftFilters.company}
                onChange={handleFilterChange}
              >
                <option value="">All companies</option>
                {filterOptions.companies.map((company) => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label htmlFor="product-category">Category</label>
              <select
                id="product-category"
                name="category"
                value={draftFilters.category}
                onChange={handleFilterChange}
              >
                <option value="">All categories</option>
                {filterOptions.categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <fieldset className="stock-filter">
              <legend>Availability</legend>
              <label>
                <input
                  type="radio"
                  name="stock"
                  value="all"
                  checked={draftFilters.stock === 'all'}
                  onChange={handleFilterChange}
                />
                All products
              </label>
              <label>
                <input
                  type="radio"
                  name="stock"
                  value="in-stock"
                  checked={draftFilters.stock === 'in-stock'}
                  onChange={handleFilterChange}
                />
                In stock
              </label>
              <label>
                <input
                  type="radio"
                  name="stock"
                  value="out-of-stock"
                  checked={draftFilters.stock === 'out-of-stock'}
                  onChange={handleFilterChange}
                />
                Out of stock
              </label>
            </fieldset>

            <button type="submit" className="btn btn-primary filter-submit" disabled={loading}>
              {loading && <span className="spinner" aria-hidden="true" />}
              Apply filters
            </button>
          </form>
        </aside>

        <section className="catalog-results" aria-live="polite" aria-busy={loading}>
          <div className="catalog-results-head">
            <div>
              <p className="catalog-filter-label">Product catalogue</p>
              <h2>{loading ? 'Updating products…' : `${visibleProducts.length} product${visibleProducts.length === 1 ? '' : 's'} found`}</h2>
            </div>
            <button type="button" className="catalog-refresh" onClick={refetch} disabled={loading}>
              Refresh
            </button>
          </div>

          <label className="catalog-search" htmlFor="product-search">
            <span className="sr-only">Search products</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" /></svg>
            <input
              id="product-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by product, catalogue number, company…"
            />
          </label>

          {loading && products.length === 0 && <p className="catalog-status">Loading products…</p>}
          {error && <p className="catalog-status catalog-status-error">Couldn’t load products: {error}</p>}
          {!loading && !error && visibleProducts.length === 0 && (
            <div className="catalog-empty">
              <h3>No matching products</h3>
              <p>Try a different search or clear your filters to see more of the catalogue.</p>
              <button type="button" className="btn" onClick={handleClearFilters}>Clear filters</button>
            </div>
          )}
          {!error && visibleProducts.length > 0 && (
            <div className="products catalog-products">
              {visibleProducts.map((product) => <Product key={product.id} {...product} />)}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Products
