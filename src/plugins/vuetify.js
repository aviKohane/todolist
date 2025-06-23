import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

// Ajout des locales Vuetify
import en from 'vuetify/es5/locale/en'
import fr from 'vuetify/es5/locale/fr'
import es from 'vuetify/es5/locale/es'
import pt from 'vuetify/es5/locale/pt'
import de from 'vuetify/es5/locale/de'
import ru from 'vuetify/es5/locale/ru'
import he from 'vuetify/es5/locale/he'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        error: '#f44336',
        grey: '#9e9e9e',
      },
    },
  },
  lang: {
    locales: { en, fr, es, pt, de, ru, he },
    current: 'en', // sera automatiquement mis à jour dynamiquement
  }
})
