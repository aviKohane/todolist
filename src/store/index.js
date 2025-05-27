import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: [],
        currentUserId: null
    },
    getters: {
        currentUser: state => state.users.find(u => u.id === state.currentUserId)
    },
    mutations:{
        setCurrentUser(state,id){
            state.currentUserId=id;
        },
        addUser(state,user){
            state.users.push(user);

        }
    }
})