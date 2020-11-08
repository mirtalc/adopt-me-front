<template>
  <div v-show="shouldShowErrors" class="error-message mt-4">
    <ul>
      <li v-for="inputError in inputErrors" :key="inputError.id">
        — {{ inputError }}
      </li>
    </ul>
    <p v-show="submitError">{{ submitError }}</p>
  </div>
</template>

<script>
export default {
  name: 'FormErrors',
  props: {
    inputErrors: {
      type: Array,
      default: () => []
    },
    submitError: {
      type: String,
      required: false
    }
  },
  computed: {
    hasInputErrors() {
      return this.inputErrors.length > 0
    },
    shouldShowErrors() {
      return this.hasInputErrors || this.submitError
    }
  }
}
</script>

<style></style>
