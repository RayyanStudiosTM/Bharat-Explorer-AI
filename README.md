# 🇮🇳 Bharat Explorer AI

> **Discover Bharat, Intelligently** — An AI-powered tourism ecosystem for exploring India

![Bharat Explorer AI](https://img.shields.io/badge/AI-Powered-orange) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![Firebase](https://img.shields.io/badge/Firebase-Ready-yellow) ![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Project Overview

**Bharat Explorer AI** is not just a travel app — it's a unified AI-native tourism ecosystem that revolutionizes how people discover, plan, and experience India.

### Key Features

- 🔍 **AI Destination Discovery** — Personalized recommendations based on your interests
- 📅 **Smart Itinerary Generator** — AI-crafted daily schedules with detailed activities
- 🗺️ **Interactive Map Explorer** — Google Maps integration with attractions and services
- 💬 **AI Chat Assistant** — Conversational agent with persistent memory (Firestore)
- 🗣️ **Real-Time Translator** — Speech-to-speech translation for seamless communication

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- Google Cloud account (for Maps & Gemini APIs)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/bharat-explorer-ai.git
cd bharat-explorer-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

---

## 🔧 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS, ShadCN/UI |
| **AI** | Google Genkit, Gemini 2.0 Flash, Gemini 1.5 Flash |
| **Backend** | Firebase (Auth, Firestore, Hosting) |
| **Maps** | Google Maps JavaScript API, Places API |
| **Styling** | Tailwind CSS, Lucide React icons |

---

## 📁 Project Structure

```
bharat-explorer-ai/
├── app/
│   ├── explore/          # AI destination discovery
│   ├── plan/             # Smart itinerary generator
│   ├── map/              # Interactive map (coming soon)
│   ├── chat/             # AI chat assistant (coming soon)
│   ├── translate/        # Speech translator (coming soon)
│   └── api/
│       ├── destinations/
│       └── itinerary/
├── components/
│   ├── ui/               # ShadCN components
│   ├── features/         # Feature-specific components
│   └── shared/           # Reusable components
├── lib/
│   ├── firebase/         # Firebase configuration
│   ├── genkit/           # AI flows and configuration
│   └── utils/            # Helper functions
├── public/
│   └── data/
│       └── destinations.json  # 10+ curated destinations
└── .env.local            # Environment variables
```

---

## 🔑 Environment Setup

Create `.env.local` with these variables:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key

# Gemini AI
GOOGLE_GENAI_API_KEY=your_gemini_key
```

### Getting API Keys

1. **Firebase**: [Firebase Console](https://console.firebase.google.com/) → Create project → Web app
2. **Google Maps**: [Cloud Console](https://console.cloud.google.com/) → APIs & Services → Enable Maps JavaScript API & Places API
3. **Gemini**: [Google AI Studio](https://makersuite.google.com/app/apikey) → Create API key

---

## ✨ Features

### 1. AI Destination Discovery (`/explore`)

- Users describe interests (e.g., "historic forts, beaches")
- AI recommends 5 personalized destinations
- Shows highlights, best time to visit, and reasons

### 2. Smart Itinerary Generator (`/plan`)

- Input destinations and trip duration
- AI generates creative trip title and daily schedule
- Detailed time-based activities with descriptions

### 3. Interactive Map (Coming Soon - `/map`)

- Google Maps integration
- Markers for destinations, hotels, restaurants
- AI-generated info panels on click

### 4. AI Chat Assistant (Coming Soon - `/chat`)

- Conversational interface
- Persistent chat history in Firestore
- Context-aware responses about 160+ destinations

### 5. Real-Time Translator (Coming Soon - `/translate`)

- Speech-to-text transcription
- Language translation (English ↔ Hindi/Marathi/Tamil)
- Text-to-speech output

---

## 🗺️ Roadmap

### Phase 1: Core (✅ Complete)
- [x] Landing page
- [x] AI destination discovery
- [x] Smart itinerary generator
- [x] Firebase integration
- [x] Anonymous authentication

### Phase 2: Advanced Features (🔄 In Progress)
- [ ] Interactive Google Maps
- [ ] AI chat with Firestore memory
- [ ] Speech translation module

### Phase 3: Optimization (⏳ Planned)
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] PWA capabilities
- [ ] Analytics integration

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Contribution Areas

- **Frontend**: Build UI components with ShadCN/Tailwind
- **Backend**: Optimize Firestore queries, secure APIs
- **AI**: Enhance Genkit flows, tune prompts
- **Design**: Create responsive, culturally-aware interfaces
- **Content**: Curate destination data and cultural insights

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 Firebase Setup

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /chats/{chatId} {
        allow read, write: if request.auth.uid == userId;
      }
      
      match /itineraries/{itineraryId} {
        allow read, write: if request.auth.uid == userId;
      }
    }
    
    match /destinations/{destinationId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

Deploy rules:
```bash
firebase deploy --only firestore:rules
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Firebase not connecting**
```bash
firebase init
firebase deploy --only firestore:rules
```

**Issue: Genkit API errors**
- Verify `GOOGLE_GENAI_API_KEY` is set
- Check API quota in Google AI Studio

**Issue: Maps not loading**
- Enable Maps JavaScript API in Cloud Console
- Verify API key in `.env.local`

---

## 📊 Performance

- **Lighthouse Score**: 95+ (Target)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **API Response Time**: < 2s (Genkit flows)

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- **Google Gemini** for powerful AI capabilities
- **Firebase** for seamless backend infrastructure
- **Next.js** team for the amazing framework
- **ShadCN** for beautiful UI components
- All contributors who help celebrate India's diversity

---

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/bharat-explorer-ai/issues)
- **Documentation**: Check `/docs` folder for detailed guides
- **Community**: Join discussions in GitHub Discussions

---

## 🎉 Show Your Support

If you find this project helpful, please consider:

- ⭐ Starring the repository
- 🍴 Forking and contributing
- 📢 Sharing with others

---

**Built with ❤️ for celebrating India's incredible diversity**

*Discover Bharat, Intelligently* 🇮🇳
