<template>
    <div class="container">
        <h1>My To Do List</h1>
        <div class="task-fields">
            <div>
                <label for="taskTitle">Write task name :</label>
                <input v-model="task.taskName" type="text" id="taskTitle" required>
                <div v-if="taskError === true" style="color:red">The task name is required</div>
            </div>
            <div>
                <label for="taskDescription">Write description task :</label>
                <input v-model="task.taskDescription" type="text" id="taskDescription">
            </div>
        </div>


        <button @click="addTask" :style="taskError ? { color: 'red' } : {}">Add a task</button>
        <div class="list-container" v-if="tasksList.length > 0">
            <ul class="list-container2" v-for="(key, index) in tasksList" v-bind:key="index">

                <li>
                    <input type="checkbox" id="taskStatus">
                    {{ tasksList[index] }}
                    <button class="details-button" @click="openDetailsModal">See details</button>
                    <button class="delete-button" @click="deleteTask(index)">X</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ToDoList',
    data() {
        return {
            tasksList: [],
            task: {
                taskName: "",
                taskDescription: "",
                taskDone: false,
            },
            taskError: false,



        }
    },
    created() {
        let savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            this.tasksList = JSON.parse(savedTasks);
        }
    },
    methods: {
        addTask() {
            if (this.task.taskName !== undefined && this.task.taskName !== null && this.task.taskName.length > 0) {
                this.tasksList.push(this.task.taskName);
                this.task.taskName = "";
                this.taskError = false;
                localStorage.setItem("tasks", JSON.stringify(this.tasksList));

            } else
                this.taskError = true;


        },
        deleteTask(index) {
            this.tasksList.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(this.tasksList));
        },
        openDetailsModal() {

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task-fields {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
}

.task-fields label {
    font-weight: bold;
    display: block;
    margin-bottom: 6px;
}

.task-fields input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.list-container {
    display: flex;
    /* justify-content: flex-end; */
    flex-direction: column;
    align-items: flex-start;
}

.list-container2 {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

li {
    gap: 16px;
    display: flex;
    align-items: center;
    margin: 10px
}

.delete-button {
    margin: 10px
}
</style>