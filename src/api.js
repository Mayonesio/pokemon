// Archivo: pokeApi.js


// Función para realizar una solicitud a la API
async function searchPokemon(pokemon) {
    
    const apiUrl = 'https://pokeapi.co/api/v2/';

  try {
    const response = await fetch(`${apiUrl}pokemon/${pokemon}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from PokeAPI:', error);
    throw error;
  }
}

export { searchPokemon };

export const getPokemons = async (limit=50, offset=0) => {

    const apiUrl = 'https://pokeapi.co/api/v2/';

    try {
        const response = await fetch(`${apiUrl}pokemon?limit=${limit}&offset=${offset}`);
    
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data from PokeAPI:', error);
        throw error;
      }
}


async function getPokemonData(url) {
    try {
    const response = await fetch(url);

    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from PokeAPI:', error);
    throw error;
  }
}

export { getPokemonData };
