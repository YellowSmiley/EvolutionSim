export function changeEventHandler(event) {
  // You can use “this” to refer to the selected element.
  if (!event.target.value) {
    alert("All fields must have a value");
    if (this.id === "amount") {
      event.target.value = amountToSpawn;
    } else if (this.id === "size") {
      event.target.value = size;
    } else if (this.id === "speed") {
      event.target.value = speed;
    } else if (this.id === "fertilityRate") {
      event.target.value = fertilityRate;
    } else if (this.id === "fertilityProgress") {
      event.target.value = fertilityProgress;
    } else if (this.id === "totalHunger") {
      event.target.value = totalHunger;
    } else if (this.id === "health") {
      event.target.value = health;
    } else if (this.id === "damage") {
      event.target.value = damage;
    } else if (this.id === "defence") {
      event.target.value = defence;
    }
  } else {
    if (this.id === "amount") {
      amountToSpawn = event.target.value;
    } else if (this.id === "size") {
      size = event.target.value;
    } else if (this.id === "speed") {
      speed = event.target.value;
    } else if (this.id === "fertilityRate") {
      fertilityRate = event.target.value;
    } else if (this.id === "fertilityProgress") {
      fertilityProgress = event.target.value;
    } else if (this.id === "totalHunger") {
      totalHunger = event.target.value;
    } else if (this.id === "health") {
      health = event.target.value;
    } else if (this.id === "damage") {
      damage = event.target.value;
    } else if (this.id === "defence") {
      defence = event.target.value;
    }
  }
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function setError(message) {
  errorText.removeAttribute("style");
  errorText.innerHTML = message;
}

export function isCollide(a, b) {
  return !(
    a.y + a.height < b.y ||
    a.y > b.y + b.height ||
    a.x + a.width < b.x ||
    a.x > b.x + b.width
  );
}
