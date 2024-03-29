import { useState } from "react"
import "./Search.css"
import useDebounce from "../../hooks/useDebounce"
function Search({updateSearchTerm}){
  
  const debounceCallback = useDebounce((e)=>updateSearchTerm(e.target.value))

    return(
        <div className="search-wrapper">
        <input
          id="pokemon-name-search"
          type="text"
          placeholder="Enter Pokemon...."
          onChange={debounceCallback}
        />
        
        </div>
    )
}

export default Search