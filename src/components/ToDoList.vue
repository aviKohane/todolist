<template>
    <div class="to-do-list-container">
        <div class="page-container">
            <h1 v-if="currentUser" class="page-title">
                <span class="header-text">
                    {{ $t('welcomeTitle') }} {{ currentUserName }}
                </span>
            </h1>
        </div>


        <div class="to-do-list-form">
            <v-text-field v-model="task.taskName" :label="$t('taskNameLabel')" prepend-inner-icon="mdi-pencil"
                :error="taskError" required :error-messages="taskError ? [$t('taskNameRequired')] : []" outlined
                dense />
            <v-text-field v-model="task.taskDescription" :label="$t('taskDescriptionLabel')"
                prepend-inner-icon="mdi-text" outlined dense />
            <div class="priority-time-form">
                <div class="task-priority-field">
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
                <div class="task-date-field">
                    <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
                        max-width="290" min-width="290" @open="datePickerStep = 'date'">
                        <template #activator="{ on, attrs }">
                            <v-text-field class="time-date-picker-field" v-model="displayedDateTime" :label="$t('scheduledFor')"
                                readonly dense prepend-icon="mdi-calendar-clock" v-bind="attrs" v-on="on" />
                        </template>

                        <v-card>
                            <v-date-picker v-if="datePickerStep === 'date'" v-model="selectedDate" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="datePickerStep = 'time'">
                                    {{ $t('next') }}
                                </v-btn>
                            </v-date-picker>

                            <v-time-picker v-if="datePickerStep === 'time'" v-model="selectedTime" format="24hr"
                                scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="datePickerStep = 'date'">
                                    {{ $t('back') }}
                                </v-btn>
                                <v-btn text color="primary" @click="saveDateTime">
                                    OK
                                </v-btn>
                            </v-time-picker>
                        </v-card>
                    </v-menu>
                </div>
            </div>
            <div class="add-task-btn">
                <v-btn color="primary" @click="addTask" style="height: 40px;">
                    <v-icon left>mdi-plus</v-icon>
                    {{ $t('addTask') }}
                </v-btn>
            </div>


        </div>

        <!-- Liste des tâches -->
        <div class="to-do-list-filters">
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
            <v-text-field v-model="filterSearch" :label="$t('search')" dense outlined style="max-width: 300px;">
                <!-- clearable @click:clear="clearSearch" -->
            </v-text-field>
        </div>
        <div class="to-do-list-task-list">
            <v-card elevation="5" v-if="userTasks.length > 0" class="task-list-container">
                <v-list dense class="task-scroll-wrapper">
                    <v-list-item v-for="(taskItem, index) in filteredTasks" :key="index" class="py-2"
                        :class="{ 'task-done': taskItem.taskDone }">
                        <v-row align="center" no-gutters class="w-100">
                            <v-col cols="2" xs="2" class="d-flex justify-center">
                                <v-btn icon :color="taskItem.taskDone ? 'green' : 'grey lighten-1'"
                                    @click="toggleTaskStatus(index, !taskItem.taskDone)">
                                    <v-icon>
                                        {{ taskItem.taskDone ? 'mdi-check-circle' :
                                            'mdi-checkbox-blank-circle-outline' }}
                                    </v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="2" xs="2" class="d-flex justify-center">
                                <v-icon :color="getPriorityColor(taskItem.priority)">mdi-tag-outline</v-icon>
                            </v-col>
                            <v-col cols="6" xs="6">
                                <div :class="['font-weight-bold', taskItem.taskDone ? 'task-done' : '']">
                                    {{ taskItem.taskName }}
                                </div>
                            </v-col>
                            <v-col cols="2" xs="2" class="d-flex justify-end">
                                <router-link :to="{ name: 'taskDetails', params: { index } }">
                                    <v-btn icon><v-icon color="blue">mdi-eye</v-icon></v-btn>
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
        </div>

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
    </div>
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
            ],
            menu: false,
            datePickerStep: 'date',   // 'date' ou 'time'
            selectedDate: null,       // au format YYYY-MM-DD
            selectedTime: null,       // au format HH:mm (24 h)
            displayedDateTime: '',    // texte lisible dans le champ





        }
    },
    watch: {
        'task.taskName'(newVal) {
            if (newVal && newVal.trim().length > 0) {
                this.taskError = false;
            }
        },
        filterStatus(val) {
            localStorage.setItem('todoFilterStatus', val);
        },
        filterPriority(val) {
            localStorage.setItem('todoFilterPriority', val);
        },
        filterSearch(val) {
            console.log("watch ==> filterSearch =", val)
            localStorage.setItem('todoFilterSearch', val);
        }
    },
    created() {
        const user = this.$store.state.users.find(u => u.id === this.userId);

        if (!user) {
            this.$router.replace('/');
        } else {
            this.$store.commit('setCurrentUser', this.userId);
        }
        this.filterStatus = localStorage.getItem('todoFilterStatus') || 'all';
        this.filterPriority = localStorage.getItem('todoFilterPriority') || 'all';
        const storedSearch = localStorage.getItem('todoFilterSearch');
        this.filterSearch = storedSearch !== null ? storedSearch : '';
        console.log("this.filterSearch =", this.filterSearch)
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

            const searchInput = (this.filterSearch || '').toLowerCase().trim();
            if (searchInput.length > 0) {
                tasks = tasks.filter(item =>
                    item.taskName?.toLowerCase().includes(searchInput)
                );
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
                    priority: 'medium',
                    dueDate: null

                }
                this.taskError = false;
                this.displayedDateTime = "";
                this.selectedDate = null;
                this.selectedTime = null;


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
        },
        saveDateTime() {
            if (this.selectedDate && this.selectedTime) {
                const fullDateTime = `${this.selectedDate}T${this.selectedTime}`;
                this.task.dueDate = fullDateTime;   // stocké ISO pour persistance

                // locale dynamique selon la langue du store
                const lang = this.$store.getters.currentLanguage || 'en';
                const locale = `${lang.toLowerCase()}-${lang.toUpperCase()}`;

                this.displayedDateTime = new Date(fullDateTime).toLocaleString(locale, {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                this.menu = false;           // ferme le popup
                this.datePickerStep = 'date'; // réinitialise pour la prochaine fois
            }
        },
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.to-do-list-container {
    height: calc(100vh - 60px);
    /* background-color: red; */
    padding: 0 20px;
    display: flex;
    flex-direction: column;
}

.page-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 16px;
}

.page-title {
    background-color: #1976d2;
    /* ou autre couleur */
    color: white;
    border-radius: 10px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 22px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 0 16px;
}

.header-text {
    font-weight: bold;
    text-align: center;
    width: 100%;
}



.to-do-list-form {
    display: flex;
    flex-direction: column;
    /* height: 35%; */
    /* background-color: pink; */
    margin-bottom: 24px;
    padding-bottom: 50px;
    padding: 0 10%;
    padding-top: 2%;
}

.to-do-list-filters {
    height: 4%;
    /* background-color: grey; */
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding-bottom: 50px;
}

.to-do-list-task-list {
    height: 45%;
    /* background-color: #6ebe8d; */
    overflow-y: auto;
    border: 10px solid #1976d2;
    border-radius: 9px;
    padding: 10px;
}

.priority-time-form {
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;
    align-items: center;
    justify-content: space-between;
}

.task-date-field {
    width: 45%;
}

.time-date-picker-field {
    border: 1px solid grey;
    border-radius: 4px;
    height: 41px;

}

.task-priority-field {
    display: flex;
    align-content: center;
    justify-content: center;
    width: 45%;
    gap: 20%;
    border: 1px solid grey;
    border-radius: 4px;
    height: 40px;
    padding: 0 10%;
}

.add-task-btn {
    display: flex;
    justify-content: center;
}

.task-list-container {
    display: flex;
    flex-direction: column;
    max-height: 60vh;
}

.task-scroll-wrapper {
    flex: 1;
    overflow-y: auto;
}


.task-done {
    text-decoration: line-through;
    color: #6ebe8d;
}


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