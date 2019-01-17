import Vue from 'vue';
import Vuex from 'vuex';
import {getPokemonFromApi, loadIndividualPokemon} from '../team-builder/services/pokemon.api';

Vue.use(Vuex);

export const initialStoreState = () => ({
  pokemon: [],
  team: [],
  form: initialPokemonState(),
});

export const initialPokemonState = () => ({
  name: 'New Pokemon',
  nickname: '',
  id: null,
  type1: '',
  type2: '',
  url: '',
});

export const store = new Vuex.Store({
  state: initialStoreState(),
  mutations: {
    loadPokemon(state, pokemonList) {
      state.pokemon = pokemonList;
    },
    addToTeam(state, pokemon) {
      state.team.push(pokemon);
    },
    updateForm(state, formData) {
      console.log(formData);
      state.form = {
        ...state.form,
        ...formData,
      };
    },
  },
  actions: {
    loadPokemon({state, commit}) {
      if (state.pokemon.length === 0) {
        getPokemonFromApi()
          .then(pokemon => commit('loadPokemon', pokemon))
          .catch(error => console.log(error));
      }
    },
    loadPokemonIntoForm({state, commit}) {
      loadIndividualPokemon(state.form.url)
        .then(pokemon => commit('updateForm', pokemon))
        .catch(error => console.log(error));
    }
  },
  getters: {
    pokemonNames: state => state.pokemon.map(pokemon => pokemon.name),
    urlByName: state => name =>
      (state.pokemon.find(pokemon => pokemon.name === name) || initialPokemonState()).url,
    currentForm: state => state.form,
  },
});
