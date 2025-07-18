import Vue from 'vue';
import Router from 'vue-router';
import ToDoList from './components/ToDoList.vue';
import TaskDetails from './components/TaskDetails.vue';
import UserLogin from './components/UserLogin.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'login', component: UserLogin },
    { path: '/user/:userId', name: 'toDoList', component: ToDoList, props: true },
    { path: '/task/:index', name: 'taskDetails', component: TaskDetails, props: true }
  ]
});
