<template>
  <div id="app">
    <NavigationBar></NavigationBar>
    <div class="page sm:p-6">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'

export default {
  name: 'App',
  components: {
    NavigationBar
  }
}
</script>

<style>
.page {
  max-width: 1000px;
  @apply mx-auto mt-12;
}
</style>
