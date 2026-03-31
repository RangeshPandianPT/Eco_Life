# EcoLife

EcoLife is a smart sustainability platform designed to help individuals make healthier, cost-efficient, and eco-friendly food choices.

Most consumers today make decisions based only on price and taste, without realizing the hidden environmental impact or nutritional quality of their meals. At the same time, people struggle with meal planning and grocery management, leading to poor diets, unnecessary spending, and food waste.

EcoLife solves these problems by combining AI-powered planning and product transparency into a single, easy-to-use app.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup

## 📌 Feature Scope (Current MVP)

The current release includes a focused MVP scope under the Eco Tools experience.

### 1. Daily Missions + Streak Tracking
- Users receive 3 daily sustainability missions.
- Mission completion is tracked with local persistence.
- Streak days and eco points are calculated in-app.

### 2. Smart Receipt Analyzer
- Users can paste receipt lines with prices.
- The app estimates total spend and approximate CO2e impact.
- A basic sustainability score is generated from parsed items.

### 3. Barcode Product Lookup
- Users can enter a barcode and retrieve product insights.
- Current MVP uses a built-in demo catalog.
- Results include eco score, health score, estimated footprint, and lower-impact alternative suggestions.

### In Scope
- Frontend implementation in the React app.
- Route integration through the Eco Tools page.
- Netlify-ready SPA deployment configuration.

### Out of Scope (Next Phase)
- OCR-based real image receipt scanning.
- Live barcode/API product database integration.
- Backend user profiles, cloud sync, and analytics pipeline.

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 📦 Deployment

Build the application for production:

```bash
npm run build
```

## 🙏 Acknowledgments

-TEAM - AlgoRangers
- Powered by React and Vite
- Styled with Tailwind CSS

