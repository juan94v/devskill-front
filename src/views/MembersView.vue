<template>
  <section>
    <section class="header-grid">
      <div class="Home">
        Home
      </div>
      <div class="other">
        Other
      </div>
    </section>
    <section class="body-grid">
      <section class="form-grid">
        <div>First Name:</div>
        <input type="text" v-model="inputs.firstName">

        <div>Last Name:</div>
        <input type="text" v-model="inputs.lastName">

        <div>Address:</div>
        <input type="text" v-model="inputs.address">

        <div>SSN:</div>
        <input type="text" v-model="inputs.ssn">

        <section class="form-button-section">
          <div>
            <button class="btn" @click="reset">Reset</button>
          </div>
          <div>
            <button :disabled="disabledButton" class="btn" @click="save">Save</button>
          </div>
        </section>
      </section>
      <section class="table-grid">
        <table>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Address</th>
            <th>SSN</th>
          </tr>
          <tr v-for="(item, index) in members" :key="index">
            <td>{{ item.firstName }}</td>
            <td>{{ item.lastName }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.ssn }}</td>
          </tr>
        </table>
      </section>
    </section>
    <p>{{ error }}</p>
  </section>
</template>

<script>
import store from '@/store/index.js'

export default {
  data () {
    return {
      inputs: {
        firstName: '',
        lastName: '',
        address: '',
        ssn: ''
      },
      error: '',
      members: []
    }
  },

  computed: {
    disabledButton () {
      return this.inputs.firstName.length < 1 ||
        this.inputs.lastName.length < 1 ||
        this.inputs.address.length < 1
    }
  },

  created () {
    const token = store.state.token
    fetch('http://localhost:8081/api/members',
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: new Headers({
          Authorization: `Bearer ${token}`
        })
      }
    )
      .then(response => response.json())
      .then((response) => {
        // fix this
        this.members.push({ ...response[0] })
      })
  },

  methods: {
    save () {
      const { ssn } = this.inputs
      const ssnIsUnique = this.validateSsnAsUnique(ssn)
      this.error = ''

      if (ssnIsUnique === undefined) {
        this.trimmerData()
        this.members.push({ ...this.inputs })
      } else {
        this.error = 'ssn must be unique'
      }
    },
    reset () {
      Object.keys(this.inputs).forEach(key => {
        this.inputs[key] = ''
      })
    },
    validateSsnAsUnique (ssn) {
      return this.members.find(member => member.ssn === ssn)
    },
    trimmerData () {
      const { ssn, ...trimmable } = this.inputs

      Object.keys(trimmable).forEach(input => {
        this.inputs[input] = this.inputs[input].trim()
      })

      console.log(this.inputs)
    }
  }
}
</script>

<style>
  p {
    align-items: center;
    justify-content: center;
    color: red;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  .header-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .body-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 500px;
    gap: 15px;
    border: 1px solid;
    margin: 40px 100px 40px 100px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 70px 1fr;
    grid-template-rows: repeat(5, 1fr);
    align-items: center;
  }

  .form-button-section {
    height: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 20px;
    grid-row: 5 / 6;
    grid-column: 2 / 3;
  }

  .btn {
    width: 50px;
    height: 50px;
    border-radius: 40px;
  }
</style>
