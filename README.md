# Shareef Construction API

A simple Node.js backend to handle contact form submissions for your construction website and send them to your Gmail inbox.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the project root (copy from `.env.example`) and fill in:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=maaz8897@gmail.com
SMTP_PASS=your_app_password_here
TO_EMAIL=maaz8897@gmail.com
ALLOWED_ORIGINS=https://s4adhax.github.io,https://s4adhax.github.io/Ansari-Creative-Design
```

### 3. Run Locally
```bash
npm run dev
```
Then open [http://localhost:8080](http://localhost:8080)

### 4. Test
Use Postman or curl:
```bash
curl -X POST http://localhost:8080/api/contact -H "Content-Type: application/json" -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"phone\":\"123\",\"message\":\"Hello\"}"
```

### 5. Deploy to Render
- Push this project to GitHub.
- Go to [Render.com](https://render.com) → New → Web Service.
- Connect your GitHub repo.
- Build Command: `npm install`
- Start Command: `npm start`
- Add Environment Variables from your `.env`.
- Deploy and get your public API URL (e.g. https://shareef-api.onrender.com)

### 6. Connect to Frontend
In your website JS, send form data to:
```js
fetch('https://YOUR-API-URL/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, phone, message })
})
```
