# Vuex Tips — Payload Usage

## 🧠 What is a payload?

A Vuex mutation always receives **a single argument** called the payload.

✅ Example:
`this.$store.commit('addTask', {
  userId: this.userId,
  task: { ...this.task, createdAt: new Date().toISOString() }
});`

## ❌ Do NOT do this:
this.$store.commit('addTask', userId, task); // ❌ Invalid

## ✅ Why use a payload object?
- Vuex ignores arguments after the first one
- Payloads allow you to group all relevant data in one object
- More maintainable and scalable
