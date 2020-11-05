<template>
  <div class="squared-container sm:max-w-xl sm:mx-auto my-8 sm:my-16">
    <p>Welcome back! <span class="ml-4">\(ᵔᵕᵔ)/</span></p>
    <p>Please, enter your credentials.</p>

    <form @submit.prevent="checkAndLogin" class="centered-container">
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
        Log me in!
      </button>
      <div v-show="shouldShowErrors" class="error-message mt-4">
        <ul>
          <li v-for="inputError in inputErrors" :key="inputError.id">
            — {{ inputError }}
          </li>
        </ul>
        <p v-show="loginError">{{ loginError }}</p>
      </div>
      <div class="mt-20 secondary">
        Still not a member? You can register
        <router-link :to="{ name: routesInfo.register.name }">
          <span class="underline font-bold">here</span>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { routesInfo } from '../constants/routesInfo'

export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    inputErrors: [],
    loginError: null,
    routesInfo
  }),
  computed: {
    hasInputErrors() {
      return this.inputErrors.length > 0
    },
    shouldShowErrors() {
      return this.hasInputErrors || this.loginError
    }
  },
  methods: {
    checkAndLogin() {
      this.checkValues()
      if (!this.hasInputErrors) this.login()
    },
    checkValues() {
      this.inputErrors = []
      if (!this.username)
        this.inputErrors.push('Username field may not be empty')
      if (!this.password)
        this.inputErrors.push('Password field may not be empty')
    },
    login() {
      this.$store
        .dispatch('userLogin', {
          username: this.username,
          password: this.password
        })
        .then(() => this.processLoginOk())
        .catch(error => this.processLoginError(error))
    },
    processLoginOk() {
      this.$router.push({ name: routesInfo.animals.name })
    },
    processLoginError(error) {
      let error_code = error.response.data.error_code
      if (error_code == 'no_active_account') {
        this.loginError = 'Error: Incorrect user or password'
      } else {
        this.loginError =
          'Unknown error; please try again later. More info at Console.'
      }
      console.warn('Error while logging in: ', error)
    }
  }
}
</script>

<style scoped lang="postcss">
.field {
  @apply p-4 inline-block;
}
</style>
