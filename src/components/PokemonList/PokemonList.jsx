import axios from "axios";
import { useEffect, useState } from "react";
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){
    const [pokemonListState,setPokemonListState] = useState({
        pokemonList:[],
        isLoading:true,
        pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
        nextUrl:"",
        prevUrl:""
    })

    async function downloadPokemons(){
        setPokemonListState((state) => ({... state, isLoading:true}))

        const response = await axios.get(pokemonListState.pokedexUrl) //This downloads list of 20 pokemon
        const pokemonResults = response.data.results; //We got the array of pokemon from results
        
        console.log(response.data);
        
        setPokemonListState((state)=>({
            ... state,
            nextUrl:response.data.next,
            prevUrl:response.data.previous
        }))

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
        setPokemonListState((state)=>({
            ... state,
            pokemonList:pokeListResult,
            isLoading:false
        }))
        
    }
    useEffect(()=>{
         downloadPokemons()
    },[pokemonListState.pokedexUrl])
    
    return (
       <div className="pokemon-list-wrapper">
        
        <div className="pokemon-wrapper">
          {(pokemonListState.isLoading)? "Loading...." :
            pokemonListState.pokemonList.map((p)=> <Pokemon name={p.name} image ={p.image} id={p.id}/>)
          }
        </div>

        <div className="controll">
            <button disabled={pokemonListState.prevUrl == null} onClick={()=> {
                const urlToSet = pokemonListState.prevUrl
                setPokemonListState({...pokemonListState , pokedexUrl :urlToSet })
                }}>Prev</button>

            <button disabled={pokemonListState.nextUrl == null} onClick={()=> {
                const urlToSet = pokemonListState.nextUrl
                setPokemonListState({... pokemonListState,pokedexUrl: urlToSet})
                }}>Next</button>

        </div>
       </div>
    )
}

export default PokemonList