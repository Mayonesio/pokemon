import React from 'react';
import '../styles/navbar.css';
import FavoriteContext from '../context/FavoriteContext';

const {useContext} = React;

const Navbar = () => {
  const {favoritePokemons} = useContext (FavoriteContext);
 

  let imgUrl = 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png';

  return (
    <nav>
      <div>
      <img 
        src={imgUrl}
        alt='logo pokemon'
        className='logo-pokemon'
      />
      </div>
      <div>&#10084;&#65039;{favoritePokemons.length}</div>
    </nav>
  )
};

export default Navbar;
