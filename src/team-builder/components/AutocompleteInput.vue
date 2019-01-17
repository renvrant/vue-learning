<template>
    <label>
        {{ label }}
        <input type="text" v-model="value" @focus="inputFocused" @blur="inputBlurred">
        <div v-if="inputFocused">
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
      return this.dataset.filter(item => item.toLowerCase().startsWith(this.value)).slice(0, 10);
    }
  },
  methods: {
    useSuggestion(suggestion) {
      this.value = suggestion;
      this.$emit('change', this.value);
    },
    inputFocused() {
      this.inputFocused = true;
    },
    inputBlurred() {
      this.inputFocused = false;
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
