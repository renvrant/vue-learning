export const initialStoreState = () => ({
  pokemon: [],
  teamPokemon: [],
  form: initialPokemonState(),
});

export const initialPokemonState = () => ({
  name: '',
  id: null,
  type1: '',
  type2: '',
  url: '',
});
