# Vuex Store Essentials

This file is a quick reminder of core Vuex concepts and how to use them correctly in a project like your ToDoList application.

## 🧠 Store Structure Overview

`state: {
  users: [],
  currentUserId: null
},

getters: {
  currentUser: state => state.users.find(u => u.id === state.currentUserId)
},

mutations: {
  setCurrentUser(state, id) { ... },
  addUser(state, user) { ... },
  addTask(state, payload) { ... }
},

actions: {
  // You can define asynchronous logic here
}`

## 🧩 State

Stores application-level data.

`state: {
  users: [],
  currentUserId: null
}`

## ⚙️ Mutations

Used to directly modify the state.

Always synchronous

Receive two arguments: state and payload

`addTask(state, payload) {
  const user = state.users.find(u => u.id === payload.userId);
  if (user) user.tasks.push(payload.task);
}`

Usage (in component):

`this.$store.commit('addTask', { userId: this.userId, task: this.task });
`
## 🚀 # Actions

Used for asynchronous operations (API calls, etc).

Call commit() to trigger mutations

Optional in your current app unless doing async logic

`actions: {
  async loadUsers({ commit }) {
    const response = await fetch(...);
    commit('setUsers', response.data);
  }
}`

## 🔍 Getters

Return computed state values

`getters: {
  currentUser: state => state.users.find(u => u.id === state.currentUserId)
}`

Usage:

`this.$store.getters.currentUser
`
## 📦 Payloads

Payloads are the objects you pass when calling a mutation or action. They allow you to send multiple values in one object.

`this.$store.commit('addTask', {
  userId: this.userId,
  task: {
    taskName: "Learn Vuex",
    taskDescription: "Review how payloads work",
    taskDone: false,
    createdAt: new Date().toISOString()
  }
});`

