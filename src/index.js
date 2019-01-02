import { restartTimer, pause } from "./time";
import { getRandomInt, setError } from "./utils";
import {
  createSprite,
  collisionDetection,
  spriteCanvasBoundaryChecker,
  spritePropsChecker
} from "./spriteMethods";
import { clearSelectedSpriteAndInterval } from "./spriteSelector";

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
  const amountToSpawn = 50;
  const canvasSize = { x: 800, y: 600 };
  for (let i = 0; i < amountToSpawn; i++) {
    createSprite(
      Math.floor(Math.random() * canvasSize.x),
      Math.floor(Math.random() * canvasSize.y),
      25,
      4,
      1,
      getRandomInt(1, 1000),
      2000,
      2000,
      10,
      5
    );
  }
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
