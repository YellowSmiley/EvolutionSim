// Globals:
let entityId = 1;
let organismsArray = [];
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

var rectA = { x: 2, y: 5, width: 6, height: 6 };
var rectB = { x: 4, y: 10, width: 6, height: 6 };
var area = { min: 0, max: 100 };

var overlap = rectOverlap(rectA, rectB);
alert("Does rectA and rectB overlap? " + overlap);

if (overlap) {
  if (rectA.y >= rectB.y) {
    if (increaseY(rectA.width, rectB.y + rectB.height, area.max)) {
      rectA.y = rectB.y + rectB.height + 1;
    }
    else if (rectA.y - rectB.height > area.min) {
      rectB.y = rectA.y - rectB.height;
    }
  }
  else {
    if (increaseY(rectB.width, rectA.y + rectA.height, area.max)) {
      rectB.y = rectA.y + rectA.height + 1;
    }
    else if (rectB.y - rectA.height > area.min) {
      rectA.y = rectB.y - rectA.height;
    }
  }
}

alert("Does rectA and rectB overlap? " + rectOverlap(rectA, rectB));

function increaseY(width, bottomEdge, Max) {
  return (bottomEdge + width < Max);
}

function valueInRange(value, min, max) {

  return (value <= max) && (value >= min);

}

function rectOverlap(A, B) {
  var xOverlap = valueInRange(A.x, B.x, B.x + B.width) ||
    valueInRange(B.x, A.x, A.x + A.width);

  var yOverlap = valueInRange(A.y, B.y, B.y + B.height) ||
    valueInRange(B.y, A.y, A.y + A.height);

  return xOverlap && yOverlap;
}

//Game funcs
function addMultipleEntitiesToAnArray(containerArray, amount, name, colour, speed, health, damage, sight, stealth, fertilityRate) {
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
    for (let arrayEntity of containerArray) {
      if (x >= arrayEntity.x && x <= arrayEntity.x + arrayEntity.width && y >= arrayEntity.y && y <= arrayEntity.y + arrayEntity.height) {
        console.log("Entity", entityId + ": x", x, "y", y, "hit Entity", arrayEntity);
        x = randomInt(20, scene.width - 20);
        y = randomInt(20, scene.height - 20);
      }
    }
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

    addMultipleEntitiesToAnArray(organismsArray, 10, "plant", "green", 0, 100, 0, 0, 0, 1000);
    addMultipleEntitiesToAnArray(organismsArray, 10, "prey", "blue", 1, 100, 1, 10, 0, 1000);
    addMultipleEntitiesToAnArray(organismsArray, 10, "predator", "red", 1, 100, 1, 10, 0, 1000);
    drawObjects(ctx, organismsArray);
  }
}