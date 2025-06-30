<template>
    <div class="task-details-container">
        <v-row justify="center" align="center" style="min-height: 80vh">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card elevation="6" class="pa-4 d-flex flex-column justify-space-between" style="min-height: 300px;">
                    <v-card-title class="headline font-weight-bold primary--text">
                        {{ $t('taskDetailsTitle') }}
                    </v-card-title>

                    <v-divider class="my-3"></v-divider>

                    <v-card-text class="flex-grow-1 d-flex align-center justify-center">
                        <div class="task-info text-left" v-if="task">
                            <div class="mb-3">
                                <strong>{{ $t('taskLabel') }}</strong> {{ task.taskName }}
                            </div>
                            <div class="mb-3" v-if="task.taskDescription">
                                <strong>{{ $t('descriptionLabel') }}</strong> {{ task.taskDescription }}
                            </div>
                            <div class="mb-3">
                                <strong>{{ $t('statusLabel') }}</strong>
                                <span
                                    :class="task.taskDone ? 'green--text font-weight-bold' : 'red--text font-weight-bold'">
                                    {{ task.taskDone ? $t('statusDone') : $t('statusToDo') }}
                                </span>
                            </div>
                            <div class="mb-3">
                                <strong>{{ $t('priorityLabel') }}</strong> {{ $t(task.priority) }}
                            </div>
                            <div>
                                <strong>{{ $t('createdAtLabel') }}</strong> {{ formatDate(task.createdAt) }}
                            </div>
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="$router.push({ name: 'toDoList', params: { userId: userId } })">
                            <v-icon left>mdi-arrow-left</v-icon>
                            {{ $t('backToList') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>

            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: ['index', 'userId'],
    data() {
        return {
            task: null
        };
    },
    created() {
        const tasks = this.$store.getters.userTasks;
        this.task = tasks?.[this.index];
    },
    methods: {
        formatDate(taskDate) {
            const date = new Date(taskDate);
            return date.toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }
};
</script>

<style scoped>
.task-details-container {
    height: 100vh;
    background-color: #1976d2;
    padding: 20px 12px;
}

.mb-3 {
    margin-bottom: 12px;
}

.task-info {
    max-width: 100%;
    padding: 0 16px;
}
</style>
