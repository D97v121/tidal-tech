import { useState } from 'react'
import { StepForm, Field, TextInput, TextArea, Chips } from '../components/StepForm'

const DEVICES = [
  'iPhone', 'Android phone', 'iPad or tablet', 'Mac computer', 'PC computer', 'Chromebook',
  'Smart TV', 'Regular TV', 'Roku or Fire Stick', 'Apple TV box', 'Cable or satellite box',
  'Printer', 'External hard drive', 'Wireless keyboard or mouse', 'Alexa', 'Google Home',
  'Apple HomePod', 'WiFi router', 'Ring or Nest doorbell', 'Smart thermostat', 'Smart lights',
  'Apple Watch or Fitbit', 'Landline phone', 'Medical alert device', 'Bluetooth hearing aids',
  'Other', 'None of these',
]

const WATCHES = ['Netflix', 'Cable TV', 'Sports', 'News', 'Movies', 'YouTube', 'Hulu', 'Disney Plus', 'Apple TV', 'Other']

function Consult() {
  // Step 1 — About you
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [about, setAbout] = useState('')

  // Step 2 — Current technology
  const [devices, setDevices] = useState([])
  const [devicesOther, setDevicesOther] = useState('')
  const [comfort, setComfort] = useState([])
  const [biggestFrustration, setBiggestFrustration] = useState('')

  // Step 3 — Daily life
  const [watches, setWatches] = useState([])
  const [watchesOther, setWatchesOther] = useState('')
  const [listensToMusic, setListensToMusic] = useState([])
  const [playsGames, setPlaysGames] = useState([])
  const [healthTech, setHealthTech] = useState([])
  const [shopsOnline, setShopsOnline] = useState([])
  const [onlineBanking, setOnlineBanking] = useState([])
  const [homeSecurity, setHomeSecurity] = useState([])
  const [dataBackup, setDataBackup] = useState([])
  const [dataWorries, setDataWorries] = useState([])
  const [videoCalls, setVideoCalls] = useState([])

  // Step 4 — Goals
  const [wishList, setWishList] = useState('')
  const [confusions, setConfusions] = useState('')
  const [openToNewDevices, setOpenToNewDevices] = useState([])
  const [budget, setBudget] = useState([])
  const [anythingElse, setAnythingElse] = useState('')

  const handleSubmit = async () => {
    const payload = {
      name, email, phone, location, about,
      devices: devices.includes('Other') ? [...devices, devicesOther] : devices,
      comfortLevel: comfort[0] ?? '',
      biggestFrustration,
      watches: watches.includes('Other') ? [...watches, watchesOther] : watches,
      listensToMusic: listensToMusic[0] ?? '',
      playsGames: playsGames[0] ?? '',
      healthTech: healthTech[0] ?? '',
      shopsOnline: shopsOnline[0] ?? '',
      onlineBanking: onlineBanking[0] ?? '',
      homeSecurity: homeSecurity[0] ?? '',
      dataBackup: dataBackup[0] ?? '',
      dataWorries: dataWorries[0] ?? '',
      videoCalls: videoCalls[0] ?? '',
      wishList, confusions,
      openToNewDevices: openToNewDevices[0] ?? '',
      budget: budget[0] ?? '',
      anythingElse,
    }

    const response = await fetch('https://tidal-tech-server.onrender.com/api/consult', {
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
        <p className="text-sm font-medium uppercase tracking-widest text-primary mb-3">Free consultation</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-ink mb-4">Tell me about your life.</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          A friendly conversation, not a survey. I'll recommend exactly what fits — no more, no less.
        </p>
        <p className="mt-2 text-primary font-medium">No pressure.</p>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <StepForm
          submitLabel="Send to Davy"
          onSubmit={handleSubmit}
          steps={[
            {
              title: 'First, a little about you.',
              subtitle: 'So I know how to reach you and where you\'re based.',
              content: (
                <>
                  <Field label="Full Name">
                    <TextInput placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} required />
                  </Field>
                  <Field label="Email Address">
                    <TextInput type="email" placeholder="jane@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </Field>
                  <Field label="Phone Number">
                    <TextInput type="tel" placeholder="(310) 555-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </Field>
                  <Field label="Where are you located?">
                    <TextInput placeholder="Malibu, CA" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </Field>
                  <Field label="Tell me a little about yourself" hint="Hobbies, what a typical day looks like — anything that helps me understand your life.">
                    <TextArea
                      placeholder="I want to understand your life so I can recommend technology that actually fits."
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </Field>
                </>
              ),
            },
            {
              title: 'What technology do you have today?',
              subtitle: 'Tap everything that applies. Don\'t worry about being exact.',
              content: (
                <>
                  <Field label="Your current devices">
                    <Chips options={DEVICES} value={devices} onChange={setDevices} multi />
                  </Field>
                  {devices.includes('Other') && (
                    <Field label="What other devices do you have?">
                      <TextInput
                        placeholder="Please describe..."
                        value={devicesOther}
                        onChange={(e) => setDevicesOther(e.target.value)}
                      />
                    </Field>
                  )}
                  <Field label="How comfortable are you with technology?">
                    <Chips
                      options={['Not comfortable at all', 'A little comfortable', 'Pretty comfortable', 'Very comfortable']}
                      value={comfort}
                      onChange={setComfort}
                    />
                  </Field>
                  <Field label="What's your biggest frustration with your current technology?">
                    <TextArea
                      placeholder="Tell us what drives you crazy..."
                      value={biggestFrustration}
                      onChange={(e) => setBiggestFrustration(e.target.value)}
                    />
                  </Field>
                </>
              ),
            },
            {
              title: 'Your daily life.',
              subtitle: 'This helps me recommend things that actually fit how you live.',
              content: (
                <>
                  <Field label="What do you like to watch?">
                    <Chips options={WATCHES} value={watches} onChange={setWatches} multi />
                  </Field>
                  {watches.includes('Other') && (
                    <Field label="What else do you watch?">
                      <TextInput
                        placeholder="Please describe..."
                        value={watchesOther}
                        onChange={(e) => setWatchesOther(e.target.value)}
                      />
                    </Field>
                  )}
                  <Field label="Do you listen to music at home?">
                    <Chips options={['Yes', 'Sometimes', 'No', 'No but I would like to']} value={listensToMusic} onChange={setListensToMusic} />
                  </Field>
                  <Field label="Do you enjoy playing games on your phone, tablet, or computer?">
                    <Chips options={['Yes', 'Sometimes', 'No', 'No but I would like to']} value={playsGames} onChange={setPlaysGames} />
                  </Field>
                  <Field label="Do you use technology for health and wellness?" hint="Tracking steps, heart rate, telehealth, medication reminders, etc.">
                    <Chips options={['Yes', 'Sometimes', 'No', 'No but I would like to']} value={healthTech} onChange={setHealthTech} />
                  </Field>
                  <Field label="Do you shop online?">
                    <Chips options={['Yes regularly', 'Sometimes', 'No', 'No but I would like to']} value={shopsOnline} onChange={setShopsOnline} />
                  </Field>
                  <Field label="Do you do your banking or finances online?">
                    <Chips options={['Yes', 'Sometimes', 'No', 'No but I would like to']} value={onlineBanking} onChange={setOnlineBanking} />
                  </Field>
                  <Field label="Do you have home security cameras or a video doorbell?">
                    <Chips options={['Yes', 'No', 'No but I would like to']} value={homeSecurity} onChange={setHomeSecurity} />
                  </Field>
                  <Field label="Would you like your photos and files backed up so you never lose them?">
                    <Chips options={['Yes', 'I already have this set up', 'Not sure what that means', 'No']} value={dataBackup} onChange={setDataBackup} />
                  </Field>
                  <Field label="Are you worried about losing your photos or contacts if something happened to your device?">
                    <Chips options={['Yes, this worries me', 'A little bit', 'No I have it covered', 'I never thought about it']} value={dataWorries} onChange={setDataWorries} />
                  </Field>
                  <Field label="Do you video call friends or family?">
                    <Chips options={['Yes regularly', 'Sometimes', 'No', 'I would like to']} value={videoCalls} onChange={setVideoCalls} />
                  </Field>
                </>
              ),
            },
            {
              title: 'What would "fixed" look like?',
              subtitle: 'In your own words. There are no wrong answers.',
              content: (
                <>
                  <Field label="What do you wish your technology could do that it currently doesn't?">
                    <TextArea
                      placeholder="Dream big — there are no wrong answers here..."
                      value={wishList}
                      onChange={(e) => setWishList(e.target.value)}
                    />
                  </Field>
                  <Field label="Is there anything about your current technology that confuses or frustrates you?">
                    <TextArea
                      placeholder="Nothing is too small or silly to mention..."
                      value={confusions}
                      onChange={(e) => setConfusions(e.target.value)}
                    />
                  </Field>
                  <Field label="Are you open to buying new devices if they would make your life easier?">
                    <Chips
                      options={['Yes', 'Maybe', 'I would prefer not to', 'Depends on the cost']}
                      value={openToNewDevices}
                      onChange={setOpenToNewDevices}
                    />
                  </Field>
                  <Field label="Do you have a budget in mind?">
                    <Chips
                      options={['No budget in mind', 'Under $100', '$100 to $300', '$300 to $500', '$500 or more']}
                      value={budget}
                      onChange={setBudget}
                    />
                  </Field>
                  <Field label="Anything else you'd like me to know?" hint="Optional.">
                    <TextArea
                      placeholder="Anything at all..."
                      value={anythingElse}
                      onChange={(e) => setAnythingElse(e.target.value)}
                    />
                  </Field>
                  <div className="rounded-xl border border-border bg-mist/60 p-4 text-sm text-muted-foreground">
                    <strong className="block font-medium text-foreground">What happens next?</strong>
                    <p className="mt-1">Davy will review your answers and reach out within 24 hours with personalized recommendations — completely free with no obligation. Paid in-home services are available if you'd like help setting anything up after that.</p>
                  </div>
                </>
              ),
            },
          ]}
        />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Prefer to talk? Call or text Davy at{' '}
          <a href="tel:+15092307002" className="font-medium text-foreground hover:text-primary-deep">
            (509) 230-7002
          </a>
        </p>
      </section>
    </div>
  )
}

export default Consult