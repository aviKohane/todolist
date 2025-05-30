import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1976D2',
                error: '#f44336', // 👈 doit exister ici
                grey: '#9e9e9e',
            },
        },
    },
});
