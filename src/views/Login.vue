<template>
  <div
    class="sm:max-w-xl sm:mx-auto sm:my-16 bg-indigo-300 border rounded-lg p-8 text-gray-800"
  >
    <p class="pl-6">
      Welcome! <br />
      Please, enter your credentials.
    </p>

    <form v-on:submit.prevent="login" class="m-auto text-center mt-8">
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
      <div>
        <button
          type="submit"
          class="bg-indigo-400 hover:bg-indigo-500 py-4 w-full mt-8 text-xl rounded-lg"
        >
          Log me in!
        </button>
      </div>
    </form>
    <p v-if="incorrectCredentials" class="text-red-500">
      Error logging in. Please, check your user and password!
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      incorrectCredentials: false,
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("userLogin", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "animals" });
        })
        .catch((error) => {
          console.warn(error);
          this.incorrectCredentials = true;
        });
    },
  },
};
</script>

<style scoped lang="postcss">
.field {
  @apply p-4 inline-block;
}

label {
  @apply min-w-32 inline-block;
}

input {
  @apply w-48 rounded bg-blue-100;
}
</style>
