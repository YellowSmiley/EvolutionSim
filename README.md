# EvolutionSim

A basic 2D evolution simulator that uses Webpack and [Kontra.js](https://github.com/straker/kontra).

## What's EvolutionSim About?

Each sprite/square has various properties that it then uses to breed, if they are successful enough, or die, if they aren't. The idea is, that this will enable natural selection to occur amongst the Sprites and allow stronger Sprites to come into being.

If all the Sprites die or if exponential growth starts, the sim will stop and will need to be restarted.

## What can I do in EvolutionSim?

It has a simple UI which allows users to pause, restart and view the props of the Sprites.

## Dev Notes

Run `npm run build` to compress `/src` into `/dist`.

Add new code into `/src` and import/export as needed.
