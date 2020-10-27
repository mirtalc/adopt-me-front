<template>
  <div>
    lala
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("userLogout").then(() => {
      this.$router.push({ name: "login" });
    });
  },
};
</script>

<style></style>
