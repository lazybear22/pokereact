# Development

### Link to Deployed Website

https://lazybear22.github.io/pokereact/

### Goal and Value of the Application

The goal of this application is to allow users to view the first 20 Pokemon in the Pokedex. The app allows them to filter by type or cost
as well as sort by Pokedex value. The sort and filter methods work together, allowing users to sort their filtered list of Pokemon.

### Usability Principles Considered

I considered sorting and filtering by different categories, but settled on sorting by Pokedex value and filtering by type and cost.
I chose to place the filter and sort functionality in familiar places to the user to streamline the usability. Users are used to seeing filters
on the left of the grid of items and a sort method on the top-right of the grid. This is standard and didn't require much thought about hierarchy.
I followed the same suit for the aggregator being above the sort.

### Organization of Components

I only have one component called PokemonCard which pulls the Pokedex value, pokemon image, its name, its type, as well as a cost affiliated with it.
It terms of interactable parts of the component, I have the add and remove from cart which are set to call their respective pokeball functions. 

### How Data is Passed Down Through Components

The data is passed down through components via the Pokeapi API which helped get data to populate the components. I simply map through the list of JSON
bodies and populate the components. I set the API limit to only display 20 pokemon.

### How the User Triggers State Changes

Users trigger state changes by adding or removing to cart, changing the number of pokeballs displayed. In the filter section, when a user 
unselects a type, that type will be removed from the type list in the filtered list and will no longer be displayed. 
Similarly, the slider value can be manupulated to change the max cost displayed on the app. Lastly, sorting by pokedex value changes the sortOption
which dictates how we sort (ie. ascending or descending).
