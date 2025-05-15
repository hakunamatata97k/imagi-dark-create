
# AI Image Generator

A MERN (MongoDB, Express, React, Node.js) application for generating images and logos using OpenAI's DALL-E API.

## Features

- Modern dark-themed UI with glassmorphism effects
- Image generation using OpenAI's DALL-E model
- Multiple image size options
- Download generated images
- MongoDB integration for storing generated images

## Setup Instructions

### Client (React + Vite)

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with:
```
VITE_API_URL=http://localhost:3001/api
```

3. Start the development server:
```bash
npm run dev
```

### Server (Node.js + Express + MongoDB)

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with:
```
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=3001
```

4. Start the server:
```bash
npm start
```

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB with Mongoose
- **API**: OpenAI DALL-E for image generation

## Environment Variables

### Client
- `VITE_API_URL`: API endpoint URL

### Server
- `MONGODB_URI`: MongoDB connection string
- `OPENAI_API_KEY`: Your OpenAI API key
- `PORT`: Server port (default: 3001)

## License

MIT
