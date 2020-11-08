<template>
  <router-link :to="{ name: routeName }">
    <span class="underline font-bold">{{ text }}</span>
  </router-link>
</template>

<script>
export default {
  name: 'InlineLink',
  props: {
    text: {
      type: String,
      required: true
    },
    routeName: {
      type: String,
      required: true
    }
  }
}
</script>
