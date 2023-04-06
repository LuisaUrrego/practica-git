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
                height: response.data.height,
                weight: response.data.weight,
                types: response.data.types.type,
                version_group_details:response.data.level_learned_at
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
    console.log(pokedex)


    const allInfo = await getAllInfoPokedex(URL_POKE);
    const numeroPokemon = document.getElementById("numero_pokemon");
    const weightPokemon = document.getElementById("weight_pokemon");
    const heightPokemon = document.getElementById("height_pokemon");
    const levelPokemon = document.getElementById("nivel_pokemon");
    const typePokemon = document.getElementById("tipo_pokemon");
    const habilidad_pokemon = document.getElementById("habilidad_pokemon");
    const imagen_pokemon = document.getElementById("pokeImagenes");
    const printPokemon = (tagIdPokemon, infoPokemon, tagHeightPokemon, tagWeightPokemon,tagTypePokemon, tagLevelPokemon, tagAbilitiesPokemon, tagImagesPokemon ) =>{
    tagIdPokemon.innerHTML= `${infoPokemon[0].id} `
    tagHeightPokemon.innerHTML= `${infoPokemon[0].height} m`
    tagWeightPokemon.innerHTML= `${infoPokemon[0].weight} `
    tagLevelPokemon.innerHTML= `${infoPokemon[0].version_group_details} `
    tagTypePokemon.innerHTML= `${infoPokemon[0].types}`
    tagAbilitiesPokemon.innerHTML= `${infoPokemon[0].abilities} `
    tagImagesPokemon.innerHTML= `${infoPokemon[0].image} `

    }
    printPokemon(numeroPokemon, allInfo, heightPokemon, weightPokemon, typePokemon, levelPokemon, habilidad_pokemon, imagen_pokemon);
})

