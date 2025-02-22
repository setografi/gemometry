# Gemo and the Astro Code 🚀

**Gemo and the Astro Code** adalah game web berbasis **React.js** yang menggabungkan mekanisme **Snake klasik** dengan **puzzle, eksplorasi, dan misteri kosmik**. Pemain mengendalikan **Gemo**, alien berbentuk ular yang menjelajahi **Cosmara** untuk mengumpulkan **Astro Code** dan memecahkan teka-teki interaktif.

## 🎮 Fitur Utama

- **5 Level Unik** dengan mekanisme teka-teki. (Coming Soon)
- **Berbagai Mode Permainan** (Story, Time Attack, Endless, Challenge). (Coming Soon)
- **Obstacle & Power-ups** (Slow Motion, Ghost Mode, Double Score).
- **AI Rival & Multiplayer Sederhana** (opsional). (Coming Soon)
- **Visual Dinamis dengan GLSL Shader** untuk efek luar angkasa yang imersif. (Coming Soon)
- **Sistem Kustomisasi** untuk mengubah warna dan efek Gemo. (Coming Soon)

## 🛠️ Teknologi

- **Frontend:** React.js, Tailwind CSS, Zustand.
- **Grafik & Animasi:** GLSL Shader, efek neon minimalis.

## 📅 Development Roadmap

✅ **Phase 1:** Core Mechanics (Movement, Food, Basic Levels).  
🔄 **Phase 2:** Level Design & Puzzle Integration.  
🔄 **Phase 3:** Obstacles, Power-ups, & AI.  
🔜 **Phase 4:** Multiplayer (Jika diterapkan).  
🔜 **Phase 5:** Polishing & Deployment.

## 🚀 Cara Menjalankan

1. **Clone repo ini**
   ```bash
   git clone https://github.com/setografi/gemometry.git
   cd gemometry
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Jalankan game**
   ```bash
   npm run dev
   ```
4. **Buka di browser**: `http://localhost:5173`

## 📁 Struktur Folder

```
src/
├── components/
│ ├── common/
│ │ ├── Button.jsx
│ │ └── Popup.jsx
│ ├── controller/
│ │ └── VirtualPad.jsx
│ ├── game/
│ │ ├── About.jsx
│ │ ├── GameBoard.jsx
│ │ ├── GameModes.jsx
│ │ ├── GameOverModal.jsx
│ │ ├── HighScores.jsx
│ │ └── Settings.jsx
│ ├── sprites/
│ │ ├── GameHeader.jsx
│ │ └── GameMenu.jsx
│ ├── sprites/
│ │ ├── Player.jsx
│ │ ├── Food.jsx
│ │ └── PowerUp.jsx
│ ├── tilesets/
│ │ └── Tileset.jsx
│ ├── hooks/
│ │ ├── useGameControl.js
│ │ ├── useGameLogic.js
│ │ └── useGameSystems.js
├── pages/
│ │ ├── HomePage.jsx
│ │ └── GamePage.jsx
├── utils/
│ ├── systems/
│ │ ├── AISystem.jsx
│ │ ├── FoodSystem.js
│ │ ├── PowerUpSystem.js
│ │ └── ScoringSystem.js
│ └── store/
│ └── gameStore.js
```

---
