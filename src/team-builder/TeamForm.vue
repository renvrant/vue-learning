<template>
    <section>
        <h1>Team Form Will Go Here.</h1>
        <AutocompleteInput
                :dataset="pokemonList"
                label="Pokemon Name"
                :value="form.name"
                @change="updateName" />
        <TextInput label="nickname" name="nickname" :value="form.nickname" @change="updateNickname" />
        <TextInput label="id" name="id" :value="form.id" :disabled="true" />
        <TextInput label="Type1" name="type1" :value="form.type1" :disabled="true" />
        <TextInput label="Type2" name="id" :value="form.type2" :disabled="true" />
    </section>
</template>

<script>
    import AutocompleteInput from './components/AutocompleteInput';
    import TextInput from './components/TextInput';

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
        },
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
        updateNickname(nickname) {
          console.log(nickname);
          this.$store.commit('updateForm', {
            ...this.form,
            nickname,
          });
        },
        autofillForm() {
          if (this.form.url) {
            this.$store.dispatch('loadPokemonIntoForm');
          }
        }
      },
      components: {
        AutocompleteInput,
        TextInput,
      }
    }
</script>
