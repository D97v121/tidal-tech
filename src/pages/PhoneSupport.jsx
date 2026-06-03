import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

function PhoneSupport() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    requestedTime: '',
    issue: '',
    devices: '',
    description: '',
    preferredContact: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [availability, setAvailability] = useState([])
  const [availableTimes, setAvailableTimes] = useState([])
  const [calendarMonth, setCalendarMonth] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState([])

  useEffect(() => {
    fetchAvailability()
  }, [])

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

  const fetchAvailability = async () => {
    const { data, error } = await supabase
      .from('availability')
      .select('*')
      .eq('is_available', true)
      .eq('type', 'phone')
      .order('date', { ascending: true })
    if (!error) setAvailability(data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = ({ target: { value: selectedDate } }) => {
    setForm((prev) => ({ ...prev, date: selectedDate, time: '' }))
    const timesForDate = availability
      .filter((slot) => slot.date === selectedDate)
      .map((slot) => slot.time)
    setAvailableTimes(timesForDate)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      const response = await fetch('https://tidal-tech-server.onrender.com/api/phone-support', { 
      /* const response = await fetch('http://localhost:3001/api/phone-support', { */
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Something went wrong. Please try again or call (509) 230-7002 directly.')
      }
    } catch (error) {
      alert('Could not connect to the server. Please try again or call (509) 230-7002 directly.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-slate-700 mb-4">You are all set</h2>
          <p className="text-slate-500 mb-2">Thanks {form.name}, your phone support request has been received.</p>
          <p className="text-slate-500 mb-6">Davy will call you at your scheduled time. There is nothing else you need to do.</p>
          <p className="text-sm text-slate-400">Questions? Call or text (509) 230-7002</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      <section className="bg-gradient-to-b from-slate-50 to-blue-50 px-6 py-10 text-center">
        <h1 className="text-5xl font-bold mb-4 text-slate-700">Free Over-the-Phone Tech Support</h1>
        <p className="text-xl text-slate-500 mb-2">Real help from a real person, right over the phone.</p>
        <p className="text-lg text-teal-500 font-semibold">Free 30-minute calls. No cost, no commitment, no confusing tech talk.</p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-6">
            <h2 className="text-lg font-bold text-slate-700">Your Information</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Jane Smith"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
              <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="(310) 555-0000"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="jane@email.com"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">How would you prefer Davy to reach you?</label>
              <div className="flex flex-wrap gap-2">
                {['Phone call', 'FaceTime', 'Zoom', 'Google Meet'].map((option) => (
                  <button key={option} type="button"
                    onClick={() => setForm((prev) => ({ ...prev, preferredContact: option }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition cursor-pointer
                      ${form.preferredContact === option
                        ? 'bg-teal-500 text-white border-teal-500'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400 hover:text-teal-600'
                      }`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-6">
            <h2 className="text-lg font-bold text-slate-700">About Your Issue</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">What device are you having trouble with?</label>
              <input type="text" name="devices" value={form.devices} onChange={handleChange}
                placeholder="e.g. iPhone, Mac computer, WiFi router..."
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">What is going on?</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Describe what is happening in as much or as little detail as you like. There are no wrong answers -- just tell us what you are experiencing."
                rows={4} className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-6">
            <h2 className="text-lg font-bold text-slate-700">Schedule Your Call</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Select a Date</label>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex justify-between items-center mb-4">
                  <button type="button"
                    onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1))}
                    className="text-slate-400 hover:text-teal-600 font-bold text-lg px-2 cursor-pointer">
                    &#8249;
                  </button>
                  <span className="font-semibold text-slate-700">
                    {calendarMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </span>
                  <button type="button"
                    onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1))}
                    className="text-slate-400 hover:text-teal-600 font-bold text-lg px-2 cursor-pointer">
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
                      <button key={dateStr} type="button"
                        disabled={!isAvailable || isPast}
                        onClick={() => handleDateChange({ target: { value: dateStr } })}
                        className={`rounded-lg py-2 text-sm font-medium transition cursor-pointer
                          ${isSelected ? 'bg-teal-500 text-white' : ''}
                          ${isAvailable && !isSelected && !isPast ? 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200' : ''}
                          ${!isAvailable || isPast ? 'text-slate-300 cursor-not-allowed' : ''}
                        `}>
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
                      <button key={t} type="button"
                        onClick={() => setForm((prev) => ({ ...prev, time: t }))}
                        className={`rounded-lg py-2 text-sm font-medium border transition cursor-pointer
                          ${form.time === t
                            ? 'bg-teal-500 text-white border-teal-500'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400 hover:text-teal-600'
                          }`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1">None of these work? Request a different time</label>
                <input type="text" name="requestedTime" value={form.requestedTime || ''} onChange={handleChange}
                  placeholder="e.g. Friday afternoon or weekday mornings"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-slate-100">
            <h3 className="font-bold text-slate-700 mb-1">What to expect</h3>
            <p className="text-slate-500 text-sm">Davy will call you at your scheduled time. Calls are 30 minutes and completely free. If the issue needs more time or an in-person visit, Davy will let you know -- no surprises.</p>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-teal-500 text-white py-3 rounded-lg font-bold hover:bg-teal-600 transition text-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Sending...' : 'Schedule My Free Call'}
          </button>

          <p className="text-center text-sm text-slate-400">
            Prefer to call directly? Reach Davy at (509) 230-7002
          </p>

        </form>
      </section>
    </div>
  )
}

export default PhoneSupport