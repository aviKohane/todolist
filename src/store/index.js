import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: JSON.parse(localStorage.getItem("users")) || [],
        currentUserId: JSON.parse(localStorage.getItem("currentUserId")) || null,
        currentUserLanguage: JSON.parse(localStorage.getItem("currentUserLanguage")) || 'en',
        isDarkMode: localStorage.getItem('darkMode') === 'true'
    },
    getters: {
        currentUser: state => state.users.find(u => u.id === state.currentUserId),
        userTasks: (state, getters) => getters.currentUser?.tasks || [],
        currentLanguage: state => state.currentUserLanguage,
        isDarkMode: state => state.isDarkMode,

    },
    mutations: {
        setCurrentUser(state, id) {
            state.currentUserId = id;
            localStorage.setItem("currentUserId", JSON.stringify(state.currentUserId))
        },
        addUser(state, user) {
            state.users.push(user);
            localStorage.setItem("users", JSON.stringify(state.users))
        },
        addTask(state, payload) {
            const user = state.users.find(u => u.id === payload.userId);
            if (user) {
                user.tasks.push(payload.task);
                localStorage.setItem("users", JSON.stringify(state.users))
            }
        },
        deleteTask(state, payload) {
            const user = state.users.find(u => u.id === payload.userId);
            if (user) {
                user.tasks.splice(payload.taskIndex, 1);
                localStorage.setItem("users", JSON.stringify(state.users))
            }
        },
        toggleStatusTask(state, payload) {
            const user = state.users.find(u => u.id === payload.userId);
            if (user && user.tasks[payload.taskIndex]) {
                user.tasks[payload.taskIndex].taskDone = payload.newStatus;
                localStorage.setItem("users", JSON.stringify(state.users));
            }

        },
        setCurrentLanguage(state, lang) {
            state.currentUserLanguage = lang;
            localStorage.setItem("currentUserLanguage", JSON.stringify(state.currentUserLanguage))
        },
        toggleDarkMode(state) {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('darkMode', state.isDarkMode);
        },
        setDarkMode(state, value) {
            state.isDarkMode = value;
            localStorage.setItem('darkMode', value);
        }
    }
})