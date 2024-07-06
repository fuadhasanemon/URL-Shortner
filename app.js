const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let urlMap = new Map();
const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateShortUrl() {
    let shortUrl = '';
    for (let i = 0; i < 6; i++) {
        shortUrl += BASE62.charAt(Math.floor(Math.random() * BASE62.length));
    }
    return shortUrl;
}

function isValidUrl(url) {
    const regex = /^(http|https):\/\/[^ "]+$/;
    return regex.test(url);
}

app.post('/shorten', (req, res) => {
    const originalUrl = req.body.url;

    if (!isValidUrl(originalUrl)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    let shortUrl = generateShortUrl();
    while (urlMap.has(shortUrl)) {
        shortUrl = generateShortUrl(); // Ensure uniqueness
    }

    urlMap.set(shortUrl, originalUrl);

    res.status(201).json({ shortUrl });
});

// List all URLs endpoint
app.get('/list', (req, res) => {
    const urls = Array.from(urlMap.entries()).map(([shortUrl, originalUrl]) => ({ shortUrl, originalUrl }));
    res.status(200).json(urls);
});

app.get('/:shortUrl', (req, res) => {
    const originalUrl = urlMap.get(req.params.shortUrl);
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).json({ error: 'URL not found' });
    }
});

module.exports = app;
