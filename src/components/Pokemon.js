import React from 'react';
import '../styles/card.css';
import { useContext } from 'react';
import FavoriteContext from "../context/FavoriteContext";



const Pokemon = (props) => {
    const { pokemon } = props;
    const {favoritePokemons, updateFavoritePokemons } = useContext(FavoriteContext);

    const spriteUrl = pokemon.sprites && pokemon.sprites.front_default;

    const redHeart = "❤️";
    const blackHeart = "🖤";
    const heart = favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart;

    const clickHeart = (e) =>{
        e.preventDefault(pokemon.name)
        updateFavoritePokemons(pokemon.name)
    }
  return (
          
        <div className='card-client'>
            <div className='user-picture'>
                <img 
                // src={pokemon.sprites.front_default} 
                src={spriteUrl}
                alt={pokemon.name} 
                />
            </div>
            <button onClick={clickHeart}><div className='tooltip-social'>{heart}</div></button>
            <div className='name-client'>{pokemon.name}</div>
            <div className='name-client'>{pokemon.id}</div>
            <div className='social-media'>
                {pokemon.types && pokemon.types.map((type, idx) => {
                return (
                    <div key={idx} className="">
                    {type.type.name}
                    </div>
                );
                })}
             </div>

        </div>    

  )
}

export default Pokemon;
 