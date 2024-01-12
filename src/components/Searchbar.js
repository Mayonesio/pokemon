import React from 'react';
import { useState } from 'react';
import {searchPokemon, getPokemons} from '../api';
import '../styles/searchbar.css';
import '../styles/boton.css';
import '../styles/card.css';


const Searchbar = (props) => {
    const { onSearch } = props;
    const [search, setSearch] = useState('');
    const [pokemon, setPokemon] = useState();

    const onChange = (evt) => {
        setSearch(evt.target.value);
        if(evt.target.value.length === 0){
          setSearch (null);
        }
    }

    const onClick = async (evt) => {
        onSearch(search);
    }

   return (
    <>
      <div className="input-wrapper">
        <input placeholder="Busca tu pokemon" 
        className="input" 
        onChange ={onChange} />
      </div>
      <button onClick={onClick}>Catch'em all</button>
      <div>
        {pokemon && 
        <div className='card-client'>
            <div className='user-picture'><img src={pokemon.sprites.front_default} alt={pokemon.name}/></div>
            <div className='name-client'>{pokemon.name}</div>
            <div className=''><span>Peso: {pokemon.weight} Kg.</span> </div>

        </div>    
        }   
      </div>
    </>
  )
};

export default Searchbar;
