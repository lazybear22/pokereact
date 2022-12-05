import React from 'react'

const PokemonCard = ({id, image, name, type, height, _callback, addToPokeballs, removePokeballs, item }) => {
    const style = type + " thumb-container";


    const handlePokeballSum = ()=>{
        addToPokeballs(item)
    }

    const handlePokeballDeduct = ()=>{
        removePokeballs(item)
    }

    return (
        <div className={style}>
            <div className="number"><small className="pokedex">#0{id}</small></div>
                <img className="pokemon-image" src={image} alt={name} />
                <div className="detail-wrapper">
                    <h3>{name}</h3>
                    <small>Type: {type}</small>
                    <div className="pokeball-cost">
                        <h1 className="price">{height}&nbsp;</h1>
                        <img className="pokeball-icon" src="https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png" />
                    </div>
                </div>
            <div className="cart-buttons">
                <div className="remove" onClick={handlePokeballDeduct}><small>{"-"}</small></div>
                <div className="add" onClick={handlePokeballSum}><small>{"+"}</small></div>
            </div>
        </div>
    )
}

export default PokemonCard
