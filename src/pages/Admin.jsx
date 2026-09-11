import { useNavigate } from 'react-router-dom'
import { clearToken, isLoggedIn } from '../lib/auth'

function Admin() {
  const navigate = useNavigate()
  const loggedIn = isLoggedIn()

  const handleLogout = () => {
    clearToken()
    navigate('/')
  }

  // Just a safety net — remove once you have a proper ProtectedRoute
  if (!loggedIn) {
    return (
      <div className="container">
        <div className="admin-head">
          <div>
            <h1>Not signed in</h1>
            <p>You need to be logged in to view this page.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="admin-head">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage products, partners, and site content.</p>
        </div>
        <button className="btn btn-primary" onClick={handleLogout}>
          Sign Out
        </button>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h3>Products</h3>
          <p>12 items in catalog</p>
          <button className="btn btn-primary">Manage</button>
        </div>
        <div className="admin-card">
          <h3>Partners</h3>
          <p>10 partners listed</p>
          <button className="btn btn-primary">Manage</button>
        </div>
        <div className="admin-card">
          <h3>Messages</h3>
          <p>3 unread inquiries</p>
          <button className="btn btn-primary">View</button>
        </div>
      </div>
    </div>
  )
}

export default Admin