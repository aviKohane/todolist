import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import en from 'vuetify/es5/locale/en'
import fr from 'vuetify/es5/locale/fr'
import es from 'vuetify/es5/locale/es'
import pt from 'vuetify/es5/locale/pt'
import de from 'vuetify/es5/locale/de'
import ru from 'vuetify/es5/locale/ru'
import he from 'vuetify/es5/locale/he'

Vue.use(Vuetify)

export default function createVuetify(isDarkMode = false, currentLang = 'en') {
  return new Vuetify({
    theme: {
      dark: isDarkMode,
      themes: {
        light: {
          primary: '#1976D2',
          error: '#f44336',
          grey: '#9e9e9e',
        },
        dark: {
          primary: '#2196F3',
          error: '#f44336',
          grey: '#9e9e9e',
          background: '#121212',
        }
      },
    },
    lang: {
      locales: { en, fr, es, pt, de, ru, he },
      current: currentLang,
    }
  })
}
// export default new Vuetify({
//   theme: {
//     dark: userPrefersDark, // Définit si le thème sombre est actif au démarrage
//     themes: {
//       light: {
//         primary: '#1976D2',
//         error: '#f44336',
//         grey: '#9e9e9e',
//       },
//       dark: {
//         primary: '#2196F3',
//         error: '#f44336',
//         grey: '#9e9e9e',
//         background: '#121212',
//       }
//     },
//   },
//   lang: {
//     locales: { en, fr, es, pt, de, ru, he },
//     current: 'en',
//   }
// })
