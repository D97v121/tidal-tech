import { useState } from 'react'

function Consult() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    devices: [],
    comfortLevel: '',
    biggestFrustration: '',
    watches: [],
    reads: [],
    videoCalls: '',
    listensToMusic: '',
    shopsOnline: '',
    wishList: '',
    confusions: '',
    openToNewDevices: '',
    budget: '',
    anythingElse: '',
    devicesOther: '',
    watchesOther: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckbox = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      const response = await fetch('https://tidal-tech-server.onrender.com/api/consult', {
      /* const response = await fetch('http://localhost:3001/api/consult', { */
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  const CheckboxGroup = ({ field, options }) => (
  <div className="space-y-3">
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => handleCheckbox(field, option)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition cursor-pointer
            ${form[field].includes(option)
              ? 'bg-teal-500 text-white border-teal-500'
              : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400 hover:text-teal-600'
            }`}
        >
          {option}
        </button>
      ))}
    </div>
    {form[field].includes('Other') && (
      <input
        type="text"
        name={`${field}Other`}
        value={form[`${field}Other`] || ''}
        onChange={handleChange}
        placeholder="Please describe..."
        className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-sm"
      />
    )}
  </div>
)

  const RadioGroup = ({ field, options }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setForm((prev) => ({ ...prev, [field]: option }))}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition cursor-pointer
            ${form[field] === option
              ? 'bg-teal-500 text-white border-teal-500'
              : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400 hover:text-teal-600'
            }`}
        >
          {option}
        </button>
      ))}
    </div>
  )

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-slate-700 mb-4">Thank You!</h2>
          <p className="text-slate-500 mb-2">Thanks {form.name}, your consultation request has been received.</p>
          <p className="text-slate-500 mb-6">Davy will review your answers and reach out within 24 hours with personalized recommendations.</p>
          <p className="text-sm text-slate-400">Questions? Email davy@tidaltechco.com</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      <section className="bg-gradient-to-b from-slate-50 to-blue-50 px-6 py-10 text-center">
        <h1 className="text-5xl font-bold mb-4 text-slate-700">Free Tech Consultation</h1>
        <p className="text-xl text-slate-500 mb-2">Tell us about your life and your technology.</p>
        <p className="text-lg text-teal-500 font-semibold">We will recommend exactly what fits your needs. No more, no less.</p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-6">
            <h2 className="text-lg font-bold text-slate-700">About You</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Jane Smith"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="jane@email.com"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="(310) 555-0000"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Where are you located?</label>
              <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Malibu, CA"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>
            <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Tell us a little about yourself</label>
            <textarea name="aboutYou" value={form.aboutYou || ''} onChange={handleChange}
                placeholder="hobbies, interests, what a typical day looks like for you. We want to understand your life so we can recommend technology that actually fits."
                rows={4} className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-6">
            <h2 className="text-lg font-bold text-slate-700">Your Current Technology</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">What technology do you currently own? Select all that apply.</label>
              <CheckboxGroup field="devices" options={[
                'iPhone',
                'Android phone',
                'iPad or tablet',
                'Mac computer',
                'PC computer',
                'Chromebook',
                'Smart TV',
                'Regular TV',
                'Roku or Fire Stick',
                'Apple TV box',
                'Cable or satellite box',
                'Printer',
                'External hard drive',
                'Wireless keyboard or mouse',
                'Alexa',
                'Google Home',
                'Apple HomePod',
                'WiFi router',
                'Ring or Nest doorbell',
                'Smart thermostat',
                'Smart lights',
                'Apple Watch or Fitbit',
                'Landline phone',
                'Medical alert device',
                'Bluetooth hearing aids',
                'Other',
                'None of these',
                ]} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">How comfortable are you with technology?</label>
              <RadioGroup field="comfortLevel" options={['Not comfortable at all', 'A little comfortable', 'Pretty comfortable']} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">What is your biggest frustration with your current technology?</label>
              <textarea name="biggestFrustration" value={form.biggestFrustration} onChange={handleChange}
                placeholder="Tell us what drives you crazy..."
                rows={3} className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-6">
            <h2 className="text-lg font-bold text-slate-700">Your Daily Life</h2>
             <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">What do you like to watch? Select all that apply.</label>
              <CheckboxGroup field="watches" options={['Netflix', 'Cable TV', 'Sports', 'News', 'Movies', 'YouTube', 'Hulu', 'Disney Plus', 'Apple TV', 'Other']} />
            </div>

            <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Do you listen to music at home?</label>
            <RadioGroup field="listensToMusic" options={['Yes', 'Sometimes', 'No', 'No but I would like to']} />
            </div>

            <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Do you enjoy playing games on your phone, tablet, or computer? (puzzles, crosswords, card games, etc.)</label>
            <RadioGroup field="playsGames" options={['Yes', 'Sometimes', 'No', 'No but I would like to']} />
            </div>

            <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Do you use technology for health and wellness? (tracking steps, monitoring heart rate, telehealth appointments, medication reminders, etc.)</label>
            <RadioGroup field="healthTech" options={['Yes', 'Sometimes', 'No', 'No but I would like to']} />
            </div>

            <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Do you shop online?</label>
            <RadioGroup field="shopsOnline" options={['Yes regularly', 'Sometimes', 'No', 'No but I would like to']} />
            </div>

            <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Do you do your banking or finances online?</label>
            <RadioGroup field="onlineBanking" options={['Yes', 'Sometimes', 'No', 'No but I would like to']} />
            </div>

            <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Do you have home security cameras or a video doorbell?</label>
            <RadioGroup field="homeSecurity" options={['Yes', 'No', 'No but I would like to']} />
            </div>

            <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Would you like your photos and important files backed up so you never lose them?</label>
            <RadioGroup field="dataBackup" options={['Yes', 'I already have this set up', 'Not sure what that means', 'No']} />
            </div>

            <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Do you use a digital calendar or reminders on your phone or computer?</label>
            <RadioGroup field="digitalCalendar" options={['Yes', 'Sometimes', 'No', 'No but I would like to']} />
            </div>

            <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Are you worried about losing your photos, contacts, or important files if something happened to your device?</label>
            <RadioGroup field="dataWorries" options={['Yes, this worries me', 'A little bit', 'No I have it covered', 'I never thought about it']} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Do you video call friends or family?</label>
              <RadioGroup field="videoCalls" options={['Yes regularly', 'Sometimes', 'No', 'I would like to']} />
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-6">
            <h2 className="text-lg font-bold text-slate-700">Your Goals</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">What do you wish your technology could do that it currently does not?</label>
              <textarea name="wishList" value={form.wishList} onChange={handleChange}
                placeholder="Dream big -- there are no wrong answers here..."
                rows={3} className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Is there anything about your current technology that confuses or frustrates you?</label>
              <textarea name="confusions" value={form.confusions} onChange={handleChange}
                placeholder="Nothing is too small or silly to mention..."
                rows={3} className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Are you open to buying new devices if they would make your life easier?</label>
              <RadioGroup field="openToNewDevices" options={['Yes', 'Maybe', 'I would prefer not to', 'Depends on the cost']} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Do you have a budget in mind?</label>
              <RadioGroup field="budget" options={['No budget in mind', 'Under $100', '$100 to $300', '$300 to $500', '$500 or more']} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Is there anything else you would like me to know?</label>
              <textarea name="anythingElse" value={form.anythingElse} onChange={handleChange}
                placeholder="Anything at all..."
                rows={3} className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-slate-100">
            <h3 className="font-bold text-slate-700 mb-1">What happens next?</h3>
            <p className="text-slate-500 text-sm">Davy will review your answers and reach out within 24 hours with personalized recommendations -- completely free and with no obligation. If you would like help setting anything up after that, paid in-home services are available.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-white py-3 rounded-lg font-bold hover:bg-teal-600 transition text-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Submit Consultation Request'}
          </button>

          <p className="text-center text-sm text-slate-400">
            Prefer to talk by phone? Call or text Davy at (509) 230-7002
          </p>

        </form>
      </section>
    </div>
  )
}

export default Consult