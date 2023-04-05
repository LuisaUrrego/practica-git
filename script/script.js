const URL_POKE = "https://pokeapi.co/api/v2/pokemon";
let pokedex = [];

const getPokeApi = async (url) => {
    try {
        const { data } = await axios.get(url);
        return data.results;

    } catch (error) {
        console.log(error);
        alert('Usuario, ocurrio un error');
        return [];

    }
};


document.addEventListener('DOMContentLoaded', async () => {
    pokedex = await getPokeApi(URL_POKE);
    console.log(pokedex);
})

