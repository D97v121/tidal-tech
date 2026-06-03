const express = require('express')
const cors = require('cors')
const { Resend } = require('resend')
require('dotenv').config()

const app = express()
app.use(cors({
  origin: ['https://tidaltechco.com', 'https://www.tidaltechco.com', 'http://localhost:5173']
}))
app.use(express.json())

const resend = new Resend(process.env.RESEND_API_KEY)

app.post('/api/booking', async (req, res) => {
  const { name, phone, email, address, date, time, requestedTime, service, description } = req.body
  console.log('Booking received:', req.body)

  try {
    await resend.emails.send({
      from: 'davy@tidaltechco.com',
      to: process.env.EMAIL_USER,
      subject: `New Booking Request - ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f8fafa; border-radius: 12px; overflow: hidden;">
          <div style="background: #1d6e6a; padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">New Booking Request</h1>
            <p style="color: #9ecfcc; margin: 8px 0 0 0; font-size: 14px;">Tidal Tech</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td colspan="2" style="padding: 0 0 16px 0;">
                  <h2 style="color: #1d6e6a; margin: 0; font-size: 16px; border-bottom: 1px solid #e8f4f4; padding-bottom: 8px;">Client Information</h2>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #5aafa8; font-size: 13px; width: 140px;">Name</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Phone</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Email</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Address</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${address}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 24px 0 16px 0;">
                  <h2 style="color: #1d6e6a; margin: 0; font-size: 16px; border-bottom: 1px solid #e8f4f4; padding-bottom: 8px;">Appointment Details</h2>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Service</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${service}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Date</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${date || 'Not selected'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Time</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${time || 'Not selected'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Requested Time</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${requestedTime || 'None'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Details</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${description || 'None provided'}</td>
              </tr>
            </table>
          </div>
            <div style="background: #9ecfcc; padding: 16px 32px; text-align: center;">
                <p style="font-size: 12px; margin: 0; color: #1d6e6a;">
                    tidaltechco.com &nbsp;·&nbsp; davy@tidaltechco.com &nbsp;·&nbsp; (509) 230-7002
                </p>
            </div>
        </div>
      `,
    })

    await resend.emails.send({
      from: 'davy@tidaltechco.com',
      to: email,
      subject: 'Your Tidal Tech Appointment Request',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f8fafa; border-radius: 12px; overflow: hidden;">
          <div style="background: #1d6e6a; padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">Appointment Request Received</h1>
            <p style="color: #9ecfcc; margin: 8px 0 0 0; font-size: 14px;">Tidal Tech -- Tech made simple, right at your door</p>
          </div>
          <div style="padding: 32px;">
            <p style="color: #1a1a1a; font-size: 15px; line-height: 1.6;">Hi ${name},</p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">Thank you for reaching out to Tidal Tech. Your appointment request has been received and I will be in touch within 24 hours to confirm your appointment and go over pricing before the visit.</p>
            <div style="background: white; border-radius: 10px; border: 1px solid #e8f4f4; padding: 24px; margin: 24px 0;">
              <h2 style="color: #1d6e6a; margin: 0 0 16px 0; font-size: 16px; border-bottom: 1px solid #e8f4f4; padding-bottom: 8px;">Your Request Summary</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #5aafa8; font-size: 13px; width: 140px;">Service</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${service}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Date</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${date || 'To be confirmed'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Time</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${time || 'To be confirmed'}</td>
                </tr>
                ${requestedTime ? `
                <tr>
                  <td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Requested Time</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${requestedTime}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Address</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${address}</td>
                </tr>
              </table>
            </div>
            <div style="background: #e8f4f4; border-radius: 10px; padding: 16px 24px; margin: 0 0 24px 0;">
              <p style="color: #1d6e6a; font-size: 14px; margin: 0; font-weight: bold;">You pay only when it is fixed.</p>
              <p style="color: #3d9b95; font-size: 13px; margin: 4px 0 0 0;">No fix, no charge. Payment is collected on site by cash or card once the job is done.</p>
            </div>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">If you have any questions in the meantime, feel free to reply to this email or call or text me directly.</p>
            <p style="color: #1a1a1a; font-size: 14px; margin: 24px 0 0 0;">Talk soon,</p>
            <p style="color: #1d6e6a; font-size: 15px; font-weight: bold; margin: 4px 0 0 0;">Davy</p>
            <p style="color: #5aafa8; font-size: 13px; margin: 2px 0 0 0;">Tidal Tech</p>
          </div>
          <div style="background: #1d6e6a; padding: 16px 32px; text-align: center;">
            <p style="font-size: 12px; margin: 0;">
                <span style="color: #9ecfcc !important;">
                <a href="https://tidaltechco.com" style="color: #9ecfcc !important; text-decoration: none; font-size: 12px;">tidaltechco.com</a>
                </span>
                <span style="color: #9ecfcc;">&nbsp;·&nbsp;</span>
                <span style="color: #9ecfcc !important;">
                <a href="mailto:davy@tidaltechco.com" style="color: #9ecfcc !important; text-decoration: none; font-size: 12px;">davy@tidaltechco.com</a>
                </span>
                <span style="color: #9ecfcc;">&nbsp;·&nbsp;(509) 230-7002</span>
            </p>
        </div>
        </div>
      `,
    })

    res.status(200).json({ message: 'Booking received' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

app.post('/api/consult', async (req, res) => {
  const { name, email, phone, location, devices, devicesOther, comfortLevel, biggestFrustration, watches, watchesOther, reads, videoCalls, listensToMusic, shopsOnline, wishList, confusions, openToNewDevices, budget, anythingElse } = req.body

  try {
    await resend.emails.send({
      from: 'davy@tidaltechco.com',
      to: process.env.EMAIL_USER,
      subject: `New Consultation Request - ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f8fafa; border-radius: 12px; overflow: hidden;">
          <div style="background: #1d6e6a; padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">New Consultation Request</h1>
            <p style="color: #9ecfcc; margin: 8px 0 0 0; font-size: 14px;">Tidal Tech</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td colspan="2" style="padding: 0 0 16px 0;"><h2 style="color: #1d6e6a; margin: 0; font-size: 16px; border-bottom: 1px solid #e8f4f4; padding-bottom: 8px;">Contact Information</h2></td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px; width: 160px;">Name</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: bold;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${email}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Phone</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${phone || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Location</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${location || 'Not provided'}</td></tr>
              <tr><td colspan="2" style="padding: 24px 0 16px 0;"><h2 style="color: #1d6e6a; margin: 0; font-size: 16px; border-bottom: 1px solid #e8f4f4; padding-bottom: 8px;">Their Technology</h2></td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Devices owned</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${devices?.join(', ') || 'None selected'}</td></tr>
              ${devicesOther ? `<tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Other devices</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${devicesOther}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Comfort level</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${comfortLevel || 'Not selected'}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Biggest frustration</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${biggestFrustration || 'None provided'}</td></tr>
              <tr><td colspan="2" style="padding: 24px 0 16px 0;"><h2 style="color: #1d6e6a; margin: 0; font-size: 16px; border-bottom: 1px solid #e8f4f4; padding-bottom: 8px;">Their Daily Life</h2></td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Watches</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${watches?.join(', ') || 'None selected'}</td></tr>
              ${watchesOther ? `<tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Other watching</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${watchesOther}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Reads</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${reads?.join(', ') || 'None selected'}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Video calls</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${videoCalls || 'Not selected'}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Listens to music</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${listensToMusic || 'Not selected'}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Shops online</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${shopsOnline || 'Not selected'}</td></tr>
              <tr><td colspan="2" style="padding: 24px 0 16px 0;"><h2 style="color: #1d6e6a; margin: 0; font-size: 16px; border-bottom: 1px solid #e8f4f4; padding-bottom: 8px;">Their Goals</h2></td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Wish list</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${wishList || 'None provided'}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Confusions</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${confusions || 'None provided'}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Open to new devices</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${openToNewDevices || 'Not selected'}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Budget</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${budget || 'Not selected'}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Anything else</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${anythingElse || 'None provided'}</td></tr>
            </table>
          </div>
          <div style="background: #9ecfcc; padding: 16px 32px; text-align: center;">
            <p style="font-size: 12px; margin: 0; color: #1d6e6a;">tidaltechco.com &nbsp;·&nbsp; davy@tidaltechco.com &nbsp;·&nbsp; (509) 230-7002</p>
          </div>
        </div>
      `,
    })

    await resend.emails.send({
      from: 'davy@tidaltechco.com',
      to: email,
      subject: 'Your Tidal Tech Consultation Request',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f8fafa; border-radius: 12px; overflow: hidden;">
          <div style="background: #1d6e6a; padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">Consultation Request Received</h1>
            <p style="color: #9ecfcc; margin: 8px 0 0 0; font-size: 14px;">Tidal Tech -- Tech made simple, right at your door</p>
          </div>
          <div style="padding: 32px;">
            <p style="color: #1a1a1a; font-size: 15px; line-height: 1.6;">Hi ${name},</p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">Thank you for reaching out to Tidal Tech. I have received your consultation request and will review your answers carefully. I will be in touch within 24 hours with personalized recommendations just for you.</p>
            <div style="background: #e8f4f4; border-radius: 10px; padding: 16px 24px; margin: 24px 0;">
              <p style="color: #1d6e6a; font-size: 14px; margin: 0; font-weight: bold;">This consultation is completely free.</p>
              <p style="color: #3d9b95; font-size: 13px; margin: 4px 0 0 0;">No cost, no obligation. I am here to help you figure out what technology works best for your life.</p>
            </div>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">If you have any questions in the meantime, feel free to reply to this email or call or text me directly.</p>
            <p style="color: #1a1a1a; font-size: 14px; margin: 24px 0 0 0;">Talk soon,</p>
            <p style="color: #1d6e6a; font-size: 15px; font-weight: bold; margin: 4px 0 0 0;">Davy</p>
            <p style="color: #5aafa8; font-size: 13px; margin: 2px 0 0 0;">Tidal Tech</p>
          </div>
          <div style="background: #9ecfcc; padding: 16px 32px; text-align: center;">
            <p style="font-size: 12px; margin: 0; color: #1d6e6a;">tidaltechco.com &nbsp;·&nbsp; davy@tidaltechco.com &nbsp;·&nbsp; (509) 230-7002</p>
          </div>
        </div>
      `,
    })

    res.status(200).json({ message: 'Consultation received' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

app.post('/api/phone-support', async (req, res) => {
  const { name, phone, email, date, time, requestedTime, devices, description, preferredContact } = req.body

  try {
    await resend.emails.send({
      from: 'davy@tidaltechco.com',
      to: process.env.EMAIL_USER,
      subject: `New Phone Support Request - ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f8fafa; border-radius: 12px; overflow: hidden;">
          <div style="background: #1d6e6a; padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">New Phone Support Request</h1>
            <p style="color: #9ecfcc; margin: 8px 0 0 0; font-size: 14px;">Tidal Tech</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td colspan="2" style="padding: 0 0 16px 0;"><h2 style="color: #1d6e6a; margin: 0; font-size: 16px; border-bottom: 1px solid #e8f4f4; padding-bottom: 8px;">Client Information</h2></td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px; width: 160px;">Name</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: bold;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Phone</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${phone}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${email}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Preferred contact</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${preferredContact || 'Not selected'}</td></tr>
              <tr><td colspan="2" style="padding: 24px 0 16px 0;"><h2 style="color: #1d6e6a; margin: 0; font-size: 16px; border-bottom: 1px solid #e8f4f4; padding-bottom: 8px;">The Issue</h2></td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Device</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${devices || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Description</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${description || 'Not provided'}</td></tr>
              <tr><td colspan="2" style="padding: 24px 0 16px 0;"><h2 style="color: #1d6e6a; margin: 0; font-size: 16px; border-bottom: 1px solid #e8f4f4; padding-bottom: 8px;">Scheduled Call</h2></td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Date</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${date || 'Not selected'}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Time</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${time || 'Not selected'}</td></tr>
              <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Requested time</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${requestedTime || 'None'}</td></tr>
            </table>
          </div>
          <div style="background: #9ecfcc; padding: 16px 32px; text-align: center;">
            <p style="font-size: 12px; margin: 0; color: #1d6e6a;">tidaltechco.com &nbsp;·&nbsp; davy@tidaltechco.com &nbsp;·&nbsp; (509) 230-7002</p>
          </div>
        </div>
      `,
    })

    await resend.emails.send({
      from: 'davy@tidaltechco.com',
      to: email,
      subject: 'Your Free Tidal Tech Phone Support Call',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f8fafa; border-radius: 12px; overflow: hidden;">
          <div style="background: #1d6e6a; padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">Your Call is Scheduled</h1>
            <p style="color: #9ecfcc; margin: 8px 0 0 0; font-size: 14px;">Tidal Tech -- Making technology work for you</p>
          </div>
          <div style="padding: 32px;">
            <p style="color: #1a1a1a; font-size: 15px; line-height: 1.6;">Hi ${name},</p>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">Your free phone support request has been received. ${date ? 'Davy will call you at your scheduled time.' : 'Since you requested a custom time, Davy will reach out within 24 hours to confirm a time that works.'} There is nothing else you need to do.</p>
            <div style="background: white; border-radius: 10px; border: 1px solid #e8f4f4; padding: 24px; margin: 24px 0;">
              <h2 style="color: #1d6e6a; margin: 0 0 16px 0; font-size: 16px; border-bottom: 1px solid #e8f4f4; padding-bottom: 8px;">Your Call Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px; width: 140px;">Date</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${date || 'To be confirmed'}</td></tr>
                <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Time</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${time || 'To be confirmed'}</td></tr>
                ${requestedTime ? `<tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Requested time</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${requestedTime}</td></tr>` : ''}
                <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">How</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${preferredContact || 'Phone call'}</td></tr>
                <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Device</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${devices || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; color: #5aafa8; font-size: 13px;">Issue</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${description || 'Not provided'}</td></tr>
            </table>
            </div>
            <div style="background: #e8f4f4; border-radius: 10px; padding: 16px 24px; margin: 0 0 24px 0;">
              <p style="color: #1d6e6a; font-size: 14px; margin: 0; font-weight: bold;">This call is completely free.</p>
              <p style="color: #3d9b95; font-size: 13px; margin: 4px 0 0 0;">30 minutes, no cost, no commitment. If the issue needs more time or an in-person visit, Davy will let you know -- no surprises.</p>
            </div>
            <p style="color: #444; font-size: 14px; line-height: 1.8;">If you need to reschedule or have any questions, feel free to reply to this email or call or text directly.</p>
            <p style="color: #1a1a1a; font-size: 14px; margin: 24px 0 0 0;">Talk soon,</p>
            <p style="color: #1d6e6a; font-size: 15px; font-weight: bold; margin: 4px 0 0 0;">Davy</p>
            <p style="color: #5aafa8; font-size: 13px; margin: 2px 0 0 0;">Tidal Tech</p>
          </div>
          <div style="background: #9ecfcc; padding: 16px 32px; text-align: center;">
            <p style="font-size: 12px; margin: 0; color: #1d6e6a;">tidaltechco.com &nbsp;·&nbsp; davy@tidaltechco.com &nbsp;·&nbsp; (509) 230-7002</p>
          </div>
        </div>
      `,
    })

    res.status(200).json({ message: 'Phone support request received' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})