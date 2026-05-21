import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-white">

      <section className="bg-gradient-to-b from-slate-50 to-blue-50 px-6 pt-4 pb-10 text-center">
        <div className="flex justify-center mb-2">
          <img
            src="/logo-icon.png"
            alt="Tidal Tech"
            className="h-64 w-auto -mb-20 -mt-20"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-slate-700">Tech Help That Comes to You</h1>
        <p className="text-xl mb-2 text-slate-500">Serving Malibu and surrounding areas</p>
        <p className="text-2xl font-semibold mb-8 text-teal-500">You pay only when it's fixed.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/booking" className="bg-teal-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-600 transition text-lg">
            Book an Appointment
          </Link>
          <a href="tel:5092307002" className="border-2 border-teal-500 text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-teal-50 transition text-lg">
            Call Us
          </a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pt-10 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-700 mb-12">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'WiFi and Networking', desc: 'Router setup, WiFi troubleshooting, and connectivity issues resolved fast.' },
            { title: 'Device Setup', desc: 'New iPhone, Mac, PC, or smart TV? We get everything configured and ready to go.' },
            { title: 'Account Recovery', desc: 'Locked out of your device or account? We get you back in.' },
            { title: 'Virus Removal', desc: 'We detect and remove malware keeping your devices safe and fast.' },
            { title: 'Smart Home', desc: 'Setup and troubleshooting for smart speakers, TVs, and home devices.' },
            { title: 'General Tech Help', desc: 'Not sure what you need? We figure it out together.' },
          ].map((service) => (
            <div key={service.title} className="bg-slate-50 rounded-xl p-6 shadow-sm hover:shadow-md transition border border-slate-100">
              <h3 className="text-lg font-bold text-teal-600 mb-2">{service.title}</h3>
              <p className="text-slate-500 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 px-6 pt-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-700 mb-6">Why Tidal Tech</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              { title: 'We come to your home', desc: 'No driving or waiting in line.' },
              { title: 'Friendly and patient', desc: 'We explain everything clearly' },
              { title: 'You pay only when it is fixed', desc: 'No fix, no charge' },
              { title: 'Local and Trustworth', desc: 'Pepperdine computer science student' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-700 mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* 
      <section className="max-w-4xl mx-auto px-6 pt-10 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-700 mb-12">What People Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: 'Susan M.', location: 'Malibu, CA', review: 'Davy was incredibly patient and fixed my wifi in under 30 minutes. Will absolutely call again.' },
            { name: 'Robert K.', location: 'Malibu, CA', review: 'Set up my new iPhone and transferred everything from my old one. Could not have been easier.' },
          ].map((review) => (
            <div key={review.name} className="bg-slate-50 rounded-xl p-6 shadow-sm border border-slate-100">
              <p className="text-slate-500 italic mb-4">{review.review}</p>
              <p className="font-bold text-slate-700">{review.name}</p>
              <p className="text-sm text-slate-400">{review.location}</p>
            </div>
          ))}
        </div>
      </section>
      add this to the section below in className: from-blue-50 to-slate-100
      */} 
      <section className="bg-gradient-to-b text-center px-6 py-20">
        <h2 className="text-3xl font-bold mb-4 text-slate-700">Ready to get your tech working?</h2>
        <p className="text-slate-500 mb-8 text-lg">Book online or give us a call. We will take it from there.</p>
        <Link to="/booking" className="bg-teal-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-600 transition text-lg">
          Book an Appointment
        </Link>
      </section>

    </div>
  )
}

export default Home