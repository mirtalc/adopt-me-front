<template>
  <div class="text-field">
    <select :value="value" class="select" @input="inputEmitter" :name="name">
      <option disabled value="">{{ disabledText }}</option>
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.value"
        >{{ option.text }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    disabledText: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    inputEmitter(event) {
      const payload = {
        targetName: event.target.name,
        targetValue: event.target.value
      }
      this.$emit('inputEvent', payload)
    }
  }
}
</script>

<style>
.withLabels {
  @apply inline-block;
}
</style>
