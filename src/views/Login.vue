<template>
  <div class="squared-container sm:max-w-xl sm:rounded-2xl">
    <p class="subtitle">Welcome back! <span class="ml-4">\(ᵔᵕᵔ)/</span></p>
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
        :inputType="'password'"
        :value="password"
        :labelText="'Password'"
        @inputEvent="handleChange($event)"
      />
      <button type="submit" class="big-button hover:bg-indigo-500">
        Log me in!
      </button>
      <FormErrors :input-errors="inputErrors" :submitError="loginError" />
      <div class="mt-20 text-gray-600">
        Still not a member? You can register
        <InlineLink :routeName="routesInfo.register.name" :text="'here'" />
      </div>
    </form>
  </div>
</template>

<script>
import InlineLink from '@/components/InlineLink'
import TextInput from '@/components/basic/TextInput'
import FormErrors from '@/components/FormErrors'
import { routesInfo } from '@/constants/routesInfo'
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
      this.hasInputErrors
        ? this.$toast.error('Oops. Please, correct the mistakes below')
        : this.login()
    },
    checkValues() {
      this.cleanErrors()
      this.inputErrors = []
      if (!this.username)
        this.inputErrors.push('Username field may not be empty')
      if (!this.password)
        this.inputErrors.push('Password field may not be empty')
    },
    async login() {
      try {
        await this.userLogin({
          username: this.username,
          password: this.password
        })
        this.handleLoginOk()
      } catch (error) {
        this.handleLoginError(error)
      }
    },
    handleLoginOk() {
      this.$toast.default('Welcome! ^^', { position: 'bottom' })
      this.redirectToHome()
    },
    handleLoginError(error) {
      const error_code = error.response.data.error_code
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
