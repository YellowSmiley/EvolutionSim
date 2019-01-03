import { restartTimer, pause } from "./time";
import { setError, changeEventHandler } from "./utils";
import {
  collisionDetection,
  spriteCanvasBoundaryChecker,
  spritePropsChecker,
  createSprites
} from "./spriteMethods";
import { clearSelectedSpriteAndInterval } from "./spriteSelector";

window.errorText = document.getElementById("errorText");
window.sim = document.getElementById("sim");
window.form = document.getElementById("form");

window.amountToSpawn = 50;
window.size = 25;
window.speed = 4;
window.fertilityRate = 1;
window.fertilityProgress = 1000;
window.totalHunger = 2000;
window.health = 2000;
window.damage = 10;
window.defence = 5;

document.getElementById("amount").value = amountToSpawn;
document.getElementById("size").value = size;
document.getElementById("speed").value = speed;
document.getElementById("fertilityRate").value = fertilityRate;
document.getElementById("fertilityProgress").value = fertilityProgress;
document.getElementById("totalHunger").value = totalHunger;
document.getElementById("health").value = health;
document.getElementById("damage").value = damage;
document.getElementById("defence").value = defence;

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
    createSprites(
      amountToSpawn,
      size,
      speed,
      fertilityRate,
      fertilityProgress,
      totalHunger,
      health,
      damage,
      defence
    );
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
