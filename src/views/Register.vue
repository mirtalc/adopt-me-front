<template>
  <div class="squared-container sm:max-w-xl sm:mx-auto sm:my-16 sm:rounded-2xl">
    <p class="title">Welcome to our web!<span class="ml-4"> ♥‿♥ </span></p>
    <p>Please, fill in these fields in order to create a new user.</p>

    <form @submit.prevent="checkAndRegister" class="centered-container">
      <TextInput
        :name="'username'"
        :value="username"
        :labelText="'Username'"
        @inputEvent="handleChange($event)"
      />
      <TextInput
        :name="'password'"
        :type="'password'"
        :value="password"
        :labelText="'Password'"
        @inputEvent="handleChange($event)"
      />
      <button type="submit" class="big-button hover:bg-indigo-500">
        Create my user!
      </button>
      <FormErrors :input-errors="inputErrors" :submitError="registerError" />
      <div class="mt-20 secondary">
        Already a member? You can log in
        <InlineLink :routeName="routesInfo.login.name" :text="'here'" />
      </div>
    </form>
  </div>
</template>

<script>
import InlineLink from '../components/InlineLink'
import TextInput from '../components/TextInput'
import FormErrors from '../components/FormErrors'
import { routesInfo } from '../constants/routesInfo'

export default {
  name: 'Register',
  components: {
    InlineLink,
    TextInput,
    FormErrors
  },
  data: () => ({
    username: '',
    password: '',
    inputErrors: [],
    registerError: null,
    routesInfo
  }),
  computed: {
    hasInputErrors() {
      return !!this.inputErrors.length
    }
  },
  methods: {
    handleChange(payload) {
      this[payload.targetName] = payload.targetValue
    },
    cleanErrors() {
      this.inputErrors = []
      this.loginError = null
    },
    checkAndRegister() {
      this.checkValues()
      if (!this.hasInputErrors) this.register()
    },
    checkValues() {
      this.cleanErrors()
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
      this.redirectToLogin()
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
    },
    redirectToLogin() {
      this.$router.push({ name: routesInfo.login.name })
    }
  }
}
</script>

<style scoped lang="postcss">
.field {
  @apply p-4 inline-block;
}
</style>
