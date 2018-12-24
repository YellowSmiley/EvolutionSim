kontra.init();

let sprites = [];
const spriteCount = document.getElementById("spriteCount");
const secondsTimer = document.getElementById("seconds");
const minutesTimer = document.getElementById("minutes");
const hourTimer = document.getElementById("hour");
const errorText = document.getElementById("errorText");
let isTimerPaused = false;

function restartTimer() {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  setInterval(() => {
    if (!isTimerPaused) {
      seconds += 1;
      if (seconds === 60) {
        minutes += 1;
        seconds = 0;
        minutesTimer.innerHTML = minutes;
      }
      if (minutes === 60) {
        hours += 1;
        minutes = 0;
        hourTimer.innerHTML = hours;
      }
      secondsTimer.innerHTML = seconds;
    }
  }, 1000);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isCollide(a, b) {
  return !(
    a.y + a.height < b.y ||
    a.y > b.y + b.height ||
    a.x + a.width < b.x ||
    a.x > b.x + b.width
  );
}

function pause() {
  if (loop.isStopped) {
    loop.start();
  } else {
    loop.stop();
  }
  isTimerPaused = !isTimerPaused;
}

function restart() {
  sprites = [];
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
      2000,
      2000,
      10,
      5
    );
  }
  restartTimer();
}

function createSprite(
  x,
  y,
  size,
  speed,
  fertilityRate,
  totalHunger,
  health,
  damage,
  defence
) {
  let sprite = kontra.sprite({
    x: x, //Math.floor(Math.random() * canvasSize.x)
    y: y, //Math.floor(Math.random() * canvasSize.y)
    color: "red",
    width: size, //25
    height: size, //25
    ttl: Infinity,
    speed: speed,
    dx: Math.random() * speed - 2,
    dy: Math.random() * speed - 2,
    isFertile: true,
    fertilityRate: fertilityRate, //1
    fertilityProgress: 0, //0
    hunger: totalHunger, //1000
    totalHunger: totalHunger, //1000
    health: health, //1000
    totalHealth: health, //1000
    damage: damage, //1
    defence: defence, //0
    sight: 0,
    diseased: { diseased: false, damage: 0 },
    isColliding: false,
    onUp: function() {
      console.log(this);
    }
  });
  sprites.push(sprite);
  kontra.pointer.track(sprite);
}

function breed(spriteA, spriteB) {
  let size = getRandomInt(1, 2) === 1 ? spriteA.width : spriteB.width;
  let speed = getRandomInt(1, 2) === 1 ? spriteA.speed : spriteB.speed;
  let fertilityRate =
    getRandomInt(1, 2) === 1 ? spriteA.fertilityRate : spriteB.fertilityRate;
  let totalHunger =
    getRandomInt(1, 2) === 1 ? spriteA.totalHunger : spriteB.totalHunger;
  let health = getRandomInt(1, 2) === 1 ? spriteA.health : spriteB.health;
  let damage = getRandomInt(1, 2) === 1 ? spriteA.damage : spriteB.damage;
  let defence = getRandomInt(1, 2) === 1 ? spriteA.defence : spriteB.defence;
  let sprite = {};
  if (getRandomInt(1, 2) === 1) {
    sprite = spriteA;
  } else {
    sprite = spriteB;
  }
  const randomMutation = getRandomInt(1, 7);
  if (randomMutation === 1) {
    size = sprite.width;
    if (getRandomInt(1, 2) === 1) {
      size += 5;
    } else {
      if (size > 5) {
        size -= 5;
      }
    }
  } else if (randomMutation === 2) {
    speed = sprite.speed;
    if (getRandomInt(1, 2) === 1) {
      speed += 1;
    } else {
      if (speed > 4) {
        speed -= 1;
      }
    }
  } else if (randomMutation === 3) {
    fertilityRate = sprite.fertilityRate;
    if (getRandomInt(1, 2) === 1) {
      fertilityRate += 1;
    } else {
      if (fertilityRate > 0) {
        fertilityRate -= 1;
      }
    }
  } else if (randomMutation === 4) {
    totalHunger = sprite.totalHunger;
    if (getRandomInt(1, 2) === 1) {
      totalHunger += 100;
    } else {
      if (totalHunger > 100) {
        totalHunger -= 100;
      }
    }
  } else if (randomMutation === 5) {
    health = sprite.totalHealth;
    if (getRandomInt(1, 2) === 1) {
      health += 10;
    } else {
      if (health > 10) {
        health -= 10;
      }
    }
  } else if (randomMutation === 6) {
    damage = sprite.damage;
    if (getRandomInt(1, 2) === 1) {
      damage += 5;
    } else {
      if (damage > 0) {
        damage -= 5;
      }
    }
  } else if (randomMutation === 7) {
    defence = sprite.defence;
    if (getRandomInt(1, 2) === 1) {
      defence += 5;
    } else {
      if (defence > 0) {
        defence -= 5;
      }
    }
  }
  createSprite(
    spriteA.x,
    spriteA.y,
    size,
    speed,
    fertilityRate,
    totalHunger,
    health,
    damage,
    defence
  );
  spriteA.isFertile = false;
  spriteB.isFertile = false;
}

function feed(spriteA, spriteB) {
  if (spriteA.health > 0) {
    spriteA.health -= spriteB.damage - spriteA.defence;
  }
  if (spriteA.hunger < spriteA.totalHunger - 10) {
    spriteA.hunger += 10;
  }
  if (spriteB.health > 0) {
    spriteB.health -= spriteA.damage - spriteB.defence;
  }
  if (spriteB.hunger < spriteB.totalHunger) {
    spriteB.hunger += 1;
  }
}

function collisionDetection() {
  for (let i = 0; i < sprites.length - 1; i++) {
    for (let j = i + 1; j < sprites.length; j++) {
      if (isCollide(sprites[i], sprites[j]) && sprites[i] !== sprites[j]) {
        sprites[i].isColliding = true;
        sprites[j].isColliding = true;
        if (sprites[i].isFertile && sprites[j].isFertile) {
          breed(sprites[i], sprites[j]);
        } else {
          feed(sprites[i], sprites[j]);
        }
      }
    }
  }
}

let loop = kontra.gameLoop({
  update() {
    sprites.map(sprite => {
      sprite.update();
      // sprite is beyond the left edge
      if (sprite.x < 0) {
        sprite.x = kontra.canvas.width;
      }
      // sprite is beyond the right edge
      else if (sprite.x > kontra.canvas.width) {
        sprite.x = 0;
      }
      // sprite is beyond the top edge
      if (sprite.y < 0) {
        sprite.y = kontra.canvas.height;
      }
      // sprite is beyond the bottom edge
      else if (sprite.y > kontra.canvas.height) {
        sprite.y = 0;
      }
      if (sprite.hunger <= 0 || sprite.health <= 0) {
        sprite.ttl = 0;
      }
      if (sprite.hunger > 0) {
        sprite.hunger -= 1;
      }
      if (!sprite.isFertile) {
        if (sprite.fertilityProgress < 1000) {
          sprite.fertilityProgress += sprite.fertilityRate;
        }
        if (sprite.fertilityProgress === 1000) {
          sprite.isFertile = true;
          sprite.fertilityProgress = 0;
        }
      }
    });

    sprites.forEach((sprite, i) => (sprite.isColliding = false));

    collisionDetection();

    sprites = sprites.filter(sprite => sprite.isAlive());

    sprites.forEach((sprite, i) =>
      sprite.isColliding ? (sprite.color = "green") : (sprite.color = "red")
    );

    spriteCount.innerHTML = sprites.length;

    if (sprites.length >= 1000) {
      errorText.innerHTML = "Exponential growth detected... Sim over.";
      sprites = [];
      isTimerPaused = true;
    } else if (sprites.length <= 0) {
      errorText.innerHTML = "All sprites are dead... Sim over.";
      sprites = [];
      isTimerPaused = true;
    } else {
      errorText.setAttribute("style", "display:none;");
    }
  },
  render() {
    sprites.map(sprite => sprite.render());
  }
});

loop.start();
