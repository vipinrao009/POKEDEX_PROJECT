import axios from "axios";
import { useEffect, useState } from "react";
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){
    const [pokemonList, setPokemonList] = useState([])
    const [isLoading,setLoding] = useState(true)
    const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon"

    async function downloadPokemons(){
        const response = await axios.get(POKEDEX_URL) //This downloads list of 20 pokemon
        const pokemonResults = response.data.results; //We got the array of pokemon from results
        
        //Iterating over the array of pokemon, and using their url , to create an array of promises
        //That will download those 20 pokemon
        const pokemonResultPromise =  pokemonResults.map((pokemon)=> axios.get(pokemon.url))
        
        // Passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise) // Array of 20 pokemon detailed data
        console.log(pokemonData);
        
        //Now iterate on the data of each pokemon, and extract id, name ,image, types
        const pokeListResult = pokemonData.map((pokeData)=>{
           const pokemon = pokeData.data
           return{
            id:pokemon.id,
            name:pokemon.name,
            image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
            types:pokemon.types
           }

        })

        console.log(pokeListResult);
        setPokemonList(pokeListResult)
        setLoding(false)
    }
    useEffect(()=>{
         downloadPokemons()
    },[])
    
    return (
       <div className="pokemon-list-wrapper">
        <div>PokemonList</div>
        {(isLoading ? "Loading...." :pokemonList.map((p)=> <Pokemon name={p.name} image ={p.image} id={p.id}/>))}
       </div>
    )
}

export default PokemonList