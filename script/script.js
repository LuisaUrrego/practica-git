let pokedex = [];
let allInfoPokedex = [];

const URL_POKE = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0";


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

const getAllInfoPokedex = async(url) => {
    const allInfoPokedex = []
    try {
        const { data } = await axios.get(url); 

        for (const pokedex of data.results) {
            const urlPokedex = pokedex.url;
            const response = await axios.get(urlPokedex);
            const pokemon = {
                id: response.data.id,
                name: response.data.name,
                abilities: response.data.abilities.map(item=> item.ability.name),
                image: response.data.sprites.front_default,
                height: response.data.height
            };
            allInfoPokedex.push(pokemon);   
        }
        return allInfoPokedex;
    } catch (error) {
        console.log(error);
        return []
        
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    pokedex = await getPokeApi(URL_POKE);
    console.log(pokedex);

    const allinfo = await getAllInfoPokedex(URL_POKE);
    console.log(allinfo);
})

