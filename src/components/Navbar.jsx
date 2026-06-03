import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-3 py-1 flex justify-between items-center">
      <Link to="/">
        <img
          src="/logo-full.png"
          alt="Tidal Tech"
          className="h-20 w-auto"
        />
      </Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-gray-500 hover:text-teal-600 font-medium transition">
          Home
        </Link>
        <Link to="/booking" className="text-gray-500 hover:text-teal-600 font-medium transition">
          Book an in-house service
        </Link>
        <Link to="/consult" className="text-gray-500 hover:text-teal-600 font-medium transition">
          Free Consultation
        </Link>
        <Link to="/phone-support" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 font-medium transition">
          Free Phone Support
        </Link>
      </div>
    </nav>
  )
}

export default Navbar