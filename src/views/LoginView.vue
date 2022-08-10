<template>
  <section class="login-grid">
    <div class="login-inputs">
      <div class="inputs-section">
        <div>User name:</div>
        <input type="text">

        <div>Password:</div>
        <input type="text">
      </div>
      <div class="buttons-section">
        <button @click="startLogin">Login!</button>
      </div>
    </div>
  </section>
</template>

<script>
// TODO: FIX THIS LATER
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      inputs: {
        user: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions([
      'login'
    ]),
    startLogin () {
      this.$store.dispatch('login')
      // fetch('http://localhost:8081/api/members',
      //   {
      //     Accept: 'application/json',
      //     method: 'POST',
      //     'Content-Type': 'application/json'
      //   }
      // )
      //   .then(response => response.json())
      //   .then((response) => {
      //     this.$store.commit('auth/SET_ACCESS_TOKEN', 10)
      //   })
    }
  }
}
</script>

<style>
  .login-grid {
    display: grid;
    justify-items: center;
    align-items: center;
    padding-top: 50px;
  }

  .login-inputs {
    height: 600px;
    width: 300px;
    border-radius: 1px solid;
    background-color: rgba(25, 40, 231, .40)
  }

  .inputs-section {
    padding-top: 200px;
  }

  .buttons-section {
    padding-top: 100px;
  }
</style>
