<template>
    <v-container class="to-do-list-container">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card class="pa-4 elevation-10">
                    <v-card-title v-if="currentUser"
                        class="headline font-weight-bold primary white--text d-flex justify-space-between align-center">
                        <span>Welcome to your To Do List {{ currentUserName }} </span>
                        <v-btn small color="white" class="ml-2" @click="logout">
                            <v-icon left color="primary">mdi-logout</v-icon>
                            Logout
                        </v-btn>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" md="10">
                <v-form>
                    <v-text-field v-model="task.taskName" label="Task name" prepend-inner-icon="mdi-pencil"
                        :error="taskError" :error-messages="taskError ? ['The task name is required'] : []" outlined
                        dense class="mb-4" />
                    <v-text-field v-model="task.taskDescription" label="Task description" prepend-inner-icon="mdi-text"
                        outlined dense />
                    <v-btn color="primary" class="mt-3" @click="addTask" elevation="2">
                        <v-icon left>mdi-plus</v-icon>
                        Add a task
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
        <!-- Liste des tâches -->
        <v-row justify="center" class="mt-5">
            <v-col cols="12" md="10">
                <v-card elevation="5" v-if="userTasks.length > 0" class="task-scroll-wrapper">
                    <v-list dense>
                        <v-list-item v-for="(taskItem, index) in userTasks" :key="index" class="py-2"
                            :class="{ 'task-done': taskItem.taskDone }">
                            <v-row align="center" no-gutters class="w-100">
                                <v-col cols="1">
                                    <v-checkbox v-model="taskItem.taskDone" style="color:#6ebe8d !important"
                                        hide-details @change="toggleTaskStatus(index, taskItem.taskDone)" />
                                </v-col>

                                <v-col cols="8">
                                    <div :class="['font-weight-bold', taskItem.taskDone ? 'task-done' : '']">
                                        {{ taskItem.taskName }}</div>
                                </v-col>
                                <v-col cols="3" class="text-right">
                                    <router-link :to="{ name: 'taskDetails', params: { index } }">
                                        <v-btn icon>
                                            <v-icon color="blue">mdi-eye</v-icon>
                                        </v-btn>
                                    </router-link>
                                    <v-btn icon @click="openDeleteDialog(index)">
                                        <v-icon color="red">mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item>
                    </v-list>
                </v-card>
                <div v-else class="text-center grey--text text--darken-1 mt-5">
                    No tasks added yet.
                </div>
            </v-col>
        </v-row>

        <!-- Dialog de suppression -->
        <v-dialog v-model="deleteTaskDialog" width="500">
            <v-card>
                <v-card-title class="headline" style="color:red">
                    <v-icon left style="color:red" class="mr-2">mdi-alert-circle</v-icon>
                    Confirm Deletion
                </v-card-title>
                <v-card-text style="font-size: 20px; text-align: center;">
                    Are you sure you want to delete the task
                    <strong>{{ userTasks[taskToDeleteIndex]?.taskName }}</strong>?

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn style="color:red" @click="confirmDelete">
                        <v-icon left>mdi-delete</v-icon>
                        Yes, delete
                    </v-btn>
                    <v-btn color="grey" @click="deleteTaskDialog = false">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: 'ToDoList',
    props: ['userId'],
    data() {
        return {
            task: {
                taskName: "",
                taskDescription: "",
                taskDone: false,
            },
            taskError: false,
            deleteTaskDialog: false,
            taskToDeleteIndex: null,


        }
    },
    watch: {
        'task.taskName'(newVal) {
            if (newVal && newVal.trim().length > 0) {
                this.taskError = false;
            }
        }
    },
    created() {
        const user = this.$store.state.users.find(u => u.id === this.userId);

        if (!user) {
            this.$router.replace('/');
        } else {
            this.$store.commit('setCurrentUser', this.userId);
        }

    },
    computed: {
        userTasks() {
            return this.$store.getters.userTasks;
        },
        currentUser() {
            return this.$store.getters.currentUser;
        },
        currentUserName() {
            return this.currentUser.name.toUpperCase();
        }
    },
    methods: {
        addTask() {
            if (this.task.taskName.trim().length > 0) {
                this.$store.commit('addTask', {
                    userId: this.userId,
                    task: {
                        ...this.task, createdAt: new Date().toISOString()
                    }
                })

                this.task = {
                    taskName: "",
                    taskDescription: "",
                    taskDone: false,
                }

                this.taskError = false;

            } else
                this.taskError = true;


        },
        openDeleteDialog(index) {
            this.taskToDeleteIndex = index
            this.deleteTaskDialog = true;
        },
        confirmDelete() {
            if (this.taskToDeleteIndex !== null) {
                this.$store.commit('deleteTask', {
                    userId: this.userId,
                    taskIndex: this.taskToDeleteIndex,
                })

                this.taskToDeleteIndex = null;
            }
            this.deleteTaskDialog = false;
        },
        toggleTaskStatus(index, newStatus) {
            this.$store.commit("toggleStatusTask", {
                userId: this.userId,
                taskIndex: index,
                newStatus: newStatus
            })
        },
        logout() {
            this.$store.commit("setCurrentUser", null);
            this.$router.push('/');

        }


    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.to-do-list-container {
    height: 100%;
    background-color: white;
}

.task-scroll-wrapper {
    max-height: 400px;
    overflow-y: auto;
}

.task-done {
    text-decoration: line-through;
    color: #6ebe8d;
}
</style>