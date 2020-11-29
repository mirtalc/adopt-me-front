<template>
  <router-link
    :to="{ name: routeName }"
    :class="{ separated: shouldBeSeparated }"
  >
    <li :class="linkClasses">
      <img
        v-if="visibleLogo"
        class="logo"
        src="../assets/img/logo.png"
        alt=""
      />
      <span v-if="visibleText">{{ text }}</span>
    </li>
  </router-link>
</template>

<script>
import { routesInfo } from '@/constants/routesInfo'
export default {
  name: 'NavigationLink',
  props: {
    text: {
      type: String,
      required: false
    },
    routeName: {
      type: String,
      required: true
    }
  },
  computed: {
    visibleLogo() {
      return this.routeName === routesInfo.home.name
    },
    visibleText() {
      return this.routeName !== routesInfo.home.name
    },
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
        'px-3 hover:bg-gray-600': true,
        'py-1': this.visibleLogo,
        'py-3': !this.visibleLogo,
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
  background-color: tomato;
  color: whitesmoke;
}
</style>
