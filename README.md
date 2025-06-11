# 📝 ToDoList App

A simple and responsive task management application built with **Vue 2** and **Vuetify**, supporting multiple users and multilingual interface (English 🇬🇧 / French 🇫🇷).  
Each user has their own task list stored locally via `localStorage`.

## 🚀 Features

- ✅ Create, update, and delete tasks
- ✅ Track task completion status (done / to-do)
- ✅ Multi-user support via localStorage
- ✅ Language selector (English / French) with persistence
- ✅ Responsive design using Vuetify
- ✅ Persistent data across sessions using fixed po

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


