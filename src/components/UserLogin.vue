<template>
    <v-card class="pa-4" max-width="400" outlined>
        <v-text-field v-model="username" label="Enter your name" outlined dense />
        <v-btn color="primary" class="mt-2" @click="loginOrCreate">
            Start
        </v-btn>
    </v-card>
</template>
<script>
export default {
    name: 'UserLogin',
    data() {
        return {
            username: ''
        };
    },

    methods: {
        loginOrCreate() {
            let existingUser = this.$store.state.users.find(u => u.name === this.username.trim())
            if (existingUser) {
                this.$store.commit('setCurrentUser', existingUser.id)
            } else {
                const newUser = {
                    id: Date.now(),
                    name: this.username.trim(),
                    tasks: []
                };
                this.$store.commit('addUser', newUser);
                this.$store.commit('setCurrentUser', newUser.id);
                this.$router.push({name:'toDoList',params:{id:newUser.id}});
            }
        }
    }
}
</script>