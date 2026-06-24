import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { StepForm, Field, TextInput, TextArea, Chips } from '../components/StepForm'
import { BookingCalendar } from '../components/BookingCalendar'

function PhoneSupport() {
  // Step 1 — Contact info
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [channel, setChannel] = useState(['Phone call'])

  // Step 2 — The issue
  const [device, setDevice] = useState('')
  const [issue, setIssue] = useState('')

  // Step 3 — Scheduling
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [altTime, setAltTime] = useState('')

  // Availability — filtered to type: 'phone'
  const [availability, setAvailability] = useState([])
  const [availableTimes, setAvailableTimes] = useState([])

  useEffect(() => {
    const fetchAvailability = async () => {
      const { data, error } = await supabase
        .from('availability')
        .select('*')
        .eq('is_available', true)
        .eq('type', 'phone')
        .order('date', { ascending: true })
      if (!error && data) setAvailability(data)
    }
    fetchAvailability()
  }, [])

  const availableDates = [...new Set(availability.map((row) => row.date))]

  const handleDateChange = (d) => {
    setDate(d)
    setTime(null)
    const dateStr = d.toISOString().split('T')[0]
    const times = availability
      .filter((row) => row.date === dateStr)
      .map((row) => row.time)
    setAvailableTimes(times)
  }

  const handleSubmit = async () => {
    const payload = {
      name,
      phone,
      email,
      preferredContact: channel[0] ?? '',
      devices: device,
      description: issue,
      date: date ? date.toISOString().split('T')[0] : '',
      time: time ?? '',
      requestedTime: altTime,
    }

    const response = await fetch('https://tidal-tech-server.onrender.com/api/phone-support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      alert('Something went wrong. Please try again or call (509) 230-7002 directly.')
      throw new Error('Submission failed')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-coast px-6 py-16 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary mb-3">Free phone support</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-ink mb-4">Real help, right over the phone.</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          A free 30-minute call with Davy. We'll work through whatever you're stuck on, step by step.
        </p>
        <p className="mt-2 text-primary font-medium">No cost. No commitment. No confusing tech talk.</p>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <StepForm
          submitLabel="Schedule My Free Call"
          onSubmit={handleSubmit}
          steps={[
            {
              title: 'Who am I talking to?',
              subtitle: 'Just the basics so I know how to reach you.',
              content: (
                <>
                  <Field label="Full Name">
                    <TextInput
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Field>
                  <Field label="Phone Number">
                    <TextInput
                      type="tel"
                      placeholder="(310) 555-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </Field>
                  <Field label="Email Address">
                    <TextInput
                      type="email"
                      placeholder="jane@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Field>
                  <Field label="How would you prefer I reach you?">
                    <Chips
                      options={['Phone call', 'FaceTime', 'Zoom', 'Google Meet']}
                      value={channel}
                      onChange={setChannel}
                    />
                  </Field>
                </>
              ),
            },
            {
              title: "What's going on?",
              subtitle: 'Tell me as much or as little as you like. There are no wrong answers.',
              content: (
                <>
                  <Field label="What device are you having trouble with?">
                    <TextInput
                      placeholder="e.g. iPhone, Mac, WiFi router…"
                      value={device}
                      onChange={(e) => setDevice(e.target.value)}
                    />
                  </Field>
                  <Field label="What's happening?">
                    <TextArea
                      placeholder="Just describe it in your own words. I'll figure out the rest."
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                    />
                  </Field>
                </>
              ),
            },
            {
              title: 'When works for you?',
              subtitle: "Pick a day and time. I'll confirm within a few hours.",
              content: (
                <>
                  <BookingCalendar
                    value={date}
                    onChange={handleDateChange}
                    selectedTime={time}
                    onTimeChange={setTime}
                    availableDates={availableDates}
                    availableTimes={availableTimes}
                  />
                  <Field
                    label="None of these work? Suggest another time"
                    hint="Optional — I'll do my best to make it happen."
                  >
                    <TextInput
                      placeholder="e.g. Friday afternoon or weekday mornings"
                      value={altTime}
                      onChange={(e) => setAltTime(e.target.value)}
                    />
                  </Field>
                  <div className="rounded-xl border border-border bg-mist/60 p-4 text-sm text-muted-foreground">
                    <strong className="block font-medium text-foreground">What to expect</strong>
                    <p className="mt-1">I'll call you at your scheduled time. Calls are 30 minutes and completely free. If we need more time or an in-person visit, I'll let you know — no surprises.</p>
                  </div>
                </>
              ),
            },
          ]}
        />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Prefer to call directly? Reach Davy at{' '}
          <a href="tel:+15092307002" className="font-medium text-foreground hover:text-primary-deep">
            (509) 230-7002
          </a>
        </p>
      </section>
    </div>
  )
}

export default PhoneSupport