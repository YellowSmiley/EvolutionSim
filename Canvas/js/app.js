let entityId = 1; 
let plantsArray = [] 
let preyArray = []
let predatorArray = [];

function createObject(name, colour, speed, health, damage, sight, stealth, fertilityRate) {
  let entity = {};
  entity.id = entityId;
  entity.name = name;
  entity.colour = colour;
  entity.x = randomInt(entity.width, app.renderer.screen.width - entity.width);
  entity.y = randomInt(entity.height, app.renderer.screen.height - entity.height);
  entity.height = 20;
  entity.width = 20;
  entity.speed = speed;
  entity.xDirection = pickRandomDirection();
  entity.vx = entity.speed * entity.xDirection;
  entity.yDirection = pickRandomDirection();
  entity.vy = entity.speed * entity.yDirection;
  entity.maxHealth = health;
  entity.health = health;
  entity.maxHunger = 1000;
  entity.hunger = 1000;
  entity.damage = damage;
  entity.sight = sight;
  entity.stealth = stealth;
  entity.fertile = true;
  entity.fertilityRate = fertilityRate;
  if (entityId % 2) {
    entity.gender = "male";
  } else {
    entity.gender = "female";
  }
  entityId++;
  return entity;
}

function createArrayOfObject(containerArray, amount, name, colour, speed, health, damage, sight, stealth, fertilityRate) {
  let obj = null;
  let array = [];
  for (let i; i <= amount; i++) {
    obj = createObject(name, colour, speed, health, damage, sight, stealth, fertilityRate);
    array.push(obj);
  }  
  return array;
}

function drawObjects(canvasContext, containerArray, amount, name, speed, health, damage, sight, stealth, fertilityRate) {  
  containerArray = createArrayOfObject(containerArray, amount, name, speed, health, damage, sight, stealth, fertilityRate);
  for (obj of containerArray) {
    canvasContext.fillStyle = obj.colour;
    // fillRect(x, y, width, height);
    canvasContext.fillRect(obj.x, obj.y, obj.width, obj.height);
  }
}

function draw() {
  var canvas = document.getElementById('tutorial');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    drawObjects(ctx, plantsArray, 10, "plant", 0, 100, 0, 0, 0, 1000);    
    drawObjects(ctx, preyArray, 10, "prey", 1, 100, 1, 10, 0, 1000);    
    drawObjects(ctx, predatorArray, 10, "predator", 1, 100, 1, 10, 0, 1000);    
  }
}