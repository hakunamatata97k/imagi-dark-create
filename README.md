
# AI Image Generator

A MERN stack application for generating images using OpenAI's DALL-E model.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables:
   - Copy `server/.env.example` to `server/.env`
   - Add your OpenAI API key and MongoDB connection string

## Running the Application

Since we can't modify package.json directly, use the following commands:

### Start Everything (Frontend + Backend)
```
node start.js
```

### Start Frontend Only
```
node start.js frontend
```

### Start Backend Only
```
node start.js backend
```

### Alternative: Run Frontend Directly
```
npx vite
```

### Alternative: Run Backend Directly
```
node server/index.js
```

## Technologies Used

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- API: OpenAI DALL-E for image generation
