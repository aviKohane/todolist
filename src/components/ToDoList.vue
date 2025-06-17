<template>
    <v-container class="to-do-list-container">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card class="pa-4 elevation-10">
                    <v-card-title v-if="currentUser"
                        class="headline font-weight-bold primary white--text d-flex justify-space-between align-center">
                        <span>{{ $t('welcomeTitle') }} {{ currentUserName }} </span>

                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" md="10">
                <v-form>
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field v-model="task.taskName" :label="$t('taskNameLabel')"
                                prepend-inner-icon="mdi-pencil" :error="taskError" required
                                :error-messages="taskError ? [$t('taskNameRequired')] : []" outlined dense
                                class="mb-2" />
                        </v-col>

                        <v-col cols="12" sm="8">
                            <v-text-field v-model="task.taskDescription" :label="$t('taskDescriptionLabel')"
                                prepend-inner-icon="mdi-text" outlined dense />
                        </v-col>

                        <v-col cols="12" sm="4" class="d-flex-column">

                            <div class="d-flex align-center justify-center"
                                style="gap: 8px; border: 1px solid grey; border-radius: 4px; width: 100%; height: 40px; padding: 0 12px;">
                                <v-tooltip v-for="item in taskPriorityItems" :key="item.value" top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon :color="item.color" class="priority-icon"
                                            :class="{ selected: task.priority === item.value }" v-bind="attrs" v-on="on"
                                            @click="task.priority = item.value">
                                            <v-icon>mdi-tag-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>{{ $t(item.label) }}</span>
                                </v-tooltip>
                            </div>

                        </v-col>
                    </v-row>

                    <v-btn color="primary" class="mt-3" @click="addTask" elevation="2">
                        <v-icon left>mdi-plus</v-icon>
                        {{ $t('addTask') }}
                    </v-btn>
                </v-form>

            </v-col>
        </v-row>

        <!-- Liste des tâches -->
        <v-row justify="center" class="mt-5">

            <div class="d-flex" style="gap: 16px;    padding: 0px 12px;">
                <v-select v-model="filterStatus" :items="[
                    { text: $t('statusAll'), value: 'all' },
                    { text: $t('todo'), value: 'todo' },
                    { text: $t('done'), value: 'done' }
                ]" item-text="text" item-value="value" :label="$t('filterByStatus')" dense outlined
                    style="max-width: 200px;" />
                <v-select v-model="filterPriority" :items="[
                    { text: $t('statusAll'), value: 'all' },
                    { text: $t('high'), value: 'high' },
                    { text: $t('medium'), value: 'medium' },
                    { text: $t('low'), value: 'low' }
                ]" item-text="text" item-value="value" :label="$t('filterByPriority')" dense outlined
                    style="max-width: 200px"></v-select>
                <v-text-field v-model="filterSearch" :label="$t('search')" dense outlined style="max-width: 300px;" />
            </div>

            <v-col cols="12" md="10">
                <v-card elevation="5" v-if="userTasks.length > 0" class="task-scroll-wrapper">
                    <v-list dense>
                        <v-list-item v-for="(taskItem, index) in filteredTasks" :key="index" class="py-2"
                            :class="{ 'task-done': taskItem.taskDone }">
                            <v-row align="center" no-gutters class="w-100">
                               <!-- before it was a chechbox check with users
                                     <v-checkbox v-model="taskItem.taskDone" style="color:#6ebe8d !important"
                                        hide-details @change="toggleTaskStatus(index, taskItem.taskDone)" /> -->
                                    <v-btn icon :color="taskItem.taskDone ? 'green' : 'grey lighten-1'"
                                        @click="toggleTaskStatus(index, !taskItem.taskDone)">
                                        <v-icon>
                                            {{ taskItem.taskDone ? 'mdi-check-circle' :
                                            'mdi-checkbox-blank-circle-outline' }}
                                        </v-icon>
                                    </v-btn>
                                <v-col cols="1">
                                    <v-icon :color="getPriorityColor(taskItem.priority)">mdi-tag-outline</v-icon>
                                </v-col>
                                <v-col cols="7">
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
                <div v-if="filteredTasks.length === 0" class="text-center mt-5">
                    <div class="grey--text text--darken-1 mt-2" style="font-size: 18px;">
                        {{
                            filterSearch || filterStatus !== 'all' || filterPriority !== 'all'
                                ? $t('noTasksMatchFilters')
                                : $t('noTasksYet')
                        }}
                    </div>
                </div>

            </v-col>
        </v-row>

        <!-- delete task dialog -->
        <v-dialog v-model="deleteTaskDialog" width="500">
            <v-card>
                <v-card-title class="headline" style="color:red">
                    <v-icon left style="color:red" class="mr-2">mdi-alert-circle</v-icon>
                    {{ $t('confirmDeletion') }}
                </v-card-title>
                <v-card-text style="font-size: 20px; text-align: center;">
                    {{ $t('confirmDeleteMessage') }}
                    <strong>{{ userTasks[taskToDeleteIndex]?.taskName }}</strong>?

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn style="color:red" @click="confirmDelete">
                        <v-icon left>mdi-delete</v-icon>
                        {{ $t('confirmDeleteButton') }}
                    </v-btn>
                    <v-btn color="grey" @click="deleteTaskDialog = false">
                        {{ $t('cancel') }}

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
                priority: 'medium',
            },
            taskError: false,
            deleteTaskDialog: false,
            taskToDeleteIndex: null,
            filterStatus: 'all',
            filterSearch: '',
            filterPriority: 'all',
            taskPriorityItems: [
                { value: 'high', color: 'red', label: 'priorityHigh' },
                { value: 'medium', color: 'orange', label: 'priorityMedium' },
                { value: 'low', color: 'green', label: 'priorityLow' }
            ]


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
        },
        filteredTasks() {
            let tasks = this.userTasks || [];
            if (this.filterStatus === "done") {
                tasks = tasks.filter(item => item.taskDone)
            } else if (this.filterStatus === "todo") {
                tasks = tasks.filter(item => !item.taskDone)
            }
            if (this.filterPriority === "low") {
                tasks = tasks.filter(item => item.priority === "low")
            }
            if (this.filterPriority === "medium") {
                tasks = tasks.filter(item => item.priority === "medium")
            }
            if (this.filterPriority === "high") {
                tasks = tasks.filter(item => item.priority === "high")
            }

            if (this.filterSearch.trim().length > 0) {
                let searchInput = this.filterSearch.toLowerCase();
                tasks = tasks.filter(item => item.taskName.toLowerCase().includes(searchInput))
            }
            return tasks;

        },

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
                    priority: 'medium'
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
        getPriorityColor(priority) {
            const item = this.taskPriorityItems.find(i => i.value === priority);
            return item ? item.color : 'grey'; // fallback si aucune correspondance
        }




    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.to-do-list-container {
    /* height: 100%; */
    min-height: 100vh;
    /* ✅ Permet un layout fluide */
    background-color: white;

}

.task-scroll-wrapper {
    /* max-height: 330px;
    overflow-y: auto; */
    max-height: calc(100vh - 520px);
    /* Ajustable selon ton layout */
    overflow-y: auto;
    margin-top: 12px;
}

 .task-done {
    text-decoration: line-through;
    color: #6ebe8d;
} 
/* .task-done {
    text-decoration: line-through;
    color: #a9a9a9;
    background-color: #f1f1f1;
    border-radius: 6px;
    padding: 8px 12px;
    transition: all 0.2s ease;
    opacity: 0.8;
}

.task-done:hover {
    background-color: #e0e0e0;
    opacity: 1;
} */



.priority-color-boxes {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.priority-icon {
    width: 32px;
    height: 32px;
    min-width: 32px;
}
</style>