# 🌐 CORS Showcase

A comprehensive example demonstrating Cross-Origin Resource Sharing (CORS) with a TypeScript GraphQL backend and React frontend.

## 📚 What is CORS?

### The Same-Origin Policy

Web browsers implement a security feature called the **Same-Origin Policy** that restricts how a document or script loaded from one origin can interact with resources from another origin. Two URLs have the same origin if they have identical:

- **Protocol** (http vs https)
- **Domain** (example.com vs api.example.com)
- **Port** (port 80 vs port 3000)

For example:
- ✅ `http://example.com/page1` and `http://example.com/page2` → Same origin
- ❌ `http://example.com` and `http://api.example.com` → Different origins (subdomain)
- ❌ `http://example.com` and `https://example.com` → Different origins (protocol)
- ❌ `http://example.com:3000` and `http://example.com:4000` → Different origins (port)

### Why CORS Exists

**CORS (Cross-Origin Resource Sharing)** is a mechanism that uses HTTP headers to tell browsers to allow a web application running at one origin to access resources from a different origin. Without CORS, malicious websites could make unauthorized requests to other sites using your credentials.

### How CORS Works

When a browser makes a cross-origin request, it:

1. **Simple Requests**: For GET, HEAD, or POST with simple headers, the browser sends the request with an `Origin` header
   ```
   Origin: http://localhost:5173
   ```

2. **Preflight Requests**: For "complex" requests (like PUT, DELETE, or custom headers), the browser first sends an OPTIONS request to check if the actual request is safe
   ```
   OPTIONS /graphql
   Origin: http://localhost:5173
   Access-Control-Request-Method: POST
   ```

3. **Server Response**: The server responds with CORS headers indicating whether the request is allowed:
   ```
   Access-Control-Allow-Origin: http://localhost:5173
   Access-Control-Allow-Methods: GET, POST, OPTIONS
   Access-Control-Allow-Credentials: true
   ```

4. **Browser Decision**: The browser checks these headers and either allows or blocks the request

### CORS Headers Explained

- **Access-Control-Allow-Origin**: Specifies which origins can access the resource
  - `*` = any origin (not allowed with credentials)
  - `http://localhost:5173` = specific origin

- **Access-Control-Allow-Methods**: Specifies allowed HTTP methods (GET, POST, etc.)

- **Access-Control-Allow-Headers**: Specifies which headers can be used

- **Access-Control-Allow-Credentials**: Whether cookies/credentials can be included

- **Access-Control-Max-Age**: How long preflight responses can be cached

### Common CORS Errors

**"No 'Access-Control-Allow-Origin' header is present"**
- The server hasn't configured CORS for your origin
- Solution: Add your origin to the server's allowed origins

**"The CORS policy has blocked the request"**
- Your request includes credentials but server returns `Access-Control-Allow-Origin: *`
- Solution: Server must specify exact origin when allowing credentials

## 🏗️ Project Structure

This showcase consists of two applications:

```
├── backend/          # GraphQL Yoga server (TypeScript)
│   ├── src/
│   │   └── index.ts  # Server with CORS configuration
│   └── package.json
├── frontend/         # React + Relay application
│   ├── src/
│   │   ├── App.tsx   # Main component
│   │   ├── Messages.tsx  # GraphQL query component
│   │   └── RelayEnvironment.ts
│   └── package.json
└── pnpm-workspace.yaml
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)

### Installation

```bash
# Install all dependencies
pnpm install
```

### Running the Application

**Option 1: Run both services simultaneously**
```bash
pnpm dev
```

**Option 2: Run services separately**

Terminal 1 - Backend:
```bash
pnpm backend
```

Terminal 2 - Frontend:
```bash
pnpm frontend
```

### Access the Applications

- **Frontend**: http://localhost:5173
- **Backend GraphQL**: http://localhost:4000/graphql
- **GraphiQL IDE**: http://localhost:4000/graphql (in browser)

## 🧪 Testing CORS

### Test 1: Successful CORS Request

1. Open http://localhost:5173 in your browser
2. Click "Fetch Messages from Backend"
3. ✅ You should see messages loaded from the backend
4. Open DevTools → Network tab to see CORS headers

### Test 2: CORS Failure Simulation

To see what happens without CORS:

1. Stop the backend server
2. Edit `backend/src/index.ts` and comment out the `cors` configuration:
   ```typescript
   const yoga = createYoga({
     schema,
     // cors: {
     //   origin: ['http://localhost:5173'],
     //   credentials: true,
     // },
   })
   ```
3. Restart the backend
4. Try to fetch messages again
5. ❌ You'll see a CORS error in the browser console

### Test 3: Inspect CORS Headers

Open Browser DevTools → Network tab when making a request:

**Request Headers:**
```
Origin: http://localhost:5173
```

**Response Headers:**
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Credentials: true
```

## 🔒 CORS Configuration in This Project

### Backend (GraphQL Yoga)

Located in `backend/src/index.ts`:

```typescript
const yoga = createYoga({
  schema,
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  },
})
```

This configuration:
- ✅ Allows requests from `http://localhost:5173` (frontend dev server)
- ✅ Allows credentials (cookies, authorization headers)
- ✅ Allows GET, POST, OPTIONS methods
- ❌ Blocks requests from any other origin

### Frontend (React + Relay)

Located in `frontend/src/RelayEnvironment.ts`:

```typescript
const fetchFn: FetchFunction = async (request, variables) => {
  const resp = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  })
  return await resp.json()
}
```

The frontend makes cross-origin requests to the backend, which are allowed because:
1. Backend explicitly allows `http://localhost:5173` origin
2. Request uses allowed methods (POST)
3. Request uses standard headers

## 🎯 Key Learning Points

1. **Different Origins**: Frontend (port 5173) and Backend (port 4000) are different origins

2. **Browser Enforcement**: CORS is enforced by browsers, not by servers or other HTTP clients (like Postman)

3. **Security**: CORS protects users from malicious websites making unauthorized requests

4. **Development vs Production**: 
   - Development: Usually allow `localhost` origins
   - Production: Specify exact domains (e.g., `https://myapp.com`)

5. **Preflight Requests**: The browser automatically sends OPTIONS requests for certain cross-origin requests

## 📝 Common Use Cases

### Public API (No Credentials)
```typescript
cors: {
  origin: '*',  // Allow all origins
  credentials: false,
}
```

### Private API (With Authentication)
```typescript
cors: {
  origin: ['https://app.example.com'],  // Specific origin
  credentials: true,  // Allow cookies/auth headers
}
```

### Multiple Environments
```typescript
cors: {
  origin: [
    'http://localhost:3000',  // Local development
    'https://staging.example.com',  // Staging
    'https://example.com',  // Production
  ],
  credentials: true,
}
```

## 🔧 Troubleshooting

### CORS error in browser but works in Postman
- This is expected! Postman doesn't enforce CORS. Only browsers do.

### "Credentials included but origin is *"
- When using `credentials: true`, you cannot use `origin: '*'`
- Specify exact origins instead

### OPTIONS request fails
- Ensure your server handles OPTIONS method
- GraphQL Yoga handles this automatically

### Still getting CORS errors
1. Check browser DevTools → Network tab for actual error
2. Verify backend CORS configuration matches frontend origin exactly
3. Check for typos in URLs (http vs https, trailing slashes)
4. Clear browser cache

## 🌟 Next Steps

To deepen your understanding:

1. Try removing CORS configuration and observe the errors
2. Try accessing the API from a different origin (e.g., port 3001)
3. Experiment with different CORS configurations
4. Add authentication and see how credentials work with CORS
5. Deploy to production and configure CORS for your production domain

## 📚 Additional Resources

- [MDN Web Docs: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [GraphQL Yoga CORS Documentation](https://the-guild.dev/graphql/yoga-server/docs/features/cors)
- [CORS in Action - Video Tutorial](https://www.youtube.com/results?search_query=cors+tutorial)

## 🐛 GitHub Codespaces

This project is configured for GitHub Codespaces. When you open it in Codespaces:

1. Dependencies will be automatically installed
2. Both frontend and backend will start automatically
3. Ports will be forwarded so you can access the applications
4. CORS is pre-configured for the Codespaces environment

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! This is an educational project to help developers understand CORS.
