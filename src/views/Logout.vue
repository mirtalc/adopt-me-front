<template>
  <div>
    lala
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { routesInfo } from '../constants/routesInfo'
import authUtils from '../infrastructure/authUtils'

export default {
  methods: {
    ...mapActions({
      userLogout: 'userLogout'
    })
  },
  created() {
    this.userLogout().then(() => {
      this.$router.push({ name: routesInfo.login.name })
    })
    authUtils.deleteTokens()
  }
}
</script>

<style></style>
