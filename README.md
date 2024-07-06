# Short URL generator service

__Chosen Data Structure:__ `Map`

Purpose: The Map data structure in JavaScript is chosen to store the mappings between short URLs and their corresponding original URLs. This allows efficient key-value pair management where:

1. Key: Short URL (e.g., "abc123")
2. Value: Original URL (e.g., "https://www.example.com")


## Advantages:

**Efficiency:** 
- Map provides an average time complexity of O(1) for both insertion and lookup operations, making it suitable for quick access and updates.
- Built-in Methods: Provides built-in methods like set() for adding new mappings and get() for retrieving values based on keys.
- Iteration: Supports iteration over key-value pairs using methods like entries(), which is useful for listing all stored URLs (/list endpoint).

## Handling Short URL Uniqueness:

- **Generation:** Generating a short URL with (generateShortUrl() function), returns a random alphanumeric string of fixed length (6 characters in this case) is generated.

- **Checking for Uniqueness:** Before adding a new mapping to the Map, the system checks if the generated short URL already exists ``` (while (urlMap.has(shortUrl))) ```. If it does, a new short URL is generated until a unique one is found.

- **Ensuring Unique Keys:** This approach ensures that each original URL is associated with a unique short URL, preventing conflicts and ensuring that redirections work correctly.

## User manual for this project

#### Start the Server

```bash
node server.js
```
or
```bash
npm start
```

#### Run the Tests

```bash
npm test
```

## Testing with Postman
### Send data to the API endpoint:

+ __Add URLs:__

+ __Method:__ POST

+ __URL:__ http://localhost:3000/shorten

+ __Headers:__ Content-Type: application/json

+ __Body:__

```json
{
    "url": "https://www.example1.com"
}
```

### Retrieve the list of stored URLs:

+ __Method:__ GET

+ __URL:__ http://localhost:3000/list

+ __Expected Response:__ A JSON array with all stored URLs and their corresponding short URLs, for example:

```json
{
    [
       { "shortUrl": "abc123", "originalUrl": "https://www.example1.com" },
       { "shortUrl": "def456", "originalUrl": "https://www.example2.com" },
       { "shortUrl": "ghi789", "originalUrl": "https://www.example3.com" }
    ]
}
```