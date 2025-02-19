# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

src/
├── components/
│ ├── common/
│ │ └── Popup.jsx
│ ├── controller/
│ │ └── VirtualPad.jsx
│ ├── sprites/
│ │ ├── Player.jsx
│ │ ├── Food.jsx
│ │ └── PowerUp.jsx
│ └── tilesets/
│ └── Map.jsx
├── pages/
│ └── GamePage.jsx
├── utils/
│ ├── systems/
│ │ ├── Collision.jsx
│ │ ├── FoodSystem.js
│ │ ├── PowerUpSystem.js
│ │ └── ScoringSystem.js
│ └── store/
│ └── gameStore.js
