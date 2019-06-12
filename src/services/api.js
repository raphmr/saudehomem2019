export const getExames = async () => {
    //return fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
    //return fetch('http://10.197.9.209:3000/api/exames')
    return fetch('https://5cf05f1e5660c40014949881.mockapi.io/api/exames')
      .then((response) => response.json());
}