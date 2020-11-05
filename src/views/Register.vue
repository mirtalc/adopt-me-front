<template>
  <div class="squared-container sm:max-w-xl sm:mx-auto my-8 sm:my-16">
    <p>Welcome to our web!<span class="ml-4"> ♥‿♥ </span></p>
    <p>Please, fill in these fields in order to create a new user.</p>

    <form @submit.prevent="checkAndRegister" class="centered-container">
      <div class="field">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" v-model="username" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
        />
      </div>
      <button type="submit" class="big-button hover:bg-indigo-500">
        Create my user!
      </button>
      <div v-show="shouldShowErrors" class="error-message mt-4">
        <ul>
          <li v-for="inputError in inputErrors" :key="inputError.id">
            — {{ inputError }}
          </li>
        </ul>
        <p v-show="registerError">{{ registerError }}</p>
      </div>
      <div class="mt-20 secondary">
        Already a member? You can log in
        <router-link :to="{ name: routesInfo.login.name }">
          <span class="underline font-bold">here</span>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import routesInfo from '../constants/routesInfo'
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      inputErrors: [],
      registerError: null,
      routesInfo
    }
  },
  computed: {
    hasInputErrors: function() {
      return this.inputErrors.length > 0
    },
    shouldShowErrors: function() {
      return this.hasInputErrors || this.registerError
    }
  },
  methods: {
    checkAndRegister() {
      this.inputErrors = []
      this.registerError = null
      this.checkValues()
      if (!this.hasInputErrors) this.register()
    },
    checkValues() {
      if (!this.username)
        this.inputErrors.push('Username field may not be empty')
      if (!this.password) {
        this.inputErrors.push('Password field may not be empty')
      } else if (this.password.length < 3) {
        this.inputErrors.push('Password must be at least 3 characters long')
      }
    },
    register() {
      this.$store
        .dispatch('userRegister', {
          username: this.username,
          password: this.password
        })
        .then(() => this.processRegisterOk())
        .catch(error => this.processRegisterError(error))
    },
    processRegisterOk() {
      alert(
        "Success! New user registered. You'll be redirected to our login page."
      )
      this.$router.push({ name: routesInfo.login.name })
    },
    processRegisterError(error) {
      let user_exists_error = 'A user with that username already exists'
      let error_string = JSON.stringify(error.response.data)
      if (error_string.includes(user_exists_error)) {
        this.registerError = `Error: ${user_exists_error}. Try another one!`
      } else {
        this.registerError =
          'Unknown error; please try again later. More info at Console.'
      }
      console.warn('Error while registering user: ', error)
    }
  }
}
</script>

<style scoped lang="postcss">
.field {
  @apply p-4 inline-block;
}
</style>
