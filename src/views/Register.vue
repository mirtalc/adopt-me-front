<template>
  <div class="squared-container sm:max-w-xl sm:rounded-2xl">
    <p class="subtitle">Welcome to our web!<span class="ml-4"> ♥‿♥ </span></p>
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
        :inputType="'password'"
        :value="password"
        :labelText="'Password'"
        @inputEvent="handleChange($event)"
      />
      <button type="submit" class="big-button hover:bg-teal-500">
        Create my user!
      </button>
      <FormErrors :input-errors="inputErrors" :submitError="registerError" />
      <div class="mt-20 text-gray-600">
        Already a member? You can log in
        <InlineLink :routeName="routesInfo.login.name" :text="'here'" />
      </div>
    </form>
  </div>
</template>

<script>
import InlineLink from '@/components/InlineLink'
import TextInput from '@/components/basic/TextInput'
import FormErrors from '@/components/FormErrors'
import { routesInfo } from '@/constants/routesInfo'
import { mapActions } from 'vuex'

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
    ...mapActions({
      userRegister: 'userRegister'
    }),
    handleChange(payload) {
      this[payload.targetName] = payload.targetValue
    },
    cleanErrors() {
      this.inputErrors = []
      this.loginError = null
    },
    checkAndRegister() {
      this.checkValues()
      this.hasInputErrors
        ? this.$toast.error('Oops. Please, correct the mistakes below')
        : this.register()
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
      this.userRegister({
        username: this.username,
        password: this.password
      })
        .then(() => this.processRegisterOk())
        .catch(error => this.processRegisterError(error))
    },
    processRegisterOk() {
      this.$toast.success('Success! You can log in now')
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

.squared-container {
  @apply bg-teal-200;
}

button {
  @apply bg-teal-400;
}
</style>
