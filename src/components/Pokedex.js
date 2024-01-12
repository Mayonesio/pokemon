import React from 'react'
import Pokemon from './Pokemon';
import Pagination from './Pagination';


const Pokedex = (props) => {
    const {pokemons, page, setPage, total} = props;
  
    const lastPage = () => {
      const nextPage = Math.max(page -1, 0);
      setPage(nextPage)
    }

    const nextPage = () => {
      const nextPage = Math.min(page + 1, total - 1);
      setPage(nextPage)
    }

  return (
    <div>
      <div className='pagination-container'>
        <h1>POKEDEX</h1>
        <div>
          <Pagination
            page={page + 1}
            totalPages={total}
            onLeftClick={lastPage} 
            onRightClick={nextPage}
          />
        </div>
      </div>
      <div className='pokedex-grid'>
        {pokemons.map((pokemon, idx) => {
            return(            
            <Pokemon pokemon={pokemon} key={pokemon.name} />
            )            
            })}
      </div>
    </div>
  )
}

export default Pokedex;
