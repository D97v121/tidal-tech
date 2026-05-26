import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const services = [
  'WiFi Troubleshooting - $40',
  'New Router Setup - $40',
  'WiFi Extender Setup - $35',
  'New iPhone or Android Setup - $40',
  'New Mac or PC Setup - $40',
  'Smart TV Setup - $45',
  'New Printer Setup - $35',
  'Account or Password Recovery - $35',
  'Virus or Malware Removal - $45',
  'Computer Cleanup and Optimization - $40',
  'Data Backup Setup - $35',
  'Phone to Phone Data Transfer - $40',
  'Smart Home Device Setup - $35',
  'Other / Not Sure',
]

function Booking() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: '',
    time: '',
    requestedTime: '',
    service: '',
    description: '',
    agreed: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [availability, setAvailability] = useState([])
    const [availableTimes, setAvailableTimes] = useState([])
    const [calendarMonth, setCalendarMonth] = useState(new Date())
    const [calendarDays, setCalendarDays] = useState([])    

  useEffect(() => {
    fetch('https://tidal-tech-server.onrender.com/api/booking')
    fetchAvailability()
    }, [])

    const fetchAvailability = async () => {
    const { data, error } = await supabase
        .from('availability')
        .select('*')
        .eq('is_available', true)
        .order('date', { ascending: true })

    if (!error) setAvailability(data)
    }

    useEffect(() => {
        const year = calendarMonth.getFullYear()
        const month = calendarMonth.getMonth()
        const firstDay = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const days = []
        for (let i = 0; i < firstDay; i++) days.push(null)
        for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d))
        setCalendarDays(days)
    }, [calendarMonth])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      const response = await fetch('https://tidal-tech-server.onrender.com/api/booking', {
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

const handleDateChange = (e) => {
  const selectedDate = e.target.value
  setForm((prev) => ({ ...prev, date: selectedDate, time: '' }))
  const timesForDate = availability
    .filter((slot) => slot.date === selectedDate)
    .map((slot) => slot.time)
  setAvailableTimes(timesForDate)
}

const handleChange = (e) => {
  const { name, value, type, checked } = e.target
  setForm((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }))
}

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-slate-700 mb-4">Booking Received</h2>
          <p className="text-slate-500 mb-2">Thanks {form.name}, your request has been sent.</p>
          <p className="text-slate-500 mb-6">Davy will reach out to confirm your appointment and pricing within 24 hours.</p>
          <p className="text-sm text-slate-400">Questions? Email davy@tidaltechco.com</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      <section className="bg-gradient-to-b from-slate-50 to-blue-50 px-6 py-10 text-center">
        <div className="flex justify-center mb-2">
          <img
            src="/logo-icon.png"
            alt="Tidal Tech"
            className="h-50 w-auto -mb-15 -mt-20"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-slate-700">Book an Appointment</h1>
        <p className="text-xl text-slate-500 mb-2">Fill out the form below and Davy will confirm within 24 hours.</p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-6">
            <h2 className="text-lg font-bold text-slate-700">Your Information</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="(310) 555-0000"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="jane@email.com"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="123 Pacific Coast Hwy, Malibu, CA"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
              />
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-6">
            <h2 className="text-lg font-bold text-slate-700">Appointment Details</h2>

            <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select a Date</label>

            <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex justify-between items-center mb-4">
                <button
                    type="button"
                    onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1))}
                    className="text-slate-400 hover:text-teal-600 font-bold text-lg px-2 cursor-pointer"
                >
                    &#8249;
                </button>
                <span className="font-semibold text-slate-700">
                    {calendarMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button
                    type="button"
                    onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1))}
                    className="text-slate-400 hover:text-teal-600 font-bold text-lg px-2 cursor-pointer"
                >
                    &#8250;
                </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="text-center text-xs font-semibold text-slate-400 py-1">{d}</div>
                ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                    if (!day) return <div key={index} />
                    const dateStr = day.toISOString().split('T')[0]
                    const isAvailable = availability.some((slot) => slot.date === dateStr)
                    const isSelected = form.date === dateStr
                    const isPast = day < new Date(new Date().setHours(0, 0, 0, 0))

                    return (
                    <button
                        key={dateStr}
                        type="button"
                        disabled={!isAvailable || isPast}
                        onClick={() => handleDateChange({ target: { value: dateStr } })}
                        className={`
                        rounded-lg py-2 text-sm font-medium transition cursor-pointer
                        ${isSelected ? 'bg-teal-500 text-white' : ''}
                        ${isAvailable && !isSelected && !isPast ? 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200' : ''}
                        ${!isAvailable || isPast ? 'text-slate-300 cursor-not-allowed' : ''}
                        `}
                    >
                        {day.getDate()}
                    </button>
                    )
                })}
                </div>
            </div>
            <input type="hidden" name="date" value={form.date} required />

            {form.date && (
                <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select a Time</label>
                <div className="grid grid-cols-4 gap-2">
                    {availableTimes.map((t) => (
                    <button
                        key={t}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, time: t }))}
                        className={`
                        rounded-lg py-2 text-sm font-medium border transition cursor-pointer
                        ${form.time === t ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400 hover:text-teal-600'}
                        `}
                    >
                        {t}
                    </button>
                    ))}
                </div>
                </div>
            )}
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                    None of the listed times work? Request a different time
                </label>
                <input
                    type="text"
                    name="requestedTime"
                    value={form.requestedTime || ''}
                    onChange={handleChange}
                    placeholder="e.g. Friday afternoon or weekday mornings"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
                />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Service Needed</label>
              <select
                name="service"
                required
                value={form.service}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
              >
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Additional Details</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the issue or anything helpful to know before the visit..."
                rows={4}
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-slate-100">
            <h3 className="font-bold text-slate-700 mb-1">How payment works</h3>
            <p className="text-slate-500 text-sm">You do not pay anything until your issue is resolved. Once the job is done, payment is collected on site by cash or card. Davy will confirm pricing before the visit.</p>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="agreed"
              id="agreed"
              required
              checked={form.agreed}
              onChange={handleChange}
              className="mt-1 accent-teal-500"
            />
            <label htmlFor="agreed" className="text-sm text-slate-500">
                I understand that payment is due upon completion of service and that Tidal Tech is not responsible for pre-existing damage or data loss. I agree to the <a href="/terms" target="_blank" className="text-teal-500 underline hover:text-teal-600">Tidal Tech service terms</a>.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-white py-3 rounded-lg font-bold hover:bg-teal-600 transition text-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Request Appointment'}
          </button>

          <p className="text-center text-sm text-slate-400">
            Prefer to call or email? Reach Davy at davy@tidaltechco.com or (509) 230-7002
          </p>

        </form>
      </section>
    </div>
  )
}

export default Booking