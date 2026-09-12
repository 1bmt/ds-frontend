import { useState, useEffect } from 'react'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch('http://localhost:8000/api/products', { signal: controller.signal })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)

        const data = await res.json()
        setProducts(data)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()   // cleanup if component unmounts
  }, [])

  return { products, loading, error }
}