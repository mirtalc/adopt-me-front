<template>
  <div class="w-full bg-indigo-900 text-gray-400">
    <ul class="flex">
      <NavigationLink
        :text="routesInfo.home.text"
        :route-name="routesInfo.home.name"
      />
      <NavigationLink
        :text="routesInfo.animals.text"
        :route-name="routesInfo.animals.name"
      />
      <NavigationLink
        v-if="!!accessToken"
        :text="routesInfo.logout.text"
        :route-name="routesInfo.logout.name"
      />
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { routesInfo } from '../constants/routesInfo'
import NavigationLink from './NavigationLink'

export default {
  name: 'NavigationBar',
  data: () => ({
    routesInfo
  }),
  computed: mapState(['accessToken']),
  components: { NavigationLink }
}
</script>

<style></style>
