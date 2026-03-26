# World Cup 2026 Companion App

A comprehensive, modern mobile application designed for the **FIFA World Cup 2026**. Built with **React Native** and **Expo**, this app provides football fans with an all-in-one platform for fixtures, squad building, predictions, and more.

## 🚀 Key Features

- **Dynamic Fixtures & Results**: Browse the full match schedule, view live scores (mocked), and check historical match results.
- **Squad Builder (Fantasy)**: Create your dream 11 with a custom formation selector (4-3-3, 4-4-2, etc.) and a database of international stars.
- **Tournament Bracket**: visualize and predict the knockout stages of the tournament.
- **Group Standings**: Real-time group tables with points, goal differences, and head-to-head tracking.
- **Country Profiles**: Detailed views for each participating nation, including their full squad, manager, and recent form.
- **Modern Dark UI**: Premium dark-first design system utilizing Emerald (Primary) and Amber (Accent) colors for a sleek feel.

## 🛠 Tech Stack

- **Frontend**: React Native, Expo, Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Icons**: Lucide React Native, Phosphor Icons
- **State Management**: Zustand
- **Monorepo**: Managed with pnpm and Turborepo

## 📦 Project Structure

```bash
wc2026/
├── apps/
│   └── mobile/      # The main Expo mobile application
├── packages/
│   └── core/        # Shared logic and business rules (scoring, types)
├── supabase/        # Database migrations and configurations (WIP)
└── turbo.json       # Turborepo configuration
```

## 🛠 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (`npm install -g pnpm`)
- Expo Go (on your mobile device or simulator)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hasankokes/worldcup2026.git
   cd worldcup2026
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the mobile application:
   ```bash
   pnpm --filter mobile run dev
   # Or for web:
   pnpm --filter mobile run web
   ```

## 🎨 Design System

This project follows a strict dark-navy design system:
- **Background**: `#0F172A`
- **Surface**: `#1E293B`
- **Primary**: `#10B981` (Emerald)
- **Accent**: `#F59E0B` (Amber)

---

Developed with ❤️ for the World Cup 2026 fans.
