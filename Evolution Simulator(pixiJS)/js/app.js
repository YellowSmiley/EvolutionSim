//Aliases
let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Graphics = PIXI.Graphics,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle;

//Create a Pixi Application
let app = new Application({
  width: 500,
  height: 500,
  antialiasing: true,
  transparent: false,
  resolution: 1
});

const b = new Bump(PIXI);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.backgroundColor = 0x999999;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//Define variables that might be used in more than one function
let state,
  entityId = 1,
  plants = [],
  preyArray = [],
  predators = [],
  gameScene,
  textureResource;

loader
  .add("images/life.json")
  .load(setup);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomDirection() {
  let i = randomInt(1, 2);
  let direction = null;
  if (i === 2) {
    direction = 1;
  } else {
    direction = -1;
  }
  return direction;
}

function addArrayOfEntitiesToScene(containerArray, amount, textureResource, name, speed, health, damage, sight, stealth, fertilityRate) {
  for (let i = 0; i < amount; i++) {
    let entity = new Sprite(textureResource);
    entity.id = entityId; // used to keep track of which entity's which
    entity.name = name;
    entity.x = randomInt(entity.width, app.renderer.screen.width - entity.width);
    entity.y = randomInt(entity.height, app.renderer.screen.height - entity.height);
    entity.height = 20;
    entity.width = 20;
    // Check if overlapping with another already placed entity, in the same array, and move
    for (arrayEntity of containerArray) {
      if (b.hitTestRectangle(entity, arrayEntity)) {
        let oneOrTwo = randomInt(1, 2);
        if (oneOrTwo === 2) {
          entity.x = randomInt(entity.width, app.renderer.screen.width - entity.width);
          entity.y = randomInt(entity.y + entity.height, app.renderer.screen.height - entity.height);
        } else {
          entity.x = randomInt(entity.x + entity.width, app.renderer.screen.width - entity.width);
          entity.y = randomInt(entity.height, app.renderer.screen.height - entity.height);
        }
      }
    }
    entity.anchor.x = 0.5;
    entity.anchor.y = 0.5;
    entity.speed = speed; // velocity of the entity
    entity.xDirection = pickRandomDirection(); // direction the entity is moving along the axis e.g. 1 or -1
    entity.vx = entity.speed * entity.xDirection; // speed and direction (velocity) the entity is moving along the x axis
    entity.yDirection = pickRandomDirection(); // direction the entity is moving along the axis e.g. 1 or -1
    entity.vy = entity.speed * entity.yDirection; // speed and direction (velocity) the entity is moving along the y axis     
    entity.maxHealth = health; // max health the entity can have
    entity.health = health; // the amount of health the entity currently has
    entity.maxHunger = 1000; // the amount a entity is full and not hungry
    entity.hunger = 1000; // how hungry the entity is. If hunger is 0 then the entity will slowly die
    entity.damage = damage; // how much damage the entity will do per tick, to the engaged entity
    entity.sight = sight; // how many pixels the entity can see in 360 ring
    entity.stealth = stealth; // how many pixels the entity can remove from the entity's sight, who's trying to see it
    entity.fertile = true; // if the entity is ready to mate
    entity.fertilityRate = fertilityRate; // how many ticks it takes to make the entity fertile again    
    //TODO: Let user specify how many of each gender
    if (i % 2) {
      entity.gender = "male";
    } else {
      entity.gender = "female";
    }
    entityId++;
    containerArray.push(entity);
    gameScene.addChild(entity);
  }
}

function gameLoop(delta) {
  //Update the current game state:
  state(delta);
}

function setup() {
  gameScene = new Container();
  app.stage.addChild(gameScene);

  //Create the `gameOver` scene
  gameOverScene = new Container();
  app.stage.addChild(gameOverScene);
  //Make the `gameOver` scene invisible when the game first starts
  gameOverScene.visible = false;

  textureResource = resources["images/life.json"].textures;

  //Make the plants
  const numberOfPlants = 20;
  addArrayOfEntitiesToScene(plants, numberOfPlants, textureResource["plant.png"], "plant",
    0, //speed
    200, //health
    0, //damage
    0, //sight
    0, //stealth
    600 //fertility rate
  );

  //Make the prey
  const numberOfPrey = 10;
  addArrayOfEntitiesToScene(preyArray, numberOfPrey, textureResource["prey.png"], "prey",
    1,
    150,
    1,
    10,
    0,
    600
  );

  //Make the predator
  const numberOfPredators = 5;
  addArrayOfEntitiesToScene(predators, numberOfPredators, textureResource["predator.png"], "predator",
    1,
    100,
    2,
    10,
    0,
    600
  );

  let style = new TextStyle({
    fontFamily: "Futura",
    fontSize: 32,
    fill: "white"
  });
  message = new Text("Extinction! Game Over!", style);
  message.x = 64;
  message.y = app.stage.height / 2 - 16;
  gameOverScene.addChild(message);

  //Set the game state
  state = play;

  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));
}

function contain(entity, container) {

  let collision = undefined;

  //Left
  if (entity.x < container.x) {
    entity.x = container.x;
    collision = "left";
  }

  //Top
  if (entity.y < container.y) {
    entity.y = container.y;
    collision = "top";
  }

  //Right
  if (entity.x + entity.width > container.width) {
    entity.x = container.width - entity.width;
    collision = "right";
  }

  //Bottom
  if (entity.y + entity.height > container.height) {
    entity.y = container.height - entity.height;
    collision = "bottom";
  }

  //Return the `collision` value
  return collision;
}

function setArrayOfEntitiesMovement(array) {
  array.forEach(function (entity) {
    entity.hunger -= 1;
    entity.x += entity.vx;
    entity.y += entity.vy;
    let entityHitsWall = contain(entity, { x: entity.width * 0.5, y: entity.height * 0.5, width: app.renderer.screen.width + (entity.width * 0.5), height: app.renderer.screen.height + + (entity.height * 0.5) });
    //console.log(app);
    if (entityHitsWall === "top" || entityHitsWall === "bottom") {
      entity.vy *= -1;
    } else if (entityHitsWall === "left" || entityHitsWall === "right") {
      entity.vx *= -1;
    }
  });
}

function moveEntityInOppositeDirection(entity) {
  if (entity.speed > 0) {
    if (entity.vy === 0 && entity.vx === 0) {
      entity.vx = entity.speed * entity.xDirection; // speed and direction (velocity) the entity is moving along the x axis
      entity.vy = entity.speed * entity.yDirection;
    } else {
      entity.vy *= -1;
      entity.vx *= -1;
    }    
  }
}
function setCurrentDirection(entity) {
  if (entity.vx > 0) {
    // Set direction to 1
    entity.xDirection = 1;
  } else {
    // Set direction to -1
    entity.xDirection = -1;
  }
  if (entity.vy > 0) {
    // Set direction to 1
    entity.yDirection = 1;
  } else {
    // Set direction to -1
    entity.yDirection = -1;
  }
}

function stopEntity(entity) {
  entity.vx = 0;
  entity.vy = 0;
}

function attackersDestroyTargets(targetArray, attackerArray) {
  targetArray.forEach(function (target) {
    attackerArray.forEach(function (attacker) {
      if (b.hitTestRectangle(target, attacker)) {
        if (attacker.hunger < attacker.maxHunger / 2) {
          target.alpha = 0.5;
          if (target.damage > 0) {
            attacker.alpha = 0.5;
          }
          target.health -= attacker.damage;
          attacker.health -= target.damage;
          if (attacker.hunger < attacker.maxHunger) {
            attacker.hunger += 10;
          }          
          setCurrentDirection(target);
          setCurrentDirection(attacker);          
          stopEntity(target);
          stopEntity(attacker);
        } 
      } 
      if (target.health === 0) {
        const index = targetArray.indexOf(target);
        if (index > -1) {
          targetArray.splice(index, 1);
        }
        gameScene.removeChild(target);
        //TODO: move all attackers
        moveEntityInOppositeDirection(attacker);
        attacker.alpha = 1;
      } else if (attacker.health === 0) {
        const index = attackerArray.indexOf(attacker);
        if (index > -1) {
          attackerArray.splice(index, 1);
        }
        gameScene.removeChild(attacker);
        //TODO: move all targets
        moveEntityInOppositeDirection(target);
        target.alpha = 1;
      }
    });
  });
}

function checkIfFertileAndBreed(breeders) {
  breeders.forEach(function (breeder1) {
    breeders.forEach(function (breeder2) {
      if (breeder1 && breeder2) { }
      if (b.hitTestRectangle(target, attacker)) {
        target.alpha = 0.5;
        target.health -= attacker.damage;
      } else {
        target.alpha = 1;
      }
      if (target.health === 0) {
        const index = targetArray.indexOf(target);
        if (index > -1) {
          targetArray.splice(index, 1);
        }
        gameScene.removeChild(target);
      }
    });
  });
}

function randomlyEvolvedProp(prop, maleParent, femaleParent) {
  let randomNumber = randomInt(1, 100);
  let randomMutation = 0;
  if (prop === "health" || prop === "fertilityRate") {
    randomMutation = randomInt(1, 50);
  } else {
    randomMutation = randomInt(1, 3);
  }
  let returnedProp = null;
  if (randomNumber > 50) {
    returnedProp = maleParent.prop;
  } else {
    returnedProp = femaleParent.prop;
  }  
  let oneOrTwo = randomInt(1, 2);
  if (oneOrTwo === 1) {
    returnedProp += randomMutation;  
  } else {
    returnedProp -= randomMutation;  
  }  
  if (returnedProp <= 0) {
    if (prop === "health" || prop === "fertilityRate") {
      returnedProp = 100;
    } else {
      returnedProp = 1;
    }    
  }
  return returnedProp;
}

function createEntity(maleParent, femaleParent) {  
  console.log("maleParent", maleParent, "femaleParent", femaleParent);
  let entity = new Sprite(maleParent._texture);
  entity.id = entityId; // used to keep track of which entity's which
  entity.name = randomlyEvolvedProp(name, maleParent, femaleParent);
  entity.x = femaleParent.x;
  entity.y = femaleParent.y;
  entity.height = randomlyEvolvedProp(height, maleParent, femaleParent);
  entity.width = randomlyEvolvedProp(width, maleParent, femaleParent);
  entity.anchor.x = 0.5;
  entity.anchor.y = 0.5;
  entity.speed = randomlyEvolvedProp(speed, maleParent, femaleParent);
  entity.xDirection = pickRandomDirection(); 
  entity.vx = entity.speed * entity.xDirection; 
  entity.yDirection = pickRandomDirection(); 
  entity.vy = entity.speed * entity.yDirection; 
  let health = randomlyEvolvedProp(health, maleParent, femaleParent);
  entity.maxHealth = health;
  entity.health = health;
  let hunger = randomlyEvolvedProp(maxHunger, maleParent, femaleParent);
  entity.maxHunger = hunger;
  entity.hunger = hunger;
  entity.damage = randomlyEvolvedProp(damage, maleParent, femaleParent);
  entity.sight = randomlyEvolvedProp(sight, maleParent, femaleParent);
  entity.stealth = randomlyEvolvedProp(stealth, maleParent, femaleParent);
  entity.fertile = true; 
  entity.fertilityRate = randomlyEvolvedProp(fertilityRate, maleParent, femaleParent);
  //TODO: Let user specify how many of each gender
  if (entityId % 2) {
    entity.gender = "male";
  } else {
    entity.gender = "female";
  }
  entityId++;
  containerArray.push(entity);
  gameScene.addChild(entity);
}

function play(delta) {
  //Set up prey and predators
  setArrayOfEntitiesMovement(preyArray);
  setArrayOfEntitiesMovement(predators);

  // Check all prey against all other prey, if male and female and fertile then mate else do nothing
  preyArray.forEach(function (prey1) {
    preyArray.forEach(function (prey2) {
      if (b.hitTestRectangle(prey1, prey2)) {
        if (((prey1.gender === "male" && prey2.gender === "female") || (prey2.gender === "male" && prey1.gender === "female")) &&
          prey1.fertile === true &&
          prey2.fertile === true ) 
        {
          if (prey1.gender === "male" && prey2.gender === "female") {
            createEntity(prey1, prey2);
          } else {
            createEntity(prey2, prey1);
          }         
        }
      }
    });
  });

  //TODO: Check if not moving and not attacking then move

  attackersDestroyTargets(plants, preyArray);
  attackersDestroyTargets(preyArray, predators);

  if (plants.length === 0 || preyArray.length === 0 || predators.length === 0) {
    state = end;
  }
}

function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
}

/* Helper functions */

// //The `keyboard` helper function
// function keyboard(keyCode) {
//   var key = {};
//   key.code = keyCode;
//   key.isDown = false;
//   key.isUp = true;
//   key.press = undefined;
//   key.release = undefined;
//   //The `downHandler`
//   key.downHandler = function(event) {
//     if (event.keyCode === key.code) {
//       if (key.isUp && key.press) key.press();
//       key.isDown = true;
//       key.isUp = false;
//     }
//     event.preventDefault();
//   };

//   //The `upHandler`
//   key.upHandler = function(event) {
//     if (event.keyCode === key.code) {
//       if (key.isDown && key.release) key.release();
//       key.isDown = false;
//       key.isUp = true;
//     }
//     event.preventDefault();
//   };

//   //Attach event listeners
//   window.addEventListener(
//     "keydown", key.downHandler.bind(key), false
//   );
//   window.addEventListener(
//     "keyup", key.upHandler.bind(key), false
//   );
//   return key;
// }

