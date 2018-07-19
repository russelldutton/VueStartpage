// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Settings from '@/components/Settings'
import Storage from 'vue-ls'
import './assets/palette.sass'
import bookmarks from './assets/bm';
import iconbar from './assets/ib';

Vue.config.productionTip = false

const options = {
    namespace: 'startpage_',
    name: 'ls',
    storage: 'local'
};

Vue.use(Storage, options);
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/settings',
        component: Settings
    }
]

const router = new VueRouter({routes})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
    created() {
        if (this.$ls.get('bookmarks').bookmarks == undefined)
            this.$ls.set('bookmarks', bookmarks);
        if (this.$ls.get('iconbar').iconbar == undefined)
            this.$ls.set('iconbar', iconbar);
    }
})
