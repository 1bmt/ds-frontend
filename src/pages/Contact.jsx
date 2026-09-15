import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResponse(null)

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        setResponse({ ok: true, message: "Thanks! We'll be in touch soon." })
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setResponse({ ok: false, message: data.error || 'Something went wrong.' })
      }
    } catch (err) {
      setResponse({ ok: false, message: 'Network error — please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="page-intro">
        <h1>Get in Touch</h1>
        <p>
          Need laboratory instruments, chemicals, or scientific solutions for your business?
          Reach out and our team will be happy to assist you.
        </p>
      </div>

      <div className="contact-wrap">
        <div className="contact-layout">
          <form className="contact-form" onSubmit={handleSubmit}>
            {response && (
              <div className={`form-response ${response.ok ? 'success' : 'error'}`}>
                {response.message}
              </div>
            )}

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
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
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="phone">
                Phone <span className="label-optional">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Tell us what you're looking for — lab instruments, chemicals, quantities, delivery location, etc."
                value={form.message}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending…' : 'Send Message'}
              </button>
            </div>
          </form>

          <aside className="contact-panel">
            <h3>Contact details</h3>
            <p>We support quality-focused scientific supply requirements across research and industry.</p>
            <ul className="contact-list">
              <li>
                <strong>Location</strong>
                <span>New Delhi, Delhi</span>
              </li>
              <li>
                <strong>Proprietor</strong>
                <span>Somvir Hooda</span>
              </li>
              <li>
                <strong>Business Type</strong>
                <span>Wholesaler / Distributor / Supplier</span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Contact