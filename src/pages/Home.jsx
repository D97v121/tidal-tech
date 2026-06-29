import { Link } from 'react-router-dom'
import { Phone, PhoneCall, CalendarCheck, Router, ShieldCheck, Ear, MessageSquareOff, ReceiptText, Clock, Star } from 'lucide-react'

const services = [
  {
    icon: CalendarCheck,
    title: 'Free Consultation',
    intro: 'Not sure what technology you need or how to use what you have? Tell us about your life and we\'ll figure out the best setup for you.',
    bullets: [
      'We take the time to understand exactly what you need',
      'We recommend exactly what fits your needs',
      'Plain language, no tech talk',
      'Done by phone or video call',
    ],
    cta: 'Schedule Free Consultation',
    to: '/consult',
  },
  {
    icon: PhoneCall,
    title: 'Free Over-the-Phone Support',
    intro: 'Having trouble with your technology right now? Schedule a free 30-minute call and we will help you fix it, step by step.',
    bullets: [
      'We can help with any technology you have',
      'Free 30-minute calls',
      'Phone, FaceTime, Zoom, or Google Meet',
      'No cost, no commitment',
    ],
    cta: 'Schedule a Free Call',
    to: '/phone-support',
    featured: true,
  },
  {
    icon: Router,
    title: 'In-Home Services',
    intro: 'Need hands-on help? We come to your home and take care of it for you. You pay only when it is fixed.',
    bullets: [
      'Phones, computers, printers, tablets, and more',
      'WiFi and internet troubleshooting',
      'TV and streaming setup',
      'Account and password recovery',
    ],
    cta: 'Book a Service',
    to: '/booking',
  },
]

const testimonials = [
  { quote: "Davy showed up on time, is very responsible, did the job seamlessly & quick, she knows what she's doing! Couldn't be happier! I highly recommend", who: "Diane, Old Agoura" },
  { quote: "This Woman is fabulous! She helped me solve my computer problem right away! She is patient and very knowledgeable. I would highly recommend her service. I will be a return customer for sure. She is awesome!", who: "Darcy, Beverly Hills" },
];

const pillars = [
  { icon: ShieldCheck, title: 'Honest recommendations', body: 'We have no hidden interests and will never recommend something you do not need.' },
  { icon: MessageSquareOff, title: 'No confusing tech talk', body: 'We explain everything in plain language you can actually understand.' },
  { icon: Ear, title: 'We listen first', body: 'We take the time to understand what you need before recommending anything.' },
  { icon: ReceiptText, title: 'No hidden fees', body: 'Our free services really are completely free. We want to help you!' },
]

function Home() {
  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-coast">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-16 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:pt-24 lg:pb-28">
          <div>
            <div className="reveal flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-primary-deep">
              <span className="inline-block h-px w-8 bg-primary-deep/40" />
              Serving Malibu &amp; the coast
            </div>
            <h1 className="reveal reveal-delay-1 mt-6 font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Your Technology, <em className="italic text-primary-deep">Your Way.</em>
            </h1>
            <p className="reveal reveal-delay-2 mt-6 max-w-xl text-lg text-muted-foreground">
              Making technology work for you. Patient, honest, in-person help with anything that has a screen, a plug, or a password.
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/phone-support"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-tide px-7 py-4 text-base font-medium text-primary-foreground shadow-tide transition-transform hover:scale-[1.02]"
              >
                <Phone className="h-4 w-4" /> Free Phone Support
              </Link>
              <Link
                to="/consult"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-deep/30 bg-background/70 px-7 py-4 text-base font-medium text-primary-deep backdrop-blur transition-colors hover:bg-background"
              >
                Free Consultation
              </Link>
            </div>
            <p className="reveal reveal-delay-4 mt-6 text-sm text-muted-foreground">
              Or call Davy directly:{' '}
              <a href="tel:+15092307002" className="font-medium text-foreground hover:text-primary-deep">
                (509) 230-7002
              </a>
            </p>
          </div>

          <div className="reveal reveal-delay-2 relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-tide-soft blur-2xl opacity-60" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-elevated">
              <img
                src="/coastal-office.jpg"
                alt="A quiet Malibu home office with ocean light"
                className="aspect-[3/4] h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-1 text-primary-deep" aria-label="5 out of 5 stars">
              {[0,1,2,3,4].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">What clients are saying</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.who} className="rounded-2xl border border-border bg-background p-6 shadow-soft">
                <blockquote className="font-serif text-lg leading-snug text-foreground">"{t.quote}"</blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">— {t.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-deep">How We Can Help</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Three ways to get the tech help you need.</h2>
          <p className="mt-5 text-muted-foreground">Start free. Pay only when you'd like hands-on work done in your home.</p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon
            const featured = s.featured
            return (
              <div
                key={s.title}
                className={`relative flex flex-col rounded-3xl p-8 transition-transform hover:-translate-y-1 ${
                  featured
                    ? 'bg-gradient-tide text-primary-foreground shadow-tide lg:scale-[1.03]'
                    : 'border border-border bg-card text-foreground shadow-soft'
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-card px-4 py-1 text-xs font-medium uppercase tracking-wider text-primary-deep shadow-soft">
                    Most Popular
                  </span>
                )}
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                  featured ? 'bg-primary-foreground/15' : 'bg-mist'
                }`}>
                  <Icon className={`h-5 w-5 ${featured ? 'text-primary-foreground' : 'text-primary-deep'}`} />
                </div>
                <h3 className={`mt-6 font-serif text-2xl ${featured ? 'text-primary-foreground' : ''}`}>{s.title}</h3>
                <p className={`mt-3 text-[15px] leading-relaxed ${featured ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                  {s.intro}
                </p>
                <ul className={`mt-5 space-y-2 text-sm ${featured ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className={`mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${featured ? 'bg-primary-foreground' : 'bg-primary'}`} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to={s.to}
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.02] ${
                    featured
                      ? 'bg-background text-primary-deep shadow-soft'
                      : 'bg-gradient-tide text-primary-foreground shadow-tide'
                  }`}
                >
                  {s.cta}
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* ABOUT DAVY */}
      <section className="bg-gradient-coast">
        <div className="mx-auto max-w-2xl px-6 pt-5 pb-24 lg:px-8 lg:pt-0 lg:pb-32">
          <div className="flex justify-center">
            <img src="/logo-icon.png" alt="Tidal Tech" className="h-32 w-auto wave-drift py-0" />
          </div>
          <p className="mt-4 text-center lg:-mt-2 text-sm uppercase tracking-[0.3em] text-primary-deep">About Davy</p>
          <h2 className="mt-4 text-center font-serif text-4xl sm:text-5xl">Hi, I'm Davy.</h2>
          <div className="mt-8 space-y-6 text-left text-lg leading-relaxed text-muted-foreground">
            <p>
              Growing up, I was always the one my grandparents called when something on their phone or computer stopped working. I loved helping them — not because it was easy, but because I could see how much it mattered. Technology that works changes people's lives.
            </p>
            <p>
              Now, as a Computer Science student at Pepperdine University, I've turned that same instinct into Tidal Tech. I work with people who want honest, patient help from someone who actually listens and makes their technology more simple, not less.
            </p>
            <p className="font-serif text-xl italic text-foreground">
              Every call and every visit is handled personally by me. That's a promise.
            </p>
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Malibu, CA &nbsp;·&nbsp;{' '}
              <a href="tel:+15092307002" className="font-medium text-foreground hover:text-primary-deep">
                (509) 230-7002
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* WHY TIDAL TECH */}
      <section className="bg-gradient-coast">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-primary-deep">Why Tidal Tech</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">A different kind of tech help.</h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {pillars.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="rounded-2xl border border-border bg-card p-8 shadow-soft transition-transform hover:-translate-y-1">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-tide-soft">
                    <Icon className="h-5 w-5 text-primary-deep" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl">{p.title}</h3>
                  <p className="mt-2 text-muted-foreground">{p.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AVAILABILITY CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-tide p-10 text-primary-foreground shadow-tide sm:p-14">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary-foreground/10 blur-2xl" aria-hidden="true" />
          <div className="relative grid gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs uppercase tracking-wider">
                <Clock className="h-3.5 w-3.5" /> Limited availability
              </div>
              <h2 className="mt-4 font-serif text-3xl text-primary-foreground sm:text-4xl">
                Davy personally handles every call and visit.
              </h2>
              <p className="mt-3 text-primary-foreground/85">
                Because of that, calendar space is limited each week. Book your spot now.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center rounded-full bg-background px-6 py-3.5 text-sm font-medium text-primary-deep shadow-soft transition-transform hover:scale-[1.02]"
              >
                Book an In-Home Visit
              </Link>
              <Link
                to="/phone-support"
                className="inline-flex items-center justify-center rounded-full border border-primary-foreground/40 px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home