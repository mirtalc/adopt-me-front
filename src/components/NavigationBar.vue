<template>
  <div class="w-full bg-indigo-900 text-gray-400">
    <ul class="flex">
      <!-- //TODO v-for! -->
      <NavigationLink
        v-if="isLogged"
        :text="routesInfo.home.text"
        :route-name="routesInfo.home.name"
      />
      <NavigationLink
        v-if="isLogged"
        :text="routesInfo.animals.text"
        :route-name="routesInfo.animals.name"
      />
      <NavigationLink
        v-if="isLogged"
        :text="routesInfo.logout.text"
        :route-name="routesInfo.logout.name"
      />
      <NavigationLink
        v-if="!isLogged"
        :text="routesInfo.login.text"
        :route-name="routesInfo.login.name"
      />
      <NavigationLink
        v-if="!isLogged"
        :text="routesInfo.register.text"
        :route-name="routesInfo.register.name"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { routesInfo } from '@/constants/routesInfo'
import NavigationLink from '@/components/NavigationLink'

export default {
  name: 'NavigationBar',
  data: () => ({
    routesInfo
  }),
  computed: {
    ...mapGetters({
      isLogged: 'isLogged'
    })
  },
  components: { NavigationLink }
}
</script>

<style></style>
