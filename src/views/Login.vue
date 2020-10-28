<template>
  <div>
    <p class="py-5">Sign in :)</p>

    <form v-on:submit.prevent="login">
      <div class="form-group">
        <input type="text" name="username" id="user" v-model="username" />
      </div>
      <div class="form-group">
        <input type="password" name="password" id="pass" v-model="password" />
      </div>
      <button type="submit">Login</button>
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

<style scoped>
.form-group {
  border: 1px solid black;
  padding: 10px;
}

button {
  /** */
}
</style>
