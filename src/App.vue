<template>
  <v-app :class="['app-wrapper', routeClass]">
    <div class="top-bar">
      <div class="btn-wrapper" v-if="showLogout">
        <v-btn class="top-btn" color="white" @click="logout">
          <v-icon left color="primary">mdi-logout</v-icon>
          {{ $t('logout') }}
        </v-btn>
      </div>
      <v-spacer />
      <div class="select-wrapper">
        <v-select v-model="currentLang" :items="languages" item-text="label" item-value="code" hide-details dense
          outlined background-color="white" @change="switchLanguage">
          <template v-slot:item="data">
            <div class="d-flex align-center">
              <img :src="data.item.flag" alt="flag" width="20" class="mr-2" />
              <span>{{ data.item.label }}</span>
            </div>
          </template>
          <template v-slot:selection="data">
            <div class="d-flex align-center">
              <img :src="data.item.flag" alt="flag" width="20" class="mr-2" />
              <span>{{ data.item.label }}</span>
            </div>
          </template>
        </v-select>
      </div>
    </div>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentLang: 'en',
      languages: [
        { label: 'English', code: 'en', flag: 'https://flagcdn.com/w40/gb.png' },
        { label: 'Français', code: 'fr', flag: 'https://flagcdn.com/w40/fr.png' },
        { label: 'Español', code: 'es', flag: 'https://flagcdn.com/w40/es.png' },
        { label: 'Português', code: 'pt', flag: 'https://flagcdn.com/w40/pt.png' },
        { label: 'Русский', code: 'ru', flag: 'https://flagcdn.com/w40/ru.png' },
        { label: 'Deutsch', code: 'de', flag: 'https://flagcdn.com/w40/de.png' }
      ]



    }
  },
  computed: {
    showLogout() {
      return this.$route.name !== 'login';
    },
    routeClass() {
      switch (this.$route.name) {
        case 'login':
          return 'login-theme';
        case 'toDoList':
          return 'todo-theme';
        case 'taskDetails':
          return 'details-theme';
        default:
          return '';
      }
    }

  },
  created() {
    const savedLang = JSON.parse(localStorage.getItem("currentUserLanguage") || 'en');
    this.currentLang = savedLang;
    this.$i18n.locale = savedLang;
  },
  methods: {
    switchLanguage(lang) {
      this.$i18n.locale = lang;
      this.currentLang = lang;
      this.$store.commit("setCurrentLanguage", lang)
    },
    logout() {
      this.$store.commit("setCurrentUser", null);
      this.$router.push('/');

    }
  }
};
</script>

<style>
.app-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

* {
  word-break: normal;
  overflow-wrap: anywhere;
}

.app-wrapper.login-theme {
  background-color: #1976d2 !important;
}

.app-wrapper.todo-theme {
  background-color: #ffffff;
}

.app-wrapper.details-theme {
  background-color: #1976d2 !important;
}

.top-bar {
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 10px;
}

.btn-wrapper,
.select-wrapper {
  width: 250px;
}

.top-btn {
  width: 100%;
  height: 40px;
  font-weight: bold;
}

.select-wrapper .v-select {
  width: 100%;
}

.select-wrapper .v-input__control {
  height: 40px;
  min-height: 40px;
}
</style>
