import { useCallback, useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'

export function useProducts({ inStock = null, company = '', category = '' } = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterOptions, setFilterOptions] = useState({ companies: [], categories: [] })
  const [requestVersion, setRequestVersion] = useState(0)

  const refetch = useCallback(() => {
    setRequestVersion((version) => version + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (inStock !== null) params.set('in_stock', String(inStock))
        if (company.trim()) params.set('company', company.trim())
        if (category.trim()) params.set('category', category.trim())

        const query = params.toString()
        const res = await apiFetch(`/products${query ? `?${query}` : ''}`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)

        const data = await res.json()
        setProducts(data)
        setFilterOptions((current) => ({
          companies: [...new Set([
            ...current.companies,
            ...data.map((product) => product.company).filter(Boolean),
          ])].sort((a, b) => a.localeCompare(b)),
          categories: [...new Set([
            ...current.categories,
            ...data.map((product) => product.category).filter(Boolean),
          ])].sort((a, b) => a.localeCompare(b)),
        }))
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [inStock, company, category, requestVersion])

  return { products, loading, error, filterOptions, refetch }
}
