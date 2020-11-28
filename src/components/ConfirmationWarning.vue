<template>
  <div class="text-center bg-red-200 p-4 m-4 border-2 border-red-500 rounded">
    {{ text }}
    <div class="flex justify-center p-2 mt-2">
      <SmallButton :text="'Cancel'" @clickEvent="cancelEmitter()" />
      <SmallButton :text="'Confirm'" @clickEvent="confirmEmitter()" />
    </div>
  </div>
</template>

<script>
import SmallButton from '../components/SmallButton'
export default {
  name: 'ConfirmationWarning',
  components: {
    SmallButton
  },
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
