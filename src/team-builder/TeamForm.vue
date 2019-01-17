<template>
    <section>
        <h1>Team Form Will Go Here.</h1>
        <AutocompleteInput
                :dataset="pokemonList"
                label="Pokemon Name"
                :value="form.name"
                @change="updateName" />
    </section>
</template>

<script>
    import AutocompleteInput from './components/AutocompleteInput';
    import { TeamBuilderKeys } from './store/keys';
    import {initialPokemonState} from './object-factories.logic';

    export default {
      name: 'TeamForm',
      mounted() {
        this.$store.dispatch('loadPokemon');
      },
      computed: {
        pokemonList() {
          return this.$store.getters.pokemonNames;
        },
        form() {
          return this.$store.getters.currentForm;
        }
      },
      methods: {
        updateName(name) {
          this.$store.commit('updateForm', {
            ...this.form,
            name: name,
            url: this.$store.getters.urlByName(name) || '',
          });

          this.autofillForm();
        },
        autofillForm() {
          if (this.form.url) {
            this.$store.dispatch('loadPokemonIntoForm');
          }
        }
      },
      components: {
        AutocompleteInput,
      }
    }
</script>
