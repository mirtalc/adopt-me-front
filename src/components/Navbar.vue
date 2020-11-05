<template>
  <div class="w-full bg-indigo-900 text-gray-400">
    <ul class="flex">
      <router-link :to="{ name: routesInfo.home.name }">
        <li class="p-3 hover:bg-gray-600">{{ routesInfo.home.text }}</li>
      </router-link>
      <router-link :to="{ name: routesInfo.animals.name }">
        <li class="p-3 hover:bg-gray-600">{{ routesInfo.animals.text }}</li>
      </router-link>
      <router-link :to="{ name: routesInfo.logout.name }" v-if="!!accessToken" class="ml-auto">
        <li class="p-3 hover:bg-gray-600">{{ routesInfo.logout.text }}</li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { routesInfo } from "../constants/routesInfo"

export default {
  name: "Navbar",
  data: () => ({
    routesInfo,
  }),
  computed: mapState(["accessToken"]),
}
</script>

<style></style>
