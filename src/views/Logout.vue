<template>
  <div>
    lala
  </div>
</template>

<script>
import routesInfo from '../constants/routesInfo'
export default {
  created() {
    this.$store.dispatch("userLogout").then(() => {
      this.$router.push({ name: routesInfo.login.name });
    });
  },
};
</script>

<style></style>
