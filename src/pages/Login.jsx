import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToken } from '../lib/auth'

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)   // { ok: bool, message: string }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResponse(null)

    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const text = await res.text()
      let data
      try { data = JSON.parse(text) } catch { data = text }

      if (res.ok) {
        const token = data?.access_token || data?.token || data?.jwt

        if (token) {
          saveToken(token)
          setResponse({ ok: true, message: 'Login successful' })
          setPassword('')
          window.location.href = '/admin'
        } else {
          setResponse({
            ok: false,
            message: 'Login succeeded but no token was returned',
          })
        }
      } else {
        const msg =
          (typeof data === 'object' && (data.message || data.error || data.detail)) ||
          (typeof data === 'string' && data) ||
          `Login failed (${res.status})`
        setResponse({ ok: false, message: msg })
      }
    } catch (err) {
      setResponse({
        ok: false,
        message: err.message || 'Network error — could not reach server',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-head">
            <h1>Sign In</h1>
            <p>Access your account</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
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
                autoComplete="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading && <span className="spinner" aria-hidden="true" />}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login