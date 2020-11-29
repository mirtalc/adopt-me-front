<template>
  <div>
    lala
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { routesInfo } from '@/constants/routesInfo'

export default {
  methods: {
    ...mapActions({
      userLogout: 'userLogout'
    })
  },
  created() {
    this.userLogout().then(() => {
      this.$toast.default('Bye-bye!', { position: 'bottom' })
      this.$router.push({ name: routesInfo.login.name })
    })
  }
}
</script>

<style></style>
