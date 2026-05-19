const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

app.post('/api/booking', async (req, res) => {
  const { name, phone, email, address, date, time, service, description } = req.body

  const mailToMe = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Booking Request - ${name}`,
    text: `
New booking request from Tidal Tech website:

Name: ${name}
Phone: ${phone}
Email: ${email}
Address: ${address}
Date: ${date}
Time: ${time}
Service: ${service}
Details: ${description || 'None provided'}
    `,
  }

  const mailToClient = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Tidal Tech Appointment Request',
    text: `
Hi ${name},

Thanks for reaching out to Tidal Tech. Your appointment request has been received.

Here is what you submitted:
Service: ${service}
Date: ${date}
Time: ${time}
Address: ${address}

I will reach out within 24 hours to confirm your appointment and go over pricing before the visit.

Remember -- you pay only when its fixed.

Davy
Tidal Tech
davy.renee11@gmail.com
    `,
  }

  try {
    await transporter.sendMail(mailToMe)
    await transporter.sendMail(mailToClient)
    res.status(200).json({ message: 'Booking received' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})