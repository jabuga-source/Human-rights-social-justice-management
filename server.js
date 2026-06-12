const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files out of this same directory
app.use(express.static(__dirname));

// Simulated authority registry
const authorityDirectory = {
    "United States": { name: "ACLU & DOJ Civil Rights Division", email: "us-rights-intake@example.org" },
    "United Kingdom": { name: "Equality and Human Rights Commission", email: "uk-complaints@example.org" },
    "Kenya": { name: "Kenya National Commission on Human Rights", email: "complaints@knchr.org" },
    "India": { name: "National Human Rights Commission India", email: "nhrc-report@example.org" },
    "Other": { name: "Amnesty International Global Desk", email: "global-cases@example.org" }
};

// CONFIGURATION REQUIRED: Replace these placeholders with your actual email credentials to send real messages
const SENDER_EMAIL = "your-email@gmail.com"; 
const SENDER_PASSWORD = "your-app-specific-password"; 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD
    }
});

// Serve frontend homepage route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Secure endpoint processing data structures
app.post('/api/submit-report', (req, res) => {
    const { email, phone, country, violationType, details } = req.body;
    const target = authorityDirectory[country] || authorityDirectory["Other"];

    const mailOptions = {
        from: SENDER_EMAIL,
        to: target.email,
        subject: `⚠️ URGENT: Human Rights Violation Report [${country}]`,
        text: `OFFICIAL HUMAN RIGHTS VIOLATION INTAKE RECORD\n---------------------------------------------\nTarget Authority: ${target.name}\nCountry: ${country}\nViolation Category: ${violationType}\n\nCONTACT DETAILS:\nEmail: ${email}\nPhone: ${phone}\n\nTESTIMONY DETAILS:\n"${details}"`
    };

    // If credentials are unchanged, run in demonstration mode so the app doesn't crash
    if (SENDER_EMAIL === "your-email@gmail.com") {
        console.log(`[DEMO MODE] Report intercept success. Would have emailed: ${target.email}`);
        return res.status(200).json({ success: true, authorityName: `${target.name} (Simulated Sandbox)` });
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Email delivery failed:", error);
            return res.status(500).json({ success: false });
        }
        res.status(200).json({ success: true, authorityName: target.name });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 JusticePulse Server running at http://localhost:${PORT}`);
    console.log(`=======================================================`);
});
