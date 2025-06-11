import Vue from 'vue'
import VueI18n from 'vue-i18n'
import de from './locales/de'
import en from './locales/en'
import es from './locales/es'
import fr from './locales/fr'
import pt from './locales/pt'
import ru from './locales/ru'

Vue.use(VueI18n)

const messages = {
  de,
  en,
  es,
  fr,
  pt,
  ru

}

const i18n = new VueI18n({
  locale: 'en', // language by default
  fallbackLocale: 'en',
  messages
})

export default i18n
