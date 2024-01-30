import PokemonList from "../PokemonList/PokemonList"
import "./Search.css"
function Search(){
    return(
        <div className="search-wrapper">
        <input
          id="pokemon-name-search"
          type="text"
          placeholder="Enter Pokemon...."
        />
        <PokemonList/>
        </div>
    )
}

export default Search