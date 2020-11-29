<template>
  <button class="btn" @click="clickEmitter()">{{ text }}</button>
</template>

<script>
export default {
  name: 'SmallButton',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    clickEmitter() {
      this.$emit('clickEvent')
    }
  }
}
</script>

<style></style>
