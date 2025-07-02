# 📝 ToDoList App

A modern, responsive task management application built with **Vue 2**, **Vuetify**, and **Vuex**, supporting multiple users, internationalization, and dynamic task filtering.

Each user has their own task list stored locally via `localStorage`, with persistent filters and language settings across sessions.

## 🚀 Features

- ✅ Create, update, and delete tasks
- ✅ Track task completion (done / to-do)
- ✅ Multi-user support via `localStorage`
- ✅ Language selector with 6 supported languages (EN, FR, ES, PT, RU, DE)
- ✅ Persistent language and filter settings
- ✅ Filtering by status (to-do / done), priority (high / medium / low), and keywords
- ✅ Visual chips showing task statistics (completed, pending, total)
- ✅ Responsive and accessible UI built with Vuetify and CSS
- ✅ Dark/light theme readiness 

## 🧠 Tech Stack

- ⚙️ Vue 2
- 🎨 Vuetify
- 🔁 Vuex
- 🌐 Vue-i18n (multilingual support)
- 💾 localStorage

---

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

## 🔐 LocalStorage Management

This app uses localStorage to persist user and task data across sessions.

⚠️ localStorage is domain + port specific, which means:

http://localhost:8080 ≠ http://127.0.0.1:8080

http://localhost:8080 ≠ http://localhost:5173

👉 If you open the app on a different port or hostname, your data will appear missing because the browser treats it as a separate app.

✅ To avoid this, the port is explicitly fixed to 3000 using vue.config.js, ensuring consistent localStorage behavior.

🔍 You can inspect stored data via:
DevTools → Application tab → Local Storage


