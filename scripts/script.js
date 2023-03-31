
const getPokemon = async (url) => {
    const { data } = await axios.get(url);
    console.log("api pokemons", data)
    return data;
    }
getPokemon ("https://pokeapi.co/api/v2/pokemon/ditto")