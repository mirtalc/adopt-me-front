<template>
  <div class="navbar">
    <ul>
      <router-link :to="{ name: 'home' }"><li>Home</li></router-link>
      <router-link :to="{ name: 'animals' }"><li>Animals</li></router-link>
      <router-link :to="{ name: 'logout' }" v-if="!!accessToken">
        <li>Logout</li>
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

<style>
.navbar {
  background-color: #fca311;
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid black;
}
a {
  text-decoration: none;
  color: inherit;
}
li {
  display: inline-block;
  border-right: 1px solid black;
  padding: 1rem;
}
</style>
