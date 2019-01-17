<template>
    <label>
        {{ label }}
        <input type="text" :value="value" @input="handleValueChange" @change="handleValueChange">
        <div>
            <button v-for="suggestion in suggestions"
                    :key="suggestion"
                    @click="emitChange(suggestion)">
                {{ suggestion }}
            </button>
        </div>
    </label>
</template>

<script>
export default {
  name: 'AutocompleteInput',
  props: {
    label: String,
    value: String,
    dataset: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data: function() {
    return {
      suggestions: [],
    }
  },
  watch: {
    value: function(val) {
      const value = val.toLowerCase();
      this.suggestions = this.dataset.filter(item =>
        item.toLowerCase().startsWith(value)
        && item.toLowerCase() !== value
      ).slice(0, 10);
    }
  },
  methods: {
    handleValueChange(event) {
      this.emitChange(event.target.value);
    },
    emitChange(value) {
      this.$emit('change', value);
    }
  },
}
</script>

<style scoped>
    label {
        display: flex;
        flex-direction: column;
    }
</style>
