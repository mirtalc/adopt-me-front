<template>
  <div class="text-field" :class="{ withLabels: !!labelText }">
    <label v-if="labelText" :for="name"> {{ labelText }} </label>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholderText"
      :value="value"
      @input="inputEmitter"
    />
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      required: true
    },
    labelText: {
      type: String,
      required: false
    },
    placeholderText: {
      type: String,
      required: false
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
