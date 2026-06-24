import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { StepForm, Field, TextInput, TextArea } from '../components/StepForm'
import { BookingCalendar } from '../components/BookingCalendar'

const SERVICES = [
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
  // Step 1 — Contact info
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  // Step 2 — Scheduling
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [altTime, setAltTime] = useState('')

  // Step 3 — Job details
  const [service, setService] = useState('')
  const [details, setDetails] = useState('')
  const [agree, setAgree] = useState(false)

  // Availability
  const [availability, setAvailability] = useState([])
  const [availableTimes, setAvailableTimes] = useState([])

  useEffect(() => {
    const fetchAvailability = async () => {
      const { data, error } = await supabase
        .from('availability')
        .select('*')
        .eq('is_available', true)
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
    if (!agree) {
      alert('Please agree to the service terms before submitting.')
      throw new Error('Must agree to terms')
    }

    const payload = {
      name,
      phone,
      email,
      address,
      date: date ? date.toISOString().split('T')[0] : '',
      time: time ?? '',
      requestedTime: altTime,
      service,
      description: details,
      agreed: agree,
    }

    const response = await fetch('https://tidal-tech-server.onrender.com/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      alert('Something went wrong. Please try again or email davy@tidaltechco.com directly.')
      throw new Error('Submission failed')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-coast px-6 py-16 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary mb-3">Book an appointment</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-ink mb-4">Book an in-home visit.</h1>
        <p className="text-lg text-muted-foreground">Fill out the form below and Davy will confirm within a few hours.</p>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <StepForm
          submitLabel="Request Appointment"
          onSubmit={handleSubmit}
          steps={[
            {
              title: 'Your information',
              subtitle: 'Where I should reach you and visit.',
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
                  <Field label="Address">
                    <TextInput
                      placeholder="123 Pacific Coast Hwy, Malibu, CA"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </Field>
                </>
              ),
            },
            {
              title: 'Pick a date and time',
              subtitle: 'Highlighted dates have availability. I\'ll confirm your slot within a few hours.',
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
                  <Field label="None of these work? Suggest another time" hint="Optional.">
                    <TextInput
                      placeholder="e.g. Friday afternoon or weekday mornings"
                      value={altTime}
                      onChange={(e) => setAltTime(e.target.value)}
                    />
                  </Field>
                </>
              ),
            },
            {
              title: 'Tell me about the job',
              subtitle: 'A rough idea is fine — I\'ll ask the rest when I call to confirm.',
              content: (
                <>
                  <Field label="Service needed">
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      required
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="">Select a service…</option>
                      {SERVICES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Additional details" hint="Optional.">
                    <TextArea
                      placeholder="Anything that would help me know before the visit."
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                    />
                  </Field>
                  <div className="rounded-xl border border-primary/20 bg-gradient-tide-soft p-4 text-sm">
                    <strong className="block font-medium text-foreground">How payment works</strong>
                    <p className="mt-1 text-muted-foreground">
                      You don't pay anything until your issue is resolved. Once the job is done,
                      payment is collected on site by cash or card. I'll confirm pricing before the visit.
                    </p>
                  </div>
                  <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border accent-primary"
                    />
                    <span>
                      I understand payment is due upon completion of service, and that Tidal Tech
                      is not responsible for pre-existing damage or data loss. I agree to the{' '}
                      <a href="/terms" className="text-primary underline hover:text-primary-deep">
                        service terms
                      </a>.
                    </span>
                  </label>
                </>
              ),
            },
          ]}
        />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Prefer to call or email? Reach Davy at{' '}
          <a href="mailto:davy@tidaltechco.com" className="font-medium text-foreground hover:text-primary-deep">
            davy@tidaltechco.com
          </a>{' '}
          or{' '}
          <a href="tel:+15092307002" className="font-medium text-foreground hover:text-primary-deep">
            (509) 230-7002
          </a>
        </p>
      </section>
    </div>
  )
}

export default Booking