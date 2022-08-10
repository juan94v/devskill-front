import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  methods: {
    login () {
      const data = {
        username: 'sarah',
        password: 'connor'
      }

      fetch('http://localhost:8081/auth', {
        Accept: 'application/json',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(response => store.commit('setToken', response.token))
        .catch(error => console.error('Auth error:', error))
    }
  },
  created () {
    this.login()
  },
  render: h => h(App)
}).$mount('#app')
