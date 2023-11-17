const express = require('express');
const bodyParser = require('body-parser');
const otpGenerator = require('otp-generator');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/generate-otp', (req, res) => {
    const { mobileNumber } = req.body;
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

    // In a real application, you would send the OTP to the user's mobile number.
    // Here, we're just rendering the OTP and passing the mobileNumber to the otp.html page.
    res.render(__dirname + '/otp.html', { mobileNumber, otp });
});

app.post('/verify-otp', (req, res) => {
    const { otp, mobileNumber } = req.body;

    // In a real application, you would verify the entered OTP with the generated OTP.
    // Here, we're just rendering a success page if the OTP matches.
    res.send(`OTP Verified Successfully for Mobile Number: ${mobileNumber}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
// ... (existing code)

app.post('/proceed-to-payment', (req, res) => {
    const { mobileNumber } = req.body;
    res.sendFile(__dirname + '/payment.html');
});
app.get('/terms', (req, res) => {
    const mobileNumber = req.query.mobileNumber;
    res.render(__dirname + '/terms.html', { mobileNumber });
});
