<template>
  <div class="w-full bg-teal-800 text-gray-400">
    <ul class="flex">
      <router-link :to="{ name: 'home' }">
        <li class="p-3 hover:bg-gray-600">Home</li>
      </router-link>
      <router-link :to="{ name: 'animals' }">
        <li class="p-3 hover:bg-gray-600">Animals</li>
      </router-link>
      <router-link
        :to="{ name: 'logout' }"
        v-if="!!accessToken"
        class="ml-auto"
      >
        <li class="p-3 hover:bg-gray-600">Logout</li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Navbar",
  computed: mapState(["accessToken"]),
};
</script>

<style></style>
