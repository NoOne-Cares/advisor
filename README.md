# AI Product Recommendation Chatbot (React Native)

A smart, conversational shopping assistant built with **React Native**. This chatbot suggests the most suitable product from a predefined list based on user input, creating a fast and intuitive product discovery experience.

---
##  Features

- Conversational chatbot for product queries
- Smart product recommendation from predefined data
- Modular, reusable UI components
- Tailwind-like styling with NativeWind
- Real-time feedback via loading and error states

---
## File Structure
```
├── App.tsx
├── assets/
│   └── icons/                   # Icons used 
├── components/                   # Reusable UI components
│   ├── Hero.tsx
│   ├── InputBox.tsx
│   └── ProductCard.tsx
├── utils/
│   ├── types.ts                 # Type definitions for products
│   ├── useFetch.ts             # Custom hook for recommendations
|   └── products.json            # List of Skus
└── README.md
```
---
## Data Flow

- User Input → Typed into the InputBox.
- Input Trigger → Calls `handleInput()` → runs `recommend()` from useProductRecommender.
- Recommendation Result → Displayed via ProductCard.
- Loading/Error States → Managed and shown conditionally via `<ActivityIndicator/>` and `<Text />`.

---
## High-Level Architecture

                           ┌────────────────────────────┐
                           │        User Input          │
                           │  (via InputBox component)  │
                           └────────────┬───────────────┘
                                        │
                                        ▼
                           ┌────────────────────────────┐
                           │  handleInput Function      │
                           │  └─ Validates input        │
                           │  └─ Calls recommender hook │
                           └────────────┬───────────────┘
                                        │
                                        ▼
                           ┌────────────────────────────┐
                           │ useProductRecommender Hook │
                           │  └─ Fetches or filters     │
                           │     predefined products    │
                           │  └─ Returns recommendation │
                           └────────────┬───────────────┘
                                        │
                                        ▼
                           ┌────────────────────────────┐
                           │  UI Feedback Components    │
                           │  ├─ Loading Spinner        │
                           │  ├─ Error Text             │
                           │  └─ Hero Section           │
                           └────────────┬───────────────┘
                                        │
                                        ▼
                           ┌────────────────────────────┐
                           │    ProductCard Component   │
                           │  └─ Displays recommended   │
                           │     product info (name,    │
                           │     price, reason)   │
                           └────────────┬───────────────┘
                                        │
                                        ▼
                           ┌────────────────────────────┐
                           │      Static Assets         │
                           │    (e.g. Icons, Images)    │
                           └────────────────────────────┘

---
## How to Run

1. Create a .env file and add the gemini api key
```bash
EXPO_PUBLIC_GEMINI_API_KEY=GEMINI_API_KEY
```
2. Install dependencies

   ```bash
   npm install
   ```
3. Start the app

   ```bash
   npx expo start
   ```
---

## Technologies Used

- React Native (with TypeScript)
- NativeWind (Tailwind CSS for RN)
- Gemini API
- Custom React Hooks
- Expo 