import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../lib/api'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const INITIAL_FORM = {
  product_name: '',
  product_number: '',
  price: '',
  in_stock: true,
  picture_url: '',
  description: '',
  category: '',
  company: '',
}

function AddProduct() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setResponse(null)

    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('upload_preset', UPLOAD_PRESET)

      // Cloudinary uses its own auth (upload preset), not our apiFetch
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: 'POST', body: fd }
      )

      const data = await res.json()

      if (data.secure_url) {
        setForm((f) => ({ ...f, picture_url: data.secure_url }))
      } else {
        throw new Error(data.error?.message || 'Upload failed')
      }
    } catch (err) {
      setResponse({ ok: false, message: err.message || 'Image upload failed' })
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResponse(null)

    try {
      const payload = {
        product_name: form.product_name.trim(),
        product_number: form.product_number.trim(),
        price: parseInt(form.price, 10),
        in_stock: form.in_stock,
        picture_url: form.picture_url || null,
        description: form.description.trim() || null,
        category: form.category.trim() || null,
        company: form.company.trim() || null,
      }

      const res = await apiFetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      const text = await res.text()
      let data
      try { data = JSON.parse(text) } catch { data = text }

      if (res.ok) {
        setResponse({ ok: true, message: `Product "${data.product_name}" created.` })
        setForm(INITIAL_FORM)
      } else {
        const msg =
          (typeof data === 'object' && (data.detail || data.message || data.error)) ||
          (typeof data === 'string' && data) ||
          `Failed (${res.status})`
        setResponse({ ok: false, message: msg })
      }
    } catch (err) {
      setResponse({ ok: false, message: err.message || 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="page-intro">
        <h1>Add Product</h1>
        <p>Create a new product entry in the catalog.</p>
      </div>

      <div className="contact-wrap">
        <form className="contact-form" onSubmit={handleSubmit}>
          {response && (
            <div className={`form-response ${response.ok ? 'success' : 'error'}`}>
              {response.message}
            </div>
          )}

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="product_name">Product Name</label>
              <input
                id="product_name"
                name="product_name"
                type="text"
                value={form.product_name}
                onChange={handleChange}
                placeholder="e.g. 15 ml Centrifuge Tube"
                required
                disabled={loading}
              />
            </div>

            <div className="form-field">
              <label htmlFor="product_number">Product Number (SKU)</label>
              <input
                id="product_number"
                name="product_number"
                type="text"
                value={form.product_number}
                onChange={handleChange}
                placeholder="e.g. 546021"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="1"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 5130 for ₹5130"
                required
                disabled={loading}
              />
            </div>

            <div className="form-field">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. TARSONS"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Plasticware"
                disabled={loading}
              />
            </div>

            <div className="form-field">
              <label htmlFor="picture">Product Image</label>
              <input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading || loading}
              />
              {uploading && <span className="form-hint">Uploading…</span>}
              {form.picture_url && (
                <div className="image-preview">
                  <img src={form.picture_url} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              placeholder="Product details, specifications, packaging info…"
              disabled={loading}
            />
          </div>

          <label className="admin-checkbox">
            <input
              type="checkbox"
              name="in_stock"
              checked={form.in_stock}
              onChange={handleChange}
              disabled={loading}
            />
            <span>Available in stock</span>
          </label>

          <div className="form-actions">
            <button
              type="button"
              className="btn"
              onClick={() => setForm(INITIAL_FORM)}
              disabled={loading || uploading}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || uploading}
            >
              {loading && <span className="spinner" aria-hidden="true" />}
              {loading ? 'Creating…' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct