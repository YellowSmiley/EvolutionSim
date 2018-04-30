// Globals:
let entityId = 1;
let organismsArray = [];
let canvas = null;
let ctx = null;
const scene = {
  width: 800,
  height: 600
}

// Utils
function randomInt(min, max) {
  //console.log("Running randomInt(" + min + ", " + max + ")!")
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function valueInRange(value, min, max) {
  return (value <= max) && (value >= min);
}

//Game funcs
function checkElementsAreOverlapping(A, B) {
  const xOverlap = valueInRange(A.x, B.x, B.x + B.width) || valueInRange(B.x, A.x, A.x + A.width);
  const yOverlap = valueInRange(A.y, B.y, B.y + B.height) || valueInRange(B.y, A.y, A.y + A.height);
  return xOverlap && yOverlap;
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
    const height = 20;
    const width = 20;
    for (let arrayEntity of containerArray) {
      const rectA = { x: x, y: y, height: height, width: width };
      const isOverlapping = checkElementsAreOverlapping(rectA, arrayEntity);
      if (isOverlapping) {
        //console.log("Entity", rectA, "overlapping Entity:", arrayEntity);
        //TODO: Find better way of moving without potentially moving into the place of another entity
        x = randomInt(20, scene.width - 20);
        y = randomInt(20, scene.height - 20);
      }
    }
    let entity = {
      id: entityId,
      name: name,
      colour: colour,
      height: height,
      width: width,
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
      fertilityRate: fertilityRate,
      isDead: false
    }
    containerArray.push(entity);
    //console.log("createObject() entity =", entity);
    entityId++;
  }
}

function drawObjects(canvasContext, containerArray) {
  //console.log("Drawing", containerArray);
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < containerArray.length; i++) {
    canvasContext.fillStyle = containerArray[i].colour;
    canvasContext.fillRect(containerArray[i].x, containerArray[i].y, containerArray[i].width, containerArray[i].height);
  }
}

function reverseElementIfOnSceneBoundaries(element) {
  if (element.x === 1 || element.x + element.width === scene.width) {
    element.vx *= -1;
  }
  if (element.y === 1 || element.y + element.height === scene.height) {
    element.vy *= -1;
  }
}

function killElementWithNoHealth(element) {
  if (element.health === 0) {
    element.isDead = true;
  }
}

function validTarget(elementA, elementB) {
  let valid = false;
  if (((elementA.name === "prey" && elementB.name === "plant") || (elementA.name === "plant" && elementB.name === "prey")) ||
    ((elementA.name === "prey" && elementB.name === "predator") || (elementA.name === "predator" && elementB.name === "prey"))) {
    valid = true;
  }
  return valid;
}

function fighting(elementA, elementB) {
  if (elementA.health > 0 && elementB.health > 0) {
    elementA.vx = 0;
    elementA.vy = 0;
    elementB.vx = 0;
    elementB.vy = 0;
    elementA.health -= elementB.damage;
    elementB.health -= elementA.damage;
  }
  killElementWithNoHealth(elementA);
  killElementWithNoHealth(elementB);
}

function moveElementsInOppositeDirections(elementA, elementB) {
  //TODO: calculate direction hit and move each element in opposite directions
}

function moveElementAtCurrentVelocity(element) {
  element.x += element.vx;
  element.y += element.vy;
}

function checkElementIsInContactWithAnother(element) {
  for (let organism of organismsArray) {
    if (checkElementsAreOverlapping(element, organism)) {
      if (validTarget(element, organism)) {
        fighting(element, organism);
      } else {
        moveElementsInOppositeDirections(element, organism);
      }
    }
  }
}

const mouseUpHandler = function (event) {
  const x = event.pageX - canvas.offsetLeft;
  const y = event.pageY - canvas.offsetTop;
  //console.log("Click! x", event.pageX, "y", event.pageY);
  for (let element of organismsArray) {
    // console.log(x ,">=", element.x, "&&", x, "<=", element.x, "+", element.width, "&&", y, ">=", element.y, "&&", y, "<=", element.y, "+", element.height,
    // x >= element.x && x <= element.x + element.width && y >= element.y && y <= element.y + element.height);
    if (x >= element.x && x <= element.x + element.width && y >= element.y && y <= element.y + element.height) {
      console.log("Clicked:", element);
      break;
    }
  };
}

function init() {
  canvas = document.getElementById('tutorial');
  ctx = canvas.getContext('2d');
  addMultipleEntitiesToAnArray(organismsArray, 10, "plant", "green", 0, 100, 0, 0, 0, 1000);
  addMultipleEntitiesToAnArray(organismsArray, 10, "prey", "blue", 1, 100, 1, 10, 0, 1000);
  addMultipleEntitiesToAnArray(organismsArray, 10, "predator", "red", 1, 100, 1, 10, 0, 1000);
  window.requestAnimationFrame(draw);
}

function draw() {
  //console.log("Running Draw()");  
  if (canvas.getContext) {
    drawObjects(ctx, organismsArray);
    for (let element of organismsArray) {
      reverseElementIfOnSceneBoundaries(element);
      moveElementAtCurrentVelocity(element);
      checkElementIsInContactWithAnother(element);
    }
    canvas.addEventListener('mouseup', mouseUpHandler, false);
    window.requestAnimationFrame(draw);
  }
}