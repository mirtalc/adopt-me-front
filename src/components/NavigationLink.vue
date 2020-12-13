<template>
  <router-link
    :to="{ name: routeName }"
    :class="{ separated: shouldBeSeparated }"
  >
    <li :class="linkClasses">
      <img
        v-if="visibleLogo"
        class="logo"
        :src="require(`@/assets/img/${imgSrc}`)"
        alt=""
      />
      <span v-if="visibleText">{{ text }}</span>
    </li>
  </router-link>
</template>

<script>
import {
  iconRelation,
  sectionsWithIcon,
  separatedSections
} from '@/constants/navbarSettings'

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
    imgSrc() {
      return iconRelation[this.routeName]
    },
    visibleLogo() {
      return sectionsWithIcon.includes(this.routeName)
    },
    visibleText() {
      return !this.visibleLogo
    },
    currentRouteName() {
      return this.$route.name
    },
    shouldBeSeparated() {
      return separatedSections.includes(this.routeName)
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
