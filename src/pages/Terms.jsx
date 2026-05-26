import { Link } from 'react-router-dom'

function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-slate-50 to-blue-50 px-6 py-10 text-center">
        <h1 className="text-4xl font-bold text-slate-700 mb-2">Terms of Service</h1>
        <p className="text-slate-500">Tidal Tech -- Tech made simple, right at your door</p>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12 space-y-8 text-slate-600">

        <div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">1. Services</h2>
          <p>Tidal Tech provides in-home technology support services including but not limited to device setup, wifi troubleshooting, account recovery, virus removal, and general tech assistance. Services are performed by appointment only.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">2. Payment</h2>
          <p>Payment is due upon successful completion of service. Tidal Tech accepts cash and card. If the issue cannot be resolved, no payment is due. Pricing will be confirmed before work begins.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">3. Service Guarantee</h2>
          <p>If the same issue returns within 7 days of completed service, Tidal Tech will return to address it at no additional charge. This guarantee applies only to the specific issue serviced and does not cover new or unrelated problems.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">4. Cancellation</h2>
          <p>Appointments cancelled less than 24 hours before the scheduled service time are subject to a cancellation fee. Tidal Tech reserves the right to reschedule appointments due to unforeseen circumstances.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">5. Liability</h2>
          <p>Tidal Tech will take reasonable care when working with your devices and in your home. Tidal Tech is not responsible for pre-existing damage or defects, data loss unrelated to services performed, hardware failure, or issues caused by third party software. Clients are strongly encouraged to back up all data before service begins.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">6. Privacy</h2>
          <p>Personal information collected during booking is used solely to provide services. Client information is never sold or shared with third parties.</p>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-400">Questions? Contact us at davy@tidaltechco.com or (509) 230-7002</p>
        </div>

      </section>
    </div>
  )
}

export default Terms