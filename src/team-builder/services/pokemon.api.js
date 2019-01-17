import axios from 'axios';

export function getPokemonFromApi() {
  return axios.get('https://pokeapi.co/api/v2/pokemon/', {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.data.results)
    .catch(error => error);
}

export function loadIndividualPokemon(url) {
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => transformIndividualPokemon(response.data))
    .catch(error => error);
}

function transformIndividualPokemon(pokemon) {
  return {
    id: pokemon.id,
    type1: typeNameBySlot(pokemon.types, 1),
    type2: typeNameBySlot(pokemon.types, 2)
  }
}

const typeNameBySlot = (typesArray, slot) => {
  if (typesArray.find(type => type.slot === slot)) {
    return typesArray.find(type => type.slot === slot).type.name;
  }
  return null;
}
