import Search from "../Search/Search"
import "./Pokedex.css"
import PokemonList from "../PokemonList/PokemonList"
import { useState } from "react"
import PokemonDetails from "../PokemonDetails/PokemonDetails"

function Pokedex(){
    const[searchItem,setSearchItem] = useState('')

    return(
        
       <div className="pokedex-wrapper">
        <Search updateSearchTerm={setSearchItem}/>

        {(!searchItem) ? <PokemonList/> :<PokemonDetails key={searchItem} pokemonName={searchItem}/>}
       </div>
    )
}

export default Pokedex