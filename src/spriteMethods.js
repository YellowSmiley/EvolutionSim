import { handleSpriteOnClick } from "./spriteSelector";
import { getRandomInt, isCollide } from "./utils";
import { clearSelectedSpriteAndInterval } from "./spriteSelector";

let spriteUniqueId = 1;

export function collisionDetection() {
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

export function spriteCanvasBoundaryChecker(sprite) {
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
}

export function spritePropsChecker(sprite) {
  //TODO: Fix fertilityRate > default
  //TODO: Fix fertilityProgress > default
  //TODO: Fix healing when defence higher than damage
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
    if (sprite.fertilityProgress < fertilityProgress) {
      sprite.fertilityProgress += sprite.fertilityRate;
    }
    if (sprite.fertilityProgress === fertilityProgress) {
      sprite.isFertile = true;
      sprite.fertilityProgress = 0;
    }
  }
}

export function createSprite(
  x,
  y,
  size,
  speed,
  fertilityRate,
  fertilityProgress,
  totalHunger,
  health,
  damage,
  defence
) {
  //TODO: Fix size being anything other than 25 being selectable
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
    fertilityProgress: fertilityProgress, // 1000
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

export function createSprites() {
  const canvasSize = { x: 800, y: 600 };
  for (let i = 0; i < amountToSpawn; i++) {
    createSprite(
      Math.floor(Math.random() * canvasSize.x),
      Math.floor(Math.random() * canvasSize.y),
      size,
      speed,
      fertilityRate,
      getRandomInt(1, fertilityProgress),
      totalHunger,
      health,
      damage,
      defence
    );
  }
}

export function breed(spriteA, spriteB) {
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
  //TODO: Add colour that changes slightly from the parents
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
    0,
    sprite.totalHunger,
    sprite.health,
    sprite.damage,
    sprite.defence
  );
  spriteA.isFertile = false;
  spriteB.isFertile = false;
}

export function feed(spriteA, spriteB) {
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

window.infinityGauntlet = function() {
  let numberOfSpitesToCull = sprites.length - 1;
  numberOfSpitesToCull = Math.round(numberOfSpitesToCull / 2);
  for (let i = 0; i < numberOfSpitesToCull; i++) {
    sprites[i].ttl = 0;
  }
};

window.starve = function() {
  for (let i = 0; i < sprites.length - 1; i++) {
    sprites[i].hunger = 0;
  }
};
