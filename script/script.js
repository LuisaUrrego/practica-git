
// let pokedex = [];
// let allInfoPokedex = [];
const URL_POKE = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0"




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



// // const getAllInfoPokedex = async(url) => {
//     const allInfoPokedex = []
//     try {
//         const { data } = await axios.get(url); 
//         //console.log(data.results)
//         for (const pokedex of data.results) {
//             const urlPokedex = pokedex.url;
//             const response = await axios.get(urlPokedex);
//             //console.log(response)
//             const pokemon = {
//                 id: response.data.id,
//                 name: response.data.name,
//                 abilities: response.data.abilities[0].ability.name,
//                 image: response.data.sprites.front_default,
//                 height: response.data.height,
//                 weight: response.data.weight,
//                 types: response.data.types.type,
//                 version_group_details:response.data.level_learned_at
//             };
//             allInfoPokedex.push(pokemon);  
            
//         }
//         return allInfoPokedex;
//     } catch (error) {
//         console.log(error);
//         return []
        
//     }
// }


document.addEventListener('DOMContentLoaded', async () => {
    pokedex = await getPokeApi(URL_POKE);
    //console.log(pokedex)
    

    const allInfo = await getAllInfoPokedex(URL_POKE);
    console.log(allInfo)
   
    const numeroPokemon = document.getElementById("numero_pokemon");
    const nombrePokemon = document.getElementById("nombre");
    const weightPokemon = document.getElementById("weight_pokemon");
    const heightPokemon = document.getElementById("height_pokemon");
    const levelPokemon = document.getElementById("nivel_pokemon");
    const typePokemon = document.getElementById("tipo_pokemon");
    const habilidad_pokemon = document.getElementById("habilidad_pokemon");
    const imagen_pokemon = document.getElementById("pokeImagenes");
    
    const printPokemon = (tagIdPokemon,tagNombrePokemon, infoPokemon, tagHeightPokemon, tagWeightPokemon,tagTypePokemon, tagLevelPokemon, tagAbilitiesPokemon, tagImagesPokemon ) =>{
   
    tagIdPokemon.innerHTML= `${infoPokemon[0].id} `
    tagHeightPokemon.innerHTML= `${infoPokemon[0].height} m`
    tagWeightPokemon.innerHTML= `${infoPokemon[0].weight} `
    tagLevelPokemon.innerHTML= `${infoPokemon[0].version_group_details} `
    tagTypePokemon.innerHTML= `${infoPokemon[0].types}`
    tagAbilitiesPokemon.innerHTML= `${infoPokemon[0].abilities} `
    tagImagesPokemon.src= `${infoPokemon[0].image} `
    tagNombrePokemon.innerHTML= `${infoPokemon[0].name} `
   

    }
    printPokemon(numeroPokemon, nombrePokemon, allInfo, heightPokemon, weightPokemon, typePokemon, levelPokemon, habilidad_pokemon, imagen_pokemon) 
        

    
})

const imagenPoke = document.getElementById("pokeImagenes");
const opciones = document.querySelectorAll(".opciones");
const activeClass = "active";

opciones.forEach((pokemon) => {
  pokemon.addEventListener("click", function () {
    // Remover la clase "active" de todas las imágenes
    opciones.forEach((option) => option.classList.remove(activeClass));

    // Agregar la clase "active" a la imagen actual
    pokemon.classList.add(activeClass);

    // Llamar a la API con el ID correspondiente
    const pokemonId = pokemon.getAttribute("alt");
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    axios.get(apiUrl).then((response) => {
      // Actualizar la tabla con la información del Pokémon
      document.getElementById("numero_pokemon").textContent = response.data.id;
      document.getElementById("nivel_pokemon").textContent = response.data.base_experience;
      document.getElementById("tipo_pokemon").textContent = response.data.types.map((type) => type.type.name).join(", ");
      document.getElementById("habilidad_pokemon").textContent = response.data.abilities.map((ability) => ability.ability.name).join(", ");
      document.getElementById("height_pokemon").textContent = response.data.height;
      document.getElementById("weight_pokemon").textContent = response.data.weight;
      document.getElementById("nombre").textContent = response.data.name;

      // Actualizar la imagen del Pokémon
      imagenPoke.src = response.data.sprites.front_default;
    });
  });
});
form.addEventListener ('submit', (e) => {
    e.preventDefault ();
    const busqueda = inputBusqueda.value
    if (busqueda && busqueda !== '') {
        getPokeApi (URL_POKE + busqueda)
        busqueda.value = ''
        
    }
    else {
        window.location.reload()

    }
    console.log(busqueda)
}) 


//  const filtroBusqueda = (allInfo) => {
//        const pokemonsFiltrados = apiUrl.filter(pokemones=> pokemones.name.toLowerCase().includes(allInfoPokedex.toLowerCase()));
//        const result = pokemonsFiltrados.length ?
//        pokemonsFiltrados : apiUrl;
//        const messageResult = pokemonsFiltrados.length? true: "Este poekemon no exixte";
      
//        return {
//         resultSearch: result,
//         messageSearch: messageResult,

//        };

    
//  }

//  const busquedaPokemon = document.querySelector(".busqueda_pokemon");
//  console.log (busquedaPokemon);


//  busquedaPokemon.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log('Buscar');

//     const terminoDeBusqueda = 'Buscar';

//     if (terminoDeBusqueda) {
//         const resultadoDeBusqueda = filtroBusqueda(terminoDeBusqueda, URL_POKE);
//         console.log (resultadoDeBusqueda);

//         getPokeApi(allInfo,resultadoDeBusqueda,URL_POKE);
        
//         if(resultadoDeBusqueda.messageSearch) {
//             Swal.fire("Oops!", resultadoDeBusqueda,messageSearch, "error");
//         }

//     }else {
//         Swal.fire("Oops!", "No has ingrasado un término de búsqueda", "error");
//     }

//  })