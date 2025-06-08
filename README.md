# todolist

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

<!-- 

Le localStorage est lié au nom de domaine ET au port.

Par exemple :

http://localhost:8080 ≠ http://127.0.0.1:8080

http://localhost:8080 ≠ http://localhost:5173

👉 Si tu ouvres ton app sur un autre port, le navigateur considère que c’est une autre app, donc un localStorage vide.

🧪 Test : va sur Application → localStorage dans les DevTools, et vérifie pour quelle URL c’est stocké.
j ai fixe le port dans le file vue.congig.js afin de garder les donnees de mon localStorage 
👉 Si tu ouvres ton app sur un autre port, le navigateur considère que c’est une autre app, donc un localStorage vide. -->


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

## 🔐 LocalStorage Management

`localStorage` is tied to both the **domain and the port**.

For example:

- `http://localhost:8080` ≠ `http://127.0.0.1:8080`
- `http://localhost:8080` ≠ `http://localhost:5173`

👉 If you open your app on a different port, the browser treats it as a different application, resulting in an empty `localStorage`.

🧪 You can check this in **DevTools → Application tab → localStorage**, and see which URL it is associated with.

✅ **I fixed the port in `vue.config.js` (port 8080)** to ensure that `localStorage` data is preserved across sessions, even after restarting the app.
"""

