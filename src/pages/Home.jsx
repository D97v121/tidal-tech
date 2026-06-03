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
        <h1 className="text-5xl font-bold mb-4 text-slate-700">Your Technology, Your Way</h1>
        <p className="text-lg mb-8 text-slate-500">Making technology work for you</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/phone-support" className="bg-teal-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-600 transition text-lg">
            Free Phone Support
          </Link>
          <Link to="/consult" className="border-2 border-teal-500 text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-teal-50 transition text-lg">
            Free Consultation
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pt-10 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-700 mb-4">How We Can Help</h2>
        <p className="text-center text-slate-500 mb-12">Three ways to get the tech help you need.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 flex flex-col">
            <h3 className="text-xl font-bold text-slate-700 mb-3">Free Consultation</h3>
            <p className="text-slate-500 mb-4 text-sm flex-grow">Not sure what technology you need or how to use what you have? Tell us about your life and we'll figure out the best setup for you.</p>
            <ul className="text-slate-400 text-sm space-y-2 mb-6">
              <li>We take the time to understand exactly what you need</li>
              <li>We recommend exactly what fits your needs</li>
              <li>Plain language, no tech talk</li>
              <li>Done by phone or video call</li>
            </ul>
            <Link to="/consult" className="bg-teal-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-600 transition text-center">
              Schedule Free Consultation
            </Link>
          </div>

          <div className="bg-teal-500 rounded-xl p-8 text-white flex flex-col shadow-lg scale-105">
            <h3 className="text-xl font-bold mb-3">Free Over-the-Phone Support</h3>
            <p className="text-teal-100 mb-4 text-sm flex-grow">Having trouble with your technology right now? Schedule a free 30 minute call and we will help you fix it, step by step.</p>
            <ul className="text-teal-100 text-sm space-y-2 mb-6">
              <li>We can help with any technology you have</li>
              <li>Free 30 minute calls</li>
              <li>Phone, FaceTime, Zoom, or Google Meet</li>
              <li>We explain everything as we go</li>
              <li>No cost, no commitment</li>
            </ul>
            <Link to="/phone-support" className="bg-white text-teal-600 px-6 py-2 rounded-lg font-bold hover:bg-teal-50 transition text-center">
              Schedule a Free Call
            </Link>
          </div>

          <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 flex flex-col">
            <h3 className="text-xl font-bold text-slate-700 mb-3">In-Home Services</h3>
            <p className="text-slate-500 mb-4 text-sm flex-grow">Need hands-on help? We come to your home and take care of it for you. You pay only when it is fixed.</p>
            <ul className="text-slate-400 text-sm space-y-2 mb-6">
              <li>Phones, computers, printers, tablets, and more</li>
              <li>WiFi and internet troubleshooting</li>
              <li>TV and streaming setup</li>
              <li>Account and password recovery</li>
            </ul>
            <Link to="/booking" className="bg-teal-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-600 transition text-center">
              Book a Service
            </Link>
          </div>

        </div>
      </section>

      <section className="bg-blue-50 px-6 pt-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-700 mb-6">Why Tidal Tech</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              { title: 'Honest recommendations', desc: 'We have no hidden interests and will never recommend something you do not need.' },
              { title: 'No confusing tech talk', desc: 'We explain everything in plain language you can actually understand.' },
              { title: 'We listen first', desc: 'We take the time to understand what you need before recommending anything.' },
              { title: 'No hidden fees', desc: 'Our free services really are completely free. We want to help you!' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-700 mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 text-center px-6 py-16">
        <h2 className="text-3xl font-bold mb-4 text-slate-700">Not sure where to start?</h2>
        <p className="text-slate-500 mb-8 text-lg">Start with a free call. No cost, no commitments, no pressure.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/phone-support" className="bg-teal-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-600 transition text-lg">
            Schedule a Free Call
          </Link>
          <a href="tel:5092307002" className="border-2 border-teal-500 text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-teal-50 transition text-lg">
            Call (509) 230-7002
          </a>
        </div>
      </section>

    </div>
  )
}

export default Home