import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <Link to="/">
        <img
          src="/logo-full.png"
          alt="Tidal Tech"
          className="h-25 w-auto -mb-10 -mt-10"
        />
      </Link>
      <div className="flex gap-6 items-center">
        <Link
          to="/"
          className="text-gray-500 hover:text-teal-600 font-medium transition"
        >
          Home
        </Link>
        <Link
          to="/booking"
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 font-medium transition"
        >
          Book Now
        </Link>
      </div>
    </nav>
  )
}

export default Navbar