<template>
  <div>
    lala
  </div>
</template>

<script>
import { routesInfo } from '../constants/routesInfo'
import authUtils from '../infrastructure/authentication'

export default {
  created() {
    this.$store.dispatch('userLogout').then(() => {
      this.$router.push({ name: routesInfo.login.name })
    })
    authUtils.deleteTokens()
  }
}
</script>

<style></style>
