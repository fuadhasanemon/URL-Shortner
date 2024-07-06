const request = require('supertest');
const app = require('../app');

jest.setTimeout(10000); // Set timeout to 10 seconds for all tests

describe('URL Shortener Service', () => {
    it('should shorten a valid URL', async () => {
        const response = await request(app)
            .post('/shorten')
            .send({ url: 'https://www.example.com' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('shortUrl');
        expect(response.body.shortUrl).toHaveLength(6);
    });

    it('should return an error for invalid URL', async () => {
        const response = await request(app)
            .post('/shorten')
            .send({ url: 'invalid-url' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid URL');
    });

    it('should redirect to the original URL', async () => {
        const shortUrlResponse = await request(app)
            .post('/shorten')
            .send({ url: 'https://www.example.com' });

        const shortUrl = shortUrlResponse.body.shortUrl;

        const response = await request(app).get(`/${shortUrl}`);
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('https://www.example.com');
    });

    it('should return 404 for non-existent short URL', async () => {
        const response = await request(app).get('/nonexistent');
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error', 'URL not found');
    });

    it('should list all stored URLs', async () => {
        const response = await request(app).get('/list');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
