<template>
    <label>
        {{ label }}
        <input type="text" :name="name" :value="value" @change="emitChange" :disabled="disabled">
    </label>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: [String, Number],
    name: String,
    label: String,
    disabled: Boolean,
  },
  methods: {
    emitChange(event) {
      this.$emit('change', event.target.value);
    }
  }
}
</script>
