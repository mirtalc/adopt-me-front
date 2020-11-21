<template>
  <router-link
    :to="{ name: routeName }"
    :class="{ separated: shouldBeSeparated }"
  >
    <li :class="linkClasses">{{ text }}</li>
  </router-link>
</template>

<script>
import { routesInfo } from '../constants/routesInfo'
export default {
  name: 'NavigationLink',
  props: {
    text: {
      type: String,
      required: true
    },
    routeName: {
      type: String,
      required: true
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    },
    shouldBeSeparated() {
      //TODO export to constant
      const separatedOptions = [
        routesInfo.logout.name,
        routesInfo.register.name
      ]
      return separatedOptions.includes(this.routeName)
    },
    isCurrentSection() {
      return this.routeName === this.currentRouteName
    },
    linkClasses() {
      return {
        'p-3 hover:bg-gray-600': true,
        active: this.isCurrentSection
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.separated {
  @apply ml-auto;
}
.active {
  @apply bg-gray-600;
}
</style>
