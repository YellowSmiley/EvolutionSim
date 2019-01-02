# EvolutionSim

A basic 2D evolution simulator that uses [Webpack](https://github.com/webpack/webpack) and [Kontra.js](https://github.com/straker/kontra) and is written in JavaScript.

## What's EvolutionSim About?

Each sprite/square has various properties that it then uses to breed, if they are successful enough, or die, if they aren't. The idea is, that this will enable natural selection to occur; amongst the Sprites, and allow stronger Sprites to spawn.

If all the Sprites die or if they breed exponential, the sim will stop and the simulation will need to be restarted.

## What can I do in EvolutionSim?

It has a simple UI which allows users to pause, restart and view the props of the Sprites.

## Dev Notes

Run `npm run build` to compress `/src` into `/dist`.

Add new code into `/src` and import/export as needed.
