import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/coastal-cta.jpeg)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom right, color-mix(in oklab, var(--primary-deep) 92%, transparent), color-mix(in oklab, var(--primary) 80%, transparent), color-mix(in oklab, var(--primary-deep) 95%, transparent))' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center lg:py-32">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/80">
            Not sure where to start?
          </p>
          <h2 className="mt-4 font-serif text-4xl text-primary-foreground sm:text-5xl lg:text-6xl">
            Start with a free call.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-primary-foreground/85">
            No cost. No commitments. No pressure. Just an honest conversation about your technology.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/phone-support"
              className="rounded-full bg-background px-8 py-4 text-base font-medium text-primary-deep shadow-soft transition-transform hover:scale-[1.02]"
            >
              Schedule a Free Call
            </Link>
            <a
              href="tel:+15092307002"
              className="rounded-full border border-primary-foreground/40 px-8 py-4 text-base font-medium text-primary-foreground backdrop-blur transition-colors hover:bg-primary-foreground/10"
            >
              Call (509) 230-7002
            </a>
          </div>
        </div>
      </section>
  

      {/* Footer */}
      <footer className="border-t border-border bg-sand">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 text-center">
          <img src="/logo-full.png" alt="Tidal Tech" className="h-16 w-auto" />

          <p className="text-sm text-muted-foreground">
            Malibu, CA &nbsp;·&nbsp;{' '}
            <a
              href="mailto:davy@tidaltechco.com"
              className="hover:text-foreground transition-colors"
            >
              davy@tidaltechco.com
            </a>
            &nbsp;·&nbsp;{' '}
            <a
              href="tel:+15092307002"
              className="hover:text-foreground transition-colors"
            >
              (509) 230-7002
            </a>
          </p>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tidal Tech. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer

