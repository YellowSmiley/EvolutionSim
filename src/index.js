import { restartTimer, pause } from "./time";
import { setError, changeEventHandler } from "./utils";
import {
  collisionDetection,
  spriteCanvasBoundaryChecker,
  spritePropsChecker,
  createSprites
} from "./spriteMethods";
import { clearSelectedSpriteAndInterval } from "./spriteSelector";

// Globals
const errorText = document.getElementById("errorText");
const sim = document.getElementById("sim");
const form = document.getElementById("form");
window.amountToSpawn = 50;
window.gSize = 25;
window.gSpeed = 4;
window.gFertilityRate = 1;
window.gFertilityProgress = 1000;
window.gTotalHunger = 2000;
window.gHealth = 2000;
window.gDamage = 10;
window.gDefence = 5;

document.getElementById("amount").value = amountToSpawn;
document.getElementById("size").value = gSize;
document.getElementById("speed").value = gSpeed;
document.getElementById("fertilityRate").value = gFertilityRate;
document.getElementById("fertilityProgress").value = gFertilityProgress;
document.getElementById("totalHunger").value = gTotalHunger;
document.getElementById("health").value = gHealth;
document.getElementById("damage").value = gDamage;
document.getElementById("defence").value = gDefence;

document.addEventListener(
  "DOMContentLoaded",
  function() {
    document.querySelector('input[id="amount"]').onchange = changeEventHandler;
    document.querySelector('input[id="size"]').onchange = changeEventHandler;
    document.querySelector('input[id="speed"]').onchange = changeEventHandler;
    document.querySelector(
      'input[id="fertilityRate"]'
    ).onchange = changeEventHandler;
    document.querySelector(
      'input[id="fertilityProgress"]'
    ).onchange = changeEventHandler;
    document.querySelector(
      'input[id="totalHunger"]'
    ).onchange = changeEventHandler;
    document.querySelector('input[id="health"]').onchange = changeEventHandler;
    document.querySelector('input[id="damage"]').onchange = changeEventHandler;
    document.querySelector('input[id="defence"]').onchange = changeEventHandler;
  },
  false
);

window.startGame = function() {
  form.setAttribute("style", "display:none;");
  sim.removeAttribute("style");
  kontra.init();

  window.sprites = [];
  const spriteCount = document.getElementById("spriteCount");
  window.restart = function() {
    sprites.forEach(sprite => {
      clearSelectedSpriteAndInterval(sprite);
    });
    if (!loop.isStopped) {
      loop.stop();
    }
    sprites = [];
    errorText.setAttribute("style", "display:none;");
    isTimerPaused = false;
    createSprites();
    restartTimer();
    loop.start();
  };

  window.loop = kontra.gameLoop({
    update() {
      sprites.map(sprite => {
        sprite.update();
        spriteCanvasBoundaryChecker(sprite);
        spritePropsChecker(sprite);
      });

      sprites.forEach((sprite, i) => {
        sprite.isColliding = false;
      });

      collisionDetection();

      sprites = sprites.filter(sprite => sprite.isAlive());

      // Colour isColliding checker
      // sprites.forEach((sprite, i) =>
      //   sprite.isColliding ? (sprite.color = "green") : (sprite.color = "red")
      // );

      spriteCount.innerHTML = sprites.length;

      if (sprites.length >= 400) {
        pause();
        setError("Exponential growth detected... Sim over; please restart.");
      } else if (sprites.length <= 0) {
        pause();
        setError("All sprites are dead... Sim over; please restart.");
      }
    },
    render() {
      sprites.map(sprite => sprite.render());
    }
  });
};

window.stopGame = function() {
  sprites.forEach(sprite => {
    clearSelectedSpriteAndInterval(sprite);
  });
  isTimerPaused = false;
  restartTimer();
  sprites = [];
  errorText.setAttribute("style", "display:none;");
  sim.setAttribute("style", "display:none;");
  form.removeAttribute("style");
};
