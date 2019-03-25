// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import { Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from './store'
import chain from './chain'
import VueI18n from "vue-i18n";
import en from "./assets/lang/en";
import zh from "./assets/lang/zh";

// todo
// cssVars()

Vue.use(BootstrapVue)
Vue.use(VueI18n);
Vue.prototype.$message = Message;
Vue.prototype.chain = chain;

const i18n = new VueI18n({
  locale: "en", // 语言标识
  messages: {
    zh: zh,
    en: en
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  router,
  template: '<App/>',
  components: {
    App
  }
})
