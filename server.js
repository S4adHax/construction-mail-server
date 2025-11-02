import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: function (origin, cb) {
    if (!origin) return cb(null, true);        // allow server-to-server/tools
    if (ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'), false);
  },
  methods: ['POST', 'OPTIONS']
}));
app.options('*', cors());


app.get('/', (req, res) => res.json({ ok: true, message: 'Shareef Construction API is running' }));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post('/api/contact', async (req, res) => {
  const { name = '', email = '', phone = '', message = '' } = req.body || {};
  if (!name.trim() || !email.trim()) {
    return res.status(400).json({ ok: false, error: 'Name and Email are required.' });
  }

  try {
    const info = await transporter.sendMail({
      from: `"Website Lead" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `Quote request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`,
      html: `<h3>New Quote Request</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Message:</strong><br>${message}</p>`
    });
    return res.json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error('Error sending mail:', err);
    return res.status(500).json({ ok: false, error: 'Failed to send email.' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API running on port ${port}`));
