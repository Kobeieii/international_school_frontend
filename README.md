# Vue 3 Project

This is a web application built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/), providing a fast and modern front-end development experience.

## 🛠️ Tech Stack

* [Vue 3](https://vuejs.org/)
* [Vite](https://vitejs.dev/)
* [Pinia](https://pinia.vuejs.org/)
* [Vue Router](https://router.vuejs.org/)
* [TypeScript](https://www.typescriptlang.org/)

---

## 📦 Project Setup

Install dependencies:

```bash
npm install
```

Or if you're using Yarn:

```bash
yarn install
```

---

## 🧪 Development Server

Start the dev server:

```bash
npm run dev
```

This will run the app at [http://localhost:5173](http://localhost:5173) by default.

---

## 🏗️ Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

---

## 🧪 Preview Production Build

```bash
npm run preview
```

This will locally serve the built app.

---

## 🧹 Linting

```bash
npm run lint
```

---

## 🔧 Customize Configuration

See [Vite Configuration Reference](https://vitejs.dev/config/) and [Vue 3 Documentation](https://vuejs.org/guide/).

---

## 📁 Project Structure

```text
src/
├── assets/         # Static assets
├── components/     # Reusable components
├── views/          # Page-level components
├── router/         # Vue Router setup
├── store/          # Pinia stores (if using Pinia)
├── App.vue         # Root component
└── main.js         # App entry point
```

---

## 👥 User Roles

This project includes different user roles for testing and demonstration purposes:

| Role                 | Email                            | Password     |
| -------------------- | -------------------------------- | ------------ |
| Admin                | `admin@email.com`                | `admin`      |
| Editor               | `editor@email.com`               | `admin`      |
| Viewer               | `viewer@email.com`               | `admin`      |
| Viewer Data Mapping  | `viewer_data_mapping@email.com`  | `admin`      |
| Editor Data Mapping  | `editor_data_mapping@email.com`  | `admin`      |
