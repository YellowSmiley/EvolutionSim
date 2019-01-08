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
  //TODO: Fix fertilityRate > default - Should be fixed (check)
  //TODO: Fix fertilityProgress > default - Should be fixed (check)
  //TODO: Fix healing when defence higher than damage - Should be fixed (check)
  if (sprite.hunger >= sprite.totalHunger * 0.9) {
    if (sprite.health < sprite.totalHealth) {
      sprite.health += 1;
    }
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
    if (sprite.fertilityProgress < sprite.totalFertilityProgress) {
      sprite.fertilityProgress += sprite.fertilityRate;
    }
    if (sprite.fertilityProgress >= sprite.totalFertilityProgress) {
      sprite.isFertile = true;
      sprite.fertilityProgress = 0;
    }
  }
}

function moveSpriteTowardsTarget(sprite, target) {
  // If right, move left (negative)
  if (sprite.position._x > target.position._x) {
    if (sprite.velocity._x > 0) {
      sprite.velocity._x *= -1;
    }
  } else {
    if (sprite.velocity._x < 0) {
      sprite.velocity._x *= -1;
    }
  }
  // If below, move up (negative)
  if (sprite.position._y > target.position._y) {
    if (sprite.velocity._y > 0) {
      sprite.velocity._y *= -1;
    }
  } else {
    if (sprite.velocity._y < 0) {
      sprite.velocity._y *= -1;
    }
  }
}

function moveSpriteAwayFromTarget(sprite, target) {
  // If right, move right (positive)
  if (sprite.position._x > target.position._x) {
    if (sprite.velocity._x < 0) {
      sprite.velocity._x *= -1;
    }
  } else {
    if (sprite.velocity._x > 0) {
      sprite.velocity._x *= -1;
    }
  }
  // If below, move down (positive)
  if (sprite.position._y > target.position._y) {
    if (sprite.velocity._y < 0) {
      sprite.velocity._y *= -1;
    }
  } else {
    if (sprite.velocity._y > 0) {
      sprite.velocity._y *= -1;
    }
  }
}

export function spriteSearchAndDestroy(sprite) {
  for (let i = 0; i < sprites.length; i++) {
    const otherSprite = sprites[i];
    if (otherSprite !== sprite) {
      const spriteSight = {
        x: sprite.x + sprite.width / 2,
        y: sprite.y + sprite.height / 2,
        height: sprite.sight * 2 - otherSprite.stealth,
        width: sprite.sight * 2 - otherSprite.stealth
      };
      //If Seen
      if (isCollide(spriteSight, otherSprite)) {
        //If otherSprite weaker
        if (sprite.damage > otherSprite.defence) {
          moveSpriteTowardsTarget(sprite, otherSprite);
        } else {
          moveSpriteAwayFromTarget(sprite, otherSprite);
        }
      }
    }
  }
}

export function createSprite(
  x,
  y,
  size,
  speed,
  fertilityRate,
  totalFertilityProgress,
  totalHunger,
  health,
  damage,
  defence
) {
  //TODO: Fix size being anything other than 25 being selectable and collide-able
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
    fertilityProgress: 0, // 1000
    totalFertilityProgress: totalFertilityProgress, // 1000
    hunger: totalHunger, //1000
    totalHunger: totalHunger, //1000
    health: health, //1000
    totalHealth: health, //1000
    damage: damage, //1
    defence: defence, //0
    sight: 50,
    stealth: 0,
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
      gSize,
      gSpeed,
      gFertilityRate,
      gFertilityProgress,
      gTotalHunger,
      gHealth,
      gDamage,
      gDefence
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
  sprite.totalFertilityProgress =
    getRandomInt(1, 2) === 1
      ? spriteA.totalFertilityProgress
      : spriteB.totalFertilityProgress;
  sprite.totalHunger =
    getRandomInt(1, 2) === 1 ? spriteA.totalHunger : spriteB.totalHunger;
  sprite.totalHealth =
    getRandomInt(1, 2) === 1 ? spriteA.totalHealth : spriteB.totalHealth;
  sprite.damage = getRandomInt(1, 2) === 1 ? spriteA.damage : spriteB.damage;
  sprite.defence = getRandomInt(1, 2) === 1 ? spriteA.defence : spriteB.defence;
  //TODO: Add colour that changes slightly from the parents
  const randomMutation = getRandomInt(1, 8);
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
      if (sprite.speed >= 1) {
        sprite.speed -= 1;
      }
    }
  } else if (randomMutation === 3) {
    if (getRandomInt(1, 2) === 1) {
      sprite.fertilityRate += 1;
    } else {
      if (sprite.fertilityRate >= 1) {
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
      sprite.totalHealth += 10;
    } else {
      if (sprite.totalHealth >= 10) {
        sprite.totalHealth -= 10;
      }
    }
  } else if (randomMutation === 6) {
    if (getRandomInt(1, 2) === 1) {
      sprite.damage += 1;
    } else {
      if (sprite.damage >= 1) {
        sprite.damage -= 1;
      }
    }
  } else if (randomMutation === 7) {
    if (getRandomInt(1, 2) === 1) {
      sprite.defence += 1;
    } else {
      if (sprite.defence >= 1) {
        sprite.defence -= 1;
      }
    }
  } else if (randomMutation === 8) {
    if (getRandomInt(1, 2) === 1) {
      sprite.totalFertilityProgress += 10;
    } else {
      if (sprite.totalFertilityProgress >= 10) {
        sprite.totalFertilityProgress -= 10;
      }
    }
  }

  createSprite(
    sprite.position._x,
    sprite.position._y,
    sprite.size,
    sprite.speed,
    sprite.fertilityRate,
    sprite.totalFertilityProgress,
    sprite.totalHunger,
    sprite.totalHealth,
    sprite.damage,
    sprite.defence
  );
  spriteA.isFertile = false;
  spriteB.isFertile = false;
}

export function feed(spriteA, spriteB) {
  if (spriteA.health > 0) {
    if (spriteA.defence < spriteB.damage) {
      spriteA.health -= spriteB.damage - spriteA.defence;
    }
  }
  if (spriteA.hunger < spriteA.totalHunger - 10) {
    spriteA.hunger += 10;
  }
  if (spriteB.health > 0) {
    if (spriteB.defence < spriteA.damage) {
      spriteB.health -= spriteA.damage - spriteB.defence;
    }
  }
  if (spriteB.hunger < spriteB.totalHunger) {
    spriteB.hunger += 1;
  }
}

window.infinityGauntlet = function() {
  let numberOfSpitesToCull = Math.round(sprites.length / 2);
  for (let i = 0; i < numberOfSpitesToCull; i++) {
    if (sprites[i].interval) {
      clearSelectedSpriteAndInterval(sprites[i]);
    }
    sprites[i].ttl = 0;
  }
};

window.starve = function() {
  for (let i = 0; i < sprites.length - 1; i++) {
    sprites[i].hunger = 0;
  }
};
