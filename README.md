# Tripma — AI Trip Planner 🌍

An intelligent trip planner powered by Google Gemini AI and RAG (Retrieval Augmented Generation). Enter your budget, location, interests and days — get a detailed day-wise itinerary instantly.

---

## 🚀 Live Demo
> Coming soon

---

## ✨ Features

- 🤖 **AI Generated Itineraries** — Day-wise trip plans powered by Google Gemini
- 🔍 **Semantic Search** — Vector search using Vectra finds places matching your interest (search "greenery" and find nature spots)
- 💰 **Budget Filtering** — Only shows places within your budget
- 📍 **Location Based** — Filter places by city
- 🎯 **Interest Based** — Search by type (beach, temple, nature, waterfall etc)
- 🖼️ **Real Place Images** — Fetched live from Pexels API
- ⚠️ **Error Handling** — Clean UI messages for API errors

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- React Icons

### Backend
- Node.js
- Express.js
- Google Gemini API (`gemini-2.5-flash`)
- Vectra (local vector database)
- Gemini Embedding API

### APIs
- Google Gemini API — AI itinerary generation
- Pexels API — Place images

---

## 🧠 How It Works (RAG Architecture)

```
User Input (location, budget, days, interest)
        ↓
Query Embedding → convert user interest to vector
        ↓
Vectra Vector Search → find semantically similar places
        ↓
Hard Filter → location + budget match
        ↓
Gemini AI → generate detailed day-wise itinerary
        ↓
Pexels API → fetch real images for each place
        ↓
Response to User
```

This is a proper RAG (Retrieval Augmented Generation) pipeline:
- **Retrieval** — Vectra finds relevant places using vector similarity
- **Augmented** — Retrieved places are added to the prompt as context
- **Generation** — Gemini generates the itinerary from that context

---

## 📁 Project Structure

```
tripma/
├── trip-frontend/          # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Main search page
│   │   │   └── TripDetails.jsx # Trip detail page
│   │   └── main.jsx
│   └── package.json
│
├── trip-backend/           # Node.js backend
│   ├── controllers/
│   │   └── tripController.js   # Main logic
│   ├── vector/
│   │   ├── seed.js             # Load places into Vectra
│   │   └── search.js           # Vector search
│   ├── utils/
│   │   └── embedding.js        # Embedding generation
│   ├── places.json             # Places data
│   └── server.js
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- Google Gemini API Key → [Get here](https://aistudio.google.com)
- Pexels API Key → [Get here](https://www.pexels.com/api)

### Backend Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/tripma.git
cd tripma/trip-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your API keys to .env

# Seed vector database (run once)
node vector/seed.js

# Start server
npm run dev
```

### Frontend Setup

```bash
cd tripma/trip-frontend

# Install dependencies
npm install

# Create .env file
VITE_PEXELS_KEY=your_pexels_key_here

# Start frontend
npm run dev
```

### Environment Variables

**Backend `.env`:**
```
API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_uri (optional)
PORT=5000
```

**Frontend `.env`:**
```
VITE_PEXELS_KEY=your_pexels_api_key
```

---

## 🗺️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trip/trips` | Get AI trip plan |

### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `location` | string | City name | `Thrissur` |
| `budget` | number | Budget in INR | `5000` |
| `days` | number | Number of days | `2` |
| `interest` | string | Type of place | `beach` |

### Example Request

```
GET /api/trip/trips?location=Thrissur&budget=5000&days=2&interest=beach
```

### Example Response

```json
{
  "aiPlan": {
    "places": [
      {
        "name": "Snehatheeram Beach",
        "description": "A beautiful serene beach...",
        "estimatedCost": 500,
        "searchQuery": "Snehatheeram Beach Thrissur",
        "itinerary": [
          { "day": 1, "place": "Snehatheeram Beach", "plan": "Morning walk..." }
        ],
        "cost": {
          "travel": 200,
          "stay": 1500,
          "food": 800,
          "total": 2500
        }
      }
    ]
  }
}
```

---

## 🤔 Why RAG Instead of Just Prompting?

A common question is — why not just send all places to Gemini directly?

- **Scale** — As data grows to 1000s of places, you can't fit everything in a prompt
- **Accuracy** — Vector search finds the most relevant places before sending to Gemini
- **Cost** — Smaller prompts = fewer tokens = lower API costs
- **Speed** — Less data in prompt = faster response

RAG solves all these problems by first retrieving only the relevant places, then generating from that smaller context.

---

## 🗺️ Roadmap

- [ ] User authentication (JWT)
- [ ] Save and view past trips
- [ ] MongoDB integration
- [ ] Support for more cities
- [ ] Multi-city trip planning
- [ ] Export trip as PDF
- [ ] Share trip with friends

---

## 👨‍💻 Author

Rahulraj Ps
- GitHub: [@Rahulraj Ps](https://github.com/rahulrajps-dev)
- LinkedIn: https://www.linkedin.com/in/rahulrajps/

---

## 📄 License

MIT License — feel free to use this project for learning and portfolio purposes.

---

⭐ If you found this useful, give it a star on GitHub!
