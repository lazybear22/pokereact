import React, { useCallback, useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const App = () => {

  const [pokemons, setPokemons] = useState([])
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [pokeballs, setPokeballs] = useState(0)
  const [sortOption, setSortOption] = useState("ascending")

  const [water, setWater] = useState(true)
  const [grass, setGrass] = useState(true)
  const [bug, setBug] = useState(true)
  const [normal, setNormal] = useState(true)
  const [fire, setFire] = useState(true)

  const [slider, setSlider] = useState(30)

  const [cart, setCart] = useState([])

  useEffect(() => {

    const wrapper = async () => {

      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      const list = await res.json()

      let data = await Promise.all(list.results.map(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        return data
      }))

      setPokemons(data)

    }

    wrapper()

  }, [])

  useEffect(() => {

    setFilteredPokemons(pokemons)

  }, [pokemons])


  const addToCart = (item) => {

    let local = cart
    local.push(item)
    setCart([...local])

  }

  const removeFromCart = (item) => {

    let index = null

    for (let i = 0; i < cart.length; i++) {

      if (item == cart[i]) {
        index = i
      }

    }

    if (index != null) {

      let local = cart
      local.splice(index, 1)
      setCart([...local])

    }

  }

  useEffect(() => {

    console.log(cart)

    let total = 0
    for (let pokemon of cart) {
      total += pokemon.height
    }

    console.log(total)

    setPokeballs(total)

  }, [cart])

  useEffect(() => {

    let local = [...pokemons]

    if (sortOption == "ascending") {

      local = [...pokemons].sort((a, b) => a.id - b.id)

    } else if (sortOption == "descending") {
    
      local = [...pokemons].sort((a, b) => b.id - a.id)
    
    }

    let filters = new Set([])

    if (water) {
      filters.add("water")
    }

    if (grass) {
      filters.add("grass")
    }

    if (bug) {
      filters.add("bug")
    }

    if (normal) {
      filters.add("normal")
    }

    if (fire) {
      filters.add("fire")
    }

    let valid = []

    local = local.map((item) => {

      let types = new Set([])
      item.types.forEach((type) => {
        types.add(type.type.name)
      })

      const filteredArray = [...types].filter(value => [...filters].includes(value));

      if (filteredArray.length > 0 && item.height <= slider) {
        valid.push(item)
      }

    })

    setFilteredPokemons([...valid])

  }, [sortOption, water, grass, bug, normal, fire, slider])


  return (
    <div className="app-contaner">
      <h1 className="title">PokéShop</h1>
      <div className="num-pokeballs">
        <h1 className="count">{pokeballs}&nbsp;</h1>
        <img className="pokeball-icon" src="https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png" />
      </div>
      <div className="sortby">
        <div className="sort">
          <Stack direction="row" spacing={1} style={{marginTop: "12.5px"}}>
            {cart.map((item) => {
              return (
                <Chip label={`${item.name}`} variant="outlined" />
              )
            })}
          </Stack>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel style={{ color: '#000' }} id="demo-simple-select-filled-label">Sort</InputLabel>
            <Select
              // style= {{color: '#fff'}}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={sortOption}
              label="Age"
              onChange={(e) => setSortOption(e.target.value)}
            >
              <MenuItem value={"none"}><em>None</em></MenuItem>
              <MenuItem value={"ascending"}>Ascending</MenuItem>
              <MenuItem value={"descending"}>Descending</MenuItem>
            </Select>
            <FormHelperText>Sort by Pokédex Value</FormHelperText>
          </FormControl>
        </div>
      </div>
      <div className="pokemon-container">
        <div className="main-section">
          <div className="filter-sort">
            <div className="filter">
              <h2 className="leading">Filter</h2>
              <h3>Type</h3>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked checked={water} onChange={e => setWater(e.target.checked)} />} label="Water" />
                <FormControlLabel control={<Checkbox defaultChecked checked={grass} onChange={e => setGrass(e.target.checked)} />} label="Grass" />
                <FormControlLabel control={<Checkbox defaultChecked checked={bug} onChange={e => setBug(e.target.checked)} />} label="Bug" />
                <FormControlLabel control={<Checkbox defaultChecked checked={normal} onChange={e => setNormal(e.target.checked)} />} label="Normal" />
                <FormControlLabel control={<Checkbox defaultChecked checked={fire} onChange={e => setFire(e.target.checked)} />} label="Fire" />
              </FormGroup>
              <h3>Pokéballs</h3>
              <div className="slider">
              <Box sx={{ width: 150 }}>
                <Slider
                  style={{ color: '#fff' }}
                  aria-label="Always visible"
                  defaultValue={0}
                  step={1}
                  valueLabelDisplay="auto"
                  max={30}
                  value={slider}
                  onChange={(e) => setSlider(e.target.value)}
                />
              </Box>
              </div>
            </div>
          </div>
          <div className="all-container">

            {filteredPokemons.map((pokemonStats, index) =>
              <PokemonCard
                key={index}
                id={pokemonStats.id}
                image={pokemonStats.sprites.other.dream_world.front_default}
                name={pokemonStats.name.charAt(0).toUpperCase() + pokemonStats.name.slice(1)}
                type={pokemonStats.types[0].type.name}
                height={pokemonStats.height}
                addToPokeballs={addToCart}
                removePokeballs={removeFromCart}
                item={pokemonStats}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;




























// const sortPokemons = (event) => {
//   const sortValue = event.target.value

//   const sortedPokemons = pokemon.sort((a, b) => {
//     if (sortValue === 0) {
//       return 0
//     }
//     // Ascending
//     if (sortValue === 1) {
//       if (a.id > b.id) return 1
//     }
//     // Descending
//     if (sortValue === 2) {
//       if (a.id < b.id) return -1
//     }
//   })
//   console.log(sortedPokemons)

//   if (sortValue === 0) {
//     setPokemon(POKEMONS)
//   }
//   setPokemon(sortedPokemons)
// }







// const getPokemon = (async () => {
//   const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
//   const data = await res.json()
//   POKEMONS = data;

//   data.results.forEach(async pokemon => {
//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
//     const data = await res.json()
//     setPokemon(currentList => [...currentList, data])
//     setFilteredPokemon(currentList => [...currentList, data])
//   })
// }, [pokemon])



// const filterPokemon = (event) => {
//   const pokemonCost = event.target.value;
//   const filteredValues = pokemon.filter(pokemon => {
//     return pokemon.height <= pokemonCost
//   })
//   setPokemon(filteredValues)

//   if (!pokemonCost) {
//     setPokemon(POKEMONS)
//   }

// }



  // const load = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

// {pokemon.map((pokemonStats, index) =>
//   <PokemonCard
//     key={index}
//     id={pokemonStats.id}
//     image={pokemonStats.sprites.other.dream_world.front_default}
//     name={pokemonStats.name.charAt(0).toUpperCase() + pokemonStats.name.slice(1)}
//     type={pokemonStats.types[0].type.name}
//     height={pokemonStats.height}
//     addToPokeballs={addToPokeballs}
//     removePokeballs={removePokeballs}
//   />
// )}
// {filteredPokemon.map((pokemonStats, index) =>
//   <PokemonCard
//     key={index}
//     id={pokemonStats.id}
//     image={pokemonStats.sprites.other.dream_world.front_default}
//     name={pokemonStats.name.charAt(0).toUpperCase() + pokemonStats.name.slice(1)}
//     type={pokemonStats.types[0].type.name}
//     height={pokemonStats.height}
//     addToPokeballs={addToPokeballs}
//     removePokeballs={removePokeballs}
//   />
// )}
// {filteredPokemon.length === 0 && pokemon.map((pokemonStats, index) =>
//   <PokemonCard
//     key={index}
//     id={pokemonStats.id}
//     image={pokemonStats.sprites.other.dream_world.front_default}
//     name={pokemonStats.name.charAt(0).toUpperCase() + pokemonStats.name.slice(1)}
//     type={pokemonStats.types[0].type.name}
//     height={pokemonStats.height}
//     addToPokeballs={addToPokeballs}
//     removePokeballs={removePokeballs}
//   />
// )}