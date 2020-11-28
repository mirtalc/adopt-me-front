<template>
  <div class="text-center bg-red-200 p-4 m-4 border-2 border-red-500 rounded">
    {{ text }}
    <div class="flex justify-center p-2 mt-2">
      <button class="btn" @click="cancelEmitter()">Cancel</button>
      <button class="btn" @click="confirmEmitter()">Confirm</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationWarning',
  props: {
    text: {
      type: String,
      default: 'Are you sure you want to proceed?'
    }
  },
  methods: {
    cancelEmitter() {
      this.$emit('cancelEvent')
    },
    confirmEmitter() {
      this.$emit('confirmEvent')
    }
  }
}
</script>

<style></style>
