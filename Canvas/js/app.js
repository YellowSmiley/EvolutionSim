// Globals:
let entityId = 1;
let plantsArray = []
let preyArray = []
let predatorArray = [];
const scene = {
  width: 800,
  height: 600
}
// Utils
function randomInt(min, max) {
  //console.log("Running randomInt(" + min + ", " + max + ")!")
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomDirection() {
  let i = randomInt(1, 3);
  let direction = null;
  if (i === 2) {
    direction = 1;
  } else if (i === 3) {
    direction = 0;
  } else {
    direction = -1;
  }
  return direction;
}

//Game funcs
function createArrayOfEntities(containerArray, amount, name, colour, speed, health, damage, sight, stealth, fertilityRate) {
  for (i = 0; i < amount; i++) {
    let xDirection = pickRandomDirection();
    let yDirection = pickRandomDirection();
    if (xDirection === 0 && yDirection === 0) {
      let oneOrTwo = randomInt(1, 2);
      if (oneOrTwo === 1) {
        xDirection = -1;
      } else {
        yDirection = -1;
      }
    }
    let gender = "";
    if (entityId % 2) {
      gender = "male";
    } else {
      gender = "female";
    }   
    let x = randomInt(20, scene.width - 20);
    let y = randomInt(20, scene.height - 20);
    let entity = {
      id: entityId,
      name: name,
      colour: colour,
      height: 20,
      width: 20,
      x: x,
      y: y,
      xDirection: xDirection,
      yDirection: yDirection,
      vx: speed * xDirection,
      vy: speed * yDirection,
      gender: gender,
      speed: speed,
      maxHealth: health,
      health: health,
      maxHunger: 1000,
      hunger: 1000,
      damage: damage,
      sight: sight,
      stealth: stealth,
      fertile: true,
      fertilityRate: fertilityRate
    }    
    containerArray.push(entity);
    //console.log("createObject() entity =", entity);
    entityId++;
  }
}

function drawObjects(canvasContext, containerArray) {
  console.log("Drawing", containerArray);
  for (i = 0; containerArray.length; i++) {
    canvasContext.fillStyle = containerArray[i].colour;
    canvasContext.fillRect(containerArray[i].x, containerArray[i].y, containerArray[i].width, containerArray[i].height);
  }
}

function draw() {
  console.log("Running Draw()");
  var canvas = document.getElementById('tutorial');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    // let testRect = {
    //   x: 10,
    //   y: 10,
    //   colour: "red",
    //   height: 10,
    //   width: 10
    // }

    // let testArray = [];
    // for (i = 0; i < 10; i++) {
    //   testArray.push(testRect);
    //   //console.log(testArray);
    //   testRect.x = 10 * i;
    // }

    // for (i = 0; testArray.length; i++) {
    //   console.log(testArray[i]);
    //   ctx.fillStyle = testArray[i].colour;
    //   ctx.fillRect(testArray[i].x, testArray[i].y * i, testArray[i].height, testArray[i].width);
    // };    

    createArrayOfEntities(plantsArray, 10, "plant", "green", 0, 100, 0, 0, 0, 1000);
    createArrayOfEntities(preyArray, 10, "prey", "blue", 1, 100, 1, 10, 0, 1000);
    createArrayOfEntities(predatorArray, 10, "predator", "red", 1, 100, 1, 10, 0, 1000);
    drawObjects(ctx, plantsArray);
    drawObjects(ctx, preyArray);
    drawObjects(ctx, predatorArray);
  }
}