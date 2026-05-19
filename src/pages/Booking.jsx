import { useState } from 'react'

const services = [
  'WiFi Troubleshooting - $70',
  'New Router Setup - $85',
  'WiFi Extender Setup - $75',
  'New iPhone or Android Setup - $80',
  'New Mac or PC Setup - $100',
  'Smart TV Setup - $85',
  'New Printer Setup - $70',
  'Account or Password Recovery - $65',
  'Virus or Malware Removal - $100',
  'Computer Cleanup and Optimization - $85',
  'Data Backup Setup - $80',
  'Phone to Phone Data Transfer - $85',
  'Smart Home Device Setup - $50 per device',
  'Other / Not Sure - Hourly Rate Applies',
]

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM',
]

function Booking() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: '',
    time: '',
    service: '',
    description: '',
    agreed: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  if (loading) return
  setLoading(true)
  try {
    const response = await fetch('https://your-render-url.onrender.com/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    if (response.ok) {
      setSubmitted(true)
    } else {
      alert('Something went wrong. Please try again or email davy@tidaltechco.com directly.')
    }
  } catch (error) {
    alert('Could not connect to the server. Please try again or email davy@tidaltechco.com directly.')
  } finally {
    setLoading(false)
  }
}

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Received</h2>
          <p className="text-gray-600 mb-2">Thanks {form.name}, your appointment request has been sent.</p>
          <p className="text-gray-600 mb-6">Davy will reach out to confirm your appointment and let you know pricing before the visit.</p>
          <p className="text-sm text-gray-400">Questions? Email davy@tidaltechco.com</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Book an Appointment</h1>
          <p className="text-gray-500">Fill out the form below and Davy will confirm your appointment within 24 hours.</p>
          <p className="text-blue-600 font-semibold mt-2">You pay only when its fixed.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-6">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Smith"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="(310) 555-0000"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="jane@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Service Address</label>
            <input
              type="text"
              name="address"
              required
              value={form.address}
              onChange={handleChange}
              placeholder="123 Pacific Coast Hwy, Malibu, CA"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Date</label>
              <input
                type="date"
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Time</label>
              <select
                name="time"
                required
                value={form.time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Service Needed</label>
            <select
              name="service"
              required
              value={form.service}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Details</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the issue or anything helpful to know before the visit..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
            <p className="font-semibold text-gray-700 mb-1">How payment works</p>
            <p>You do not pay anything until your issue is resolved. Once the job is done, payment is collected on site by cash or card. Davy will confirm pricing before the visit for flat rate services.</p>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="agreed"
              id="agreed"
              required
              checked={form.agreed}
              onChange={handleChange}
              className="mt-1"
            />
            <label htmlFor="agreed" className="text-sm text-gray-600">
              I understand that payment is due upon completion of service and that Tidal Tech is not responsible for pre-existing damage or data loss. I agree to the Tidal Tech service terms.
            </label>
          </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 text-white py-3 rounded-lg font-bold hover:bg-teal-600 transition text-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                {loading ? 'Sending...' : 'Request Appointment'}
            </button>
          <p className="text-center text-sm text-gray-400">
            Prefer to call or email? Reach Davy at davy@tidaltechco.com
          </p>

        </form>
      </div>
    </div>
  )
}

export default Booking