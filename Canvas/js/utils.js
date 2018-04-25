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