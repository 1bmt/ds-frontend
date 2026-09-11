import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearToken, isLoggedIn } from '../lib/auth'

function Admin() {
  const navigate = useNavigate()
  const loggedIn = isLoggedIn()

  const [view, setView] = useState('users')   // 'users' | 'products'

  const handleLogout = () => {
    clearToken()
    window.location.href = '/'
  }

  if (!loggedIn) {
    return (
      <div className="container">
        <div className="admin-empty">
          <h2>Not signed in</h2>
          <p>You need to be logged in to view this page.</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-head">
            <h2>Admin</h2>
            <span className="admin-badge">Panel</span>
          </div>

          <nav className="admin-nav">
            <button
              className={`admin-nav-item ${view === 'users' ? 'active' : ''}`}
              onClick={() => setView('users')}
            >
              Users
            </button>
            <button
              className={`admin-nav-item ${view === 'products' ? 'active' : ''}`}
              onClick={() => setView('products')}
            >
              Inventory
            </button>
          </nav>

          <button className="admin-nav-item admin-logout" onClick={handleLogout}>
            Sign Out
          </button>
        </aside>

        {/* Content */}
        <main className="admin-content">
          {view === 'users' && <UsersPanel />}
          {view === 'products' && <ProductsPanel />}
        </main>
      </div>
    </div>
  )
}

/* ---------------- Users panel ---------------- */
function UsersPanel() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    is_admin: false,
  })
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResponse(null)

    try {
      // Adjust the URL and payload to match your backend
      const res = await fetch('http://127.0.0.1:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const text = await res.text()
      let data
      try { data = JSON.parse(text) } catch { data = text }

      if (res.ok) {
        setResponse({ ok: true, message: 'User registered successfully' })
        setForm({ username: '', email: '', password: '', is_admin: false })
      } else {
        const msg =
          (typeof data === 'object' && (data.message || data.error || data.detail)) ||
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
    <section className="admin-panel">
      <header className="admin-panel-head">
        <h1>Register New User</h1>
        <p>Only signed-in admins can create new accounts.</p>
      </header>

      <form className="admin-form" onSubmit={handleSubmit}>
        {response && (
          <div className={`form-response ${response.ok ? 'success' : 'error'}`}>
            {response.message}
          </div>
        )}

        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="e.g. jdoe"
            required
            disabled={loading}
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="user@company.com"
            required
            disabled={loading}
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Temporary Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            required
            minLength={8}
            disabled={loading}
          />
        </div>

        <label className="admin-checkbox">
          <input
            type="checkbox"
            name="is_admin"
            checked={form.is_admin}
            onChange={handleChange}
            disabled={loading}
          />
          <span>Grant admin privileges</span>
        </label>

        <button
          type="submit"
          className="btn btn-primary admin-submit"
          disabled={loading}
        >
          {loading && <span className="spinner" aria-hidden="true" />}
          {loading ? 'Creating…' : 'Create User'}
        </button>
      </form>
    </section>
  )
}

/* ---------------- Products panel (placeholder) ---------------- */
function ProductsPanel() {
  return (
    <section className="admin-panel">
      <header className="admin-panel-head">
        <h1>Inventory</h1>
        <p>Manage products in your catalog.</p>
      </header>

      <div className="admin-placeholder">
        <p>Product management coming soon.</p>
      </div>
    </section>
  )
}

export default Admin