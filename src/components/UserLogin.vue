<template>
    <div class="login-container">
        <v-card class="pa-6 elevation-12 login-card" max-width="400">
            <v-card-title class="justify-center">
                <v-icon color="primary" class="mr-2">mdi-account-circle</v-icon>
                <span class="headline font-weight-bold">Welcome</span>
            </v-card-title>
            <v-card-subtitle class="text-center mb-4">
                Please enter your name to start
            </v-card-subtitle>
            <v-text-field v-model="username" autofocus label="Enter your name" outlined dense autocomplete="name"
                :error="usernameError" :error-messages="usernameError ? ['The name is required'] : []" />
            <v-btn color="primary" class="mt-2" @click="loginOrCreate">
                Start
            </v-btn>
        </v-card>
    </div>
</template>
<script>
export default {
    name: 'UserLogin',
    data() {
        return {
            username: '',
            usernameError: false,
        };
    },
    watch: {
        username(newVal) {
            if (newVal.trim().length > 0) {
                this.usernameError = false;
            }
        }
    },
    created() {
        let savedId = JSON.parse(localStorage.getItem("currentUserId"));
        if (savedId) {
            this.$store.commit("setCurrentUser", savedId);
            this.$router.push({ name: 'toDoList', params: { userId: savedId } })
        }



    },
    methods: {
        loginOrCreate() {
            let trimmedUsername = this.username.trim();
            let lowerUsername = trimmedUsername.toLowerCase();

            if (trimmedUsername.length > 0) {
                let existingUser = this.$store.state.users.find(u => u.name.toLowerCase() === lowerUsername)
                if (existingUser) {
                    this.$store.commit('setCurrentUser', existingUser.id)
                    this.$router.push({ name: 'toDoList', params: { userId: existingUser.id } })

                } else {
                    const newUser = {
                        id: Date.now(),
                        name: this.username.trim().toLowerCase(),
                        tasks: []
                    };
                    this.$store.commit('addUser', newUser);
                    this.$store.commit('setCurrentUser', newUser.id);
                    this.$router.push({ name: 'toDoList', params: { userId: newUser.id } });
                }
                this.usernameError = false;
            }
            else
                this.usernameError = true;


        }
    }
}
</script>
<style>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #1976d2;

}
</style>