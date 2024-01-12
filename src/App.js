import "./App.css";
import Navbar from "./components/Navbar";
import Pokedex from "./components/Pokedex";
import Searchbar from "./components/Searchbar";
import Loader from "./components/Loader";
import { useState } from "react";
import { useEffect } from "react";
import { FavoriteProvider } from "./context/FavoriteContext";
import { getPokemonData, getPokemons, searchPokemon } from "./api";

const localStorageKey = "favorite_pokemon";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState();
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(25, 25 * page);
      setPokemons(data.results);
      const promises = data.results.map(async(pokemon) => {
        return await getPokemonData(pokemon.url)
      });
      const results = await Promise.all(promises)
      setPokemons(results);
      const totalCount = typeof data.count === 'number' ? data.count : 0;
      setTotal(Math.ceil(totalCount / 25));
      setLoading(false);
      setNotFound(false);
    } catch (err) {}
  };

const loadFavorietePokemons = () =>{
  const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
  setFavorites(pokemons);
}

  useEffect(()=>{
    loadFavorietePokemons();
  }, [])

  useEffect(() => {
    if (!searching) {
      fetchPokemons();
    }
  }, [page]);

  const updateFavoritePokemons = (name) =>{
    const updated = [...favorites];
    const isFavorite = favorites.indexOf(name);
      if(isFavorite >= 0) {
        updated.splice(isFavorite, 1) 
      }else{
        updated.push(name);
      }
      setFavorites(updated);
      window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  }

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      setSearching(false);
      return fetchPokemons();
    }
  
    setLoading(true);
    setNotFound(false);
    setSearching(true);
  
    try {
      const result = await searchPokemon(pokemon);
  
      if (!result) {
        setNotFound(true);
      } else {
        setPokemons([result]);
        setPage(0);
        setTotal(1);
      }
    } catch (error) {
      console.error('Error fetching data from PokeAPI:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };
  

  return (
    <FavoriteProvider value={{ favoritePokemons: favorites, updateFavoritePokemons }}>

    <div>
      <Navbar />
      <div className="App">
        <Searchbar onSearch={onSearch}/>
        {notFound ? (
            <div className="not-found-text">
              No se encontro el Pokemon que buscabas 😭
            </div>
          ) : (
            <Pokedex
              loading={loading}
              pokemons={pokemons}
              page={page}
              setPage={setPage}
              total={total}
            />
          )}   
        </div>
    </div>
   </FavoriteProvider>
  );
}

export default App;
