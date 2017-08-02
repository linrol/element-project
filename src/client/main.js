import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios';
import VueRouter from 'vue-router';
import Routers from './router';
import App from './app.vue'

Vue.config.debug = true
Vue.prototype.$http = axios;
Vue.use(VueRouter)
Vue.use(ElementUI)

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};

const router = new VueRouter(RouterConfig);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
