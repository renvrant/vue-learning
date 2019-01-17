import Vue from 'vue';
import Vuex from 'vuex';

import {initialPokemonState, initialStoreState} from '../object-factories.logic';
import {getPokemonFromApi, loadIndividualPokemon} from '../services/pokemon.api';
import {TeamBuilderKeys} from './keys';


Vue.use(Vuex);

export const teamBuilderStoreModule = new Vuex.Store({
  state: initialStoreState(),
  mutations: {
    [TeamBuilderKeys.Mutations.LOAD_POKEMON](state, pokemonList) {
      state.pokemon = pokemonList;
    },
    [TeamBuilderKeys.Mutations.ADD_TO_TEAM](state, pokemon) {
      state.team.push(pokemon);
    },
    [TeamBuilderKeys.Mutations.UPDATE_FORM](state, formData) {
      console.log(formData);
      state.form = {
        ...state.form,
        ...formData,
      };
    },
  },
  actions: {
    [TeamBuilderKeys.Actions.LOAD_POKEMON]({state, commit}) {
      if (state.pokemon.length === 0) {
        getPokemonFromApi()
          .then(pokemon => commit('loadPokemon', pokemon))
          .catch(error => console.log(error));
      }
    },
    [TeamBuilderKeys.Actions.LOAD_POKEMON_INTO_FORM]({state, commit}) {
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
