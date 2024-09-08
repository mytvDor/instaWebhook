const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = 'my'; // Replace with your verify token

// Middleware
app.use(bodyParser.json());

// Webhook verification
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === VERIFY_TOKEN) {
        console.log('Webhook verified.');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Webhook event handling
app.post('/webhook', (req, res) => {
    const data = req.body;
    console.log('Received webhook event:', JSON.stringify(data, null, 2));
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
