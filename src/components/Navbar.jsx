import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/booking', label: 'Book an in-home service' },
  { to: '/consult', label: 'Free Consultation' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-background/85 backdrop-blur border-b border-border/60' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src="/logo-full.png" alt="Tidal Tech" className="h-16 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm transition-colors hover:text-foreground ${
                location.pathname === n.to ? 'text-foreground font-medium' : 'text-muted-foreground'
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/phone-support"
            className="rounded-full bg-gradient-tide px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-tide transition-transform hover:scale-[1.02]"
          >
            Free Phone Support
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="flex flex-col px-5 py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`py-3 text-base transition-colors hover:text-foreground ${
                  location.pathname === n.to ? 'text-foreground font-medium' : 'text-muted-foreground'
                }`}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/phone-support"
              className="mt-3 rounded-full bg-gradient-tide px-5 py-3 text-center text-sm font-medium text-primary-foreground shadow-tide"
            >
              Free Phone Support
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar