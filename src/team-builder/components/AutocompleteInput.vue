<template>
    <label>
        {{ label }}
        <input type="text" v-model="value" @focus="inputFocused">
        <div v-if="isFocused">
            <button v-for="suggestion in suggestions"
                    :key="suggestion"
                    @click="useSuggestion(suggestion)">
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
    initialValue: String,
    dataset: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data: function() {
    return {
      isFocused: false,
      value: this.initialValue,
    }
  },
  computed: {
    suggestions() {
      return this.dataset.filter(item =>
        item.toLowerCase().startsWith(this.value.toLowerCase())
        && item.toLowerCase() !== this.value.toLowerCase()
      ).slice(0, 10);
    }
  },
  methods: {
    useSuggestion(suggestion) {
      this.value = suggestion;
      this.emitChange();
    },
    inputFocused() {
      this.isFocused = true;
    },
    emitChange() {
      this.$emit('change', this.value);
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
