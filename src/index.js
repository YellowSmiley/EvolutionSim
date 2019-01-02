import { restartTimer, pause } from "./time";

kontra.init();

let sprites = [];
let spriteUniqueId = 1;
const spriteCount = document.getElementById("spriteCount");
const errorText = document.getElementById("errorText");
const selectedSpriteInfo = document.getElementById("selectedSpriteInfo");

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

function setError(message) {
  errorText.removeAttribute("style");
  errorText.innerHTML = message;
}

function clearSelectedSpriteAndInterval(sprite) {
  selectedSpriteInfo.innerHTML = "";
  clearInterval(sprite.interval);
}

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
      2000,
      2000,
      10,
      5
    );
  }
  restartTimer();
  loop.start();
};

function displaySpriteProps(sprite) {
  selectedSpriteInfo.innerHTML = "";
  let listOfSprites = document.createElement("ul");
  const shownProps = [
    "height",
    "width",
    "color",
    "speed",
    "isFertile",
    "fertilityRate",
    "fertilityProgress",
    "hunger",
    "totalHunger",
    "health",
    "totalHealth",
    "damage",
    "defence",
    "sight"
  ];
  Object.entries(sprite).map(prop => {
    for (let i = 0; i < shownProps.length - 1; i++) {
      if (prop[0] === shownProps[i]) {
        let li = document.createElement("li");
        let liContent = document.createTextNode(prop[0] + ": " + prop[1]);
        li.appendChild(liContent);
        listOfSprites.appendChild(li);
        break;
      }
    }
  });
  selectedSpriteInfo.appendChild(listOfSprites);
}

function handleSpriteOnClick(sprite) {
  sprites.forEach(otherSprite => {
    if (sprite !== otherSprite) {
      otherSprite.selected = "false";
      clearInterval(otherSprite.interval);
      otherSprite.color = "red";
    }
  });
  sprite.color = "green";
  sprite.selected = "true";
  displaySpriteProps(sprite);
  sprite.interval = setInterval(() => {
    if (!isTimerPaused) {
      displaySpriteProps(sprite);
    }
  }, 100);
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
  spriteUniqueId += 1;
  let sprite = kontra.sprite({
    id: spriteUniqueId,
    selected: false,
    interval: null,
    x: x, //Math.floor(Math.random() * canvasSize.x)
    y: y, //Math.floor(Math.random() * canvasSize.y)
    color: "red",
    width: size, //25
    height: size, //25
    ttl: Infinity,
    speed: speed,
    dx: Math.random() * speed - 2,
    dy: Math.random() * speed - 2,
    isFertile: false,
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
      handleSpriteOnClick(this);
    }
  });
  sprites.push(sprite);
  kontra.pointer.track(sprite);
}

function breed(spriteA, spriteB) {
  let sprite = {};
  if (getRandomInt(1, 2) === 1) {
    sprite = Object.assign({}, spriteA);
  } else {
    sprite = Object.assign({}, spriteB);
  }
  sprite.size = getRandomInt(1, 2) === 1 ? spriteA.width : spriteB.width;
  sprite.speed = getRandomInt(1, 2) === 1 ? spriteA.speed : spriteB.speed;
  sprite.fertilityRate =
    getRandomInt(1, 2) === 1 ? spriteA.fertilityRate : spriteB.fertilityRate;
  sprite.totalHunger =
    getRandomInt(1, 2) === 1 ? spriteA.totalHunger : spriteB.totalHunger;
  sprite.health = getRandomInt(1, 2) === 1 ? spriteA.health : spriteB.health;
  sprite.damage = getRandomInt(1, 2) === 1 ? spriteA.damage : spriteB.damage;
  sprite.defence = getRandomInt(1, 2) === 1 ? spriteA.defence : spriteB.defence;
  //TODO: Fix healing on giving birth...
  const randomMutation = getRandomInt(1, 7);
  if (randomMutation === 1) {
    if (getRandomInt(1, 2) === 1) {
      sprite.size += 5;
    } else {
      if (sprite.size > 5) {
        sprite.size -= 5;
      }
    }
  } else if (randomMutation === 2) {
    if (getRandomInt(1, 2) === 1) {
      sprite.speed += 1;
    } else {
      if (sprite.speed > 4) {
        sprite.speed -= 1;
      }
    }
  } else if (randomMutation === 3) {
    if (getRandomInt(1, 2) === 1) {
      sprite.fertilityRate += 1;
    } else {
      if (sprite.fertilityRate > 0) {
        sprite.fertilityRate -= 1;
      }
    }
  } else if (randomMutation === 4) {
    if (getRandomInt(1, 2) === 1) {
      sprite.totalHunger += 100;
    } else {
      if (sprite.totalHunger > 100) {
        sprite.totalHunger -= 100;
      }
    }
  } else if (randomMutation === 5) {
    if (getRandomInt(1, 2) === 1) {
      sprite.health += 10;
    } else {
      if (sprite.health > 10) {
        sprite.health -= 10;
      }
    }
  } else if (randomMutation === 6) {
    if (getRandomInt(1, 2) === 1) {
      sprite.damage += 5;
    } else {
      if (sprite.damage > 0) {
        sprite.damage -= 5;
      }
    }
  } else if (randomMutation === 7) {
    if (getRandomInt(1, 2) === 1) {
      sprite.defence += 5;
    } else {
      if (sprite.defence > 0) {
        sprite.defence -= 5;
      }
    }
  }
  createSprite(
    sprite.position._x,
    sprite.position._y,
    sprite.size,
    sprite.speed,
    sprite.fertilityRate,
    sprite.totalHunger,
    sprite.health,
    sprite.damage,
    sprite.defence
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

window.loop = kontra.gameLoop({
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
      if (sprite.health <= 0) {
        if (sprite.interval) {
          clearSelectedSpriteAndInterval(sprite);
        }
        sprite.ttl = 0;
      }
      if (sprite.hunger <= 0) {
        if (sprite.health > 0) {
          sprite.health -= 1;
        }
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
