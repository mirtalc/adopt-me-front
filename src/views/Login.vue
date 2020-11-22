<template>
  <div class="squared-container sm:max-w-xl sm:mx-auto sm:my-16 sm:rounded-2xl">
    <p class="title">Welcome back! <span class="ml-4">\(ᵔᵕᵔ)/</span></p>
    <p>Please, enter your credentials.</p>

    <form @submit.prevent="checkAndLogin" class="centered-container">
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
        Log me in!
      </button>
      <FormErrors :input-errors="inputErrors" :submitError="loginError" />
      <div class="mt-20 secondary">
        Still not a member? You can register
        <InlineLink :routeName="routesInfo.register.name" :text="'here'" />
      </div>
    </form>
  </div>
</template>

<script>
import InlineLink from '../components/InlineLink'
import TextInput from '../components/TextInput'
import FormErrors from '../components/FormErrors'
import { routesInfo } from '../constants/routesInfo'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  components: {
    InlineLink,
    TextInput,
    FormErrors
  },
  data: () => ({
    username: '',
    password: '',
    inputErrors: [],
    loginError: null,
    routesInfo
  }),
  computed: {
    ...mapState({
      accessToken: state => state.authentication.accessToken
    }),
    hasInputErrors() {
      return !!this.inputErrors.length
    }
  },
  methods: {
    ...mapActions({
      userLogin: 'userLogin'
    }),
    handleChange(payload) {
      this[payload.targetName] = payload.targetValue
    },
    cleanErrors() {
      this.inputErrors = []
      this.loginError = null
    },
    checkAndLogin() {
      this.checkValues()
      if (!this.hasInputErrors) this.login()
    },
    checkValues() {
      this.cleanErrors()
      this.inputErrors = []
      if (!this.username)
        this.inputErrors.push('Username field may not be empty')
      if (!this.password)
        this.inputErrors.push('Password field may not be empty')
    },
    login() {
      this.userLogin({
        username: this.username,
        password: this.password
      })
        .then(() => this.processLoginOk())
        .catch(error => this.processLoginError(error))
    },
    processLoginOk() {
      this.redirectToHome()
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
    },
    redirectToHome() {
      this.$router.push({ name: routesInfo.home.name })
    }
  }
}
</script>

<style scoped lang="postcss">
.field {
  @apply p-4 inline-block;
}
</style>
