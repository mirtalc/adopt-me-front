<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #e5e5e5;
}
</style>
