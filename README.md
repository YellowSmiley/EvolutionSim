# EvolutionSim

A basic 2D evolution simulator that uses [Webpack](https://github.com/webpack/webpack) and [Kontra.js](https://github.com/straker/kontra) and is written in JavaScript, HTML and CSS.

## What's EvolutionSim About?

Each sprite/square has various properties that it then uses to breed, if they are successful enough, or die, if they aren't. The idea is, that this will enable natural selection to occur; amongst the Sprites, and allow stronger Sprites to spawn.

If all the Sprites die or if they breed exponentially, the sim will stop and the simulation will need to be restarted.

## What can I do in EvolutionSim?

It has a simple UI which allows users to pause, restart, change starting parameters, cull half the population, starve the entire population and view the props of the Sprites.

## Features

Select starting parameters for initial sprites.

Each sprite has unique properties and can pass on its traits to their children.

Each child born has a random mutation to its properties and takes on properties, randomly, from its parents.

Sprites feed on other sprites and heal if they're well fed or slowly die if they're starving.

Sprites can hunt other sprites if they deem them weaker and can see them; weaker sprites run away.

Sprites can be selected to see real time values of their properties.

Users can use the infinity gauntlet to cull half the population or starve the entire population.

## Dev Notes

Run `npm run build` to compress `/src` into `/dist`.

Add new code into `/src` and import/export as needed.
