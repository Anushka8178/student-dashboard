# Student Dashboard

A React-based dashboard for managing students with Firebase authentication and Firestore database.

## Features

- Firebase Authentication (Login/Signup)
- Student Management (Add/List/Filter)
- Real-time updates using Firestore
- Responsive design
- Protected routes

## Tech Stack

- React
- Firebase (Authentication & Firestore)
- React Router
- CSS3

## Setup

1. Clone the repository
```bash
git clone <repository-url>
cd student-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Create a Firebase project and add your configuration in `src/firebase.js`

4. Start the development server
```bash
npm run dev
```

## Project Structure

```
src/
  ├── components/         # React components
  ├── contexts/          # React contexts
  ├── firebase/          # Firebase configuration and functions
  ├── services/          # API services
  └── App.jsx           # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request