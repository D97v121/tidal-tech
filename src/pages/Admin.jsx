import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const timeOptions = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM',
]

const PASSWORD = 'tidaltech2026'

function Admin() {
  const [authed, setAuthed] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [slots, setSlots] = useState([])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (authed) fetchSlots()
  }, [authed])

  const fetchSlots = async () => {
    const { data, error } = await supabase
      .from('availability')
      .select('*')
      .eq('is_available', true)
      .order('date', { ascending: true })

    if (!error) setSlots(data)
  }

  const handleLogin = () => {
    if (passwordInput === PASSWORD) {
      setAuthed(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  const handleAdd = async () => {
    if (!date || !time) return
    setLoading(true)
    const { error } = await supabase
      .from('availability')
      .insert([{ date, time, is_available: true }])

    if (!error) {
      setMessage('Slot added successfully')
      setDate('')
      setTime('')
      fetchSlots()
    } else {
      setMessage('Something went wrong')
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('availability')
      .delete()
      .eq('id', id)

    if (!error) fetchSlots()
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-slate-700 mb-6 text-center">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full border border-slate-200 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          {passwordError && <p className="text-red-400 text-sm mb-3">Incorrect password</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-teal-500 text-white py-2 rounded-lg font-bold hover:bg-teal-600 transition cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-slate-50 to-blue-50 px-6 py-10 text-center">
        <h1 className="text-4xl font-bold text-slate-700 mb-2">Availability Manager</h1>
        <p className="text-slate-500">Add or remove available appointment slots</p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12 space-y-8">

        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-4">
          <h2 className="text-lg font-bold text-slate-700">Add a New Slot</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Time</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
              >
                <option value="">Select a time</option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          {message && <p className="text-teal-600 text-sm font-semibold">{message}</p>}
          <button
            onClick={handleAdd}
            disabled={loading || !date || !time}
            className="w-full bg-teal-500 text-white py-2 rounded-lg font-bold hover:bg-teal-600 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Slot'}
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <h2 className="text-lg font-bold text-slate-700 mb-4">Current Available Slots</h2>
          {slots.length === 0 ? (
            <p className="text-slate-400 text-sm">No available slots yet. Add one above.</p>
          ) : (
            <div className="space-y-3">
              {slots.map((slot) => (
                <div key={slot.id} className="flex justify-between items-center bg-white rounded-lg px-4 py-3 border border-slate-100">
                  <div>
                    <p className="font-semibold text-slate-700">{slot.date}</p>
                    <p className="text-sm text-slate-500">{slot.time}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(slot.id)}
                    className="text-red-400 hover:text-red-600 text-sm font-semibold transition cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>
    </div>
  )
}

export default Admin