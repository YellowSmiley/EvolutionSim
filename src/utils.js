export function changeEventHandler(event) {
  // TODO: Add validation and sanitisation to entered values
  if (!event.target.value) {
    alert("All fields must have a value");
    if (this.id === "amount") {
      event.target.value = amountToSpawn;
    } else if (this.id === "size") {
      event.target.value = gSize;
    } else if (this.id === "speed") {
      event.target.value = gSpeed;
    } else if (this.id === "fertilityRate") {
      event.target.value = gFertilityRate;
    } else if (this.id === "fertilityProgress") {
      event.target.value = gFertilityProgress;
    } else if (this.id === "totalHunger") {
      event.target.value = gTotalHunger;
    } else if (this.id === "health") {
      event.target.value = gHealth;
    } else if (this.id === "damage") {
      event.target.value = gDamage;
    } else if (this.id === "defence") {
      event.target.value = gDefence;
    } else if (this.id === "sight") {
      event.target.value = gSight;
    } else if (this.id === "stealth") {
      event.target.value = gStealth;
    }
  } else {
    if (this.id === "amount") {
      amountToSpawn = parseInt(event.target.value, 10);
    } else if (this.id === "size") {
      gSize = parseInt(event.target.value, 10);
    } else if (this.id === "speed") {
      gSpeed = parseInt(event.target.value, 10);
    } else if (this.id === "fertilityRate") {
      gFertilityRate = parseInt(event.target.value, 10);
    } else if (this.id === "fertilityProgress") {
      gFertilityProgress = parseInt(event.target.value, 10);
    } else if (this.id === "totalHunger") {
      gTotalHunger = parseInt(event.target.value, 10);
    } else if (this.id === "health") {
      gHealth = parseInt(event.target.value, 10);
    } else if (this.id === "damage") {
      gDamage = parseInt(event.target.value, 10);
    } else if (this.id === "defence") {
      gDefence = parseInt(event.target.value, 10);
    } else if (this.id === "sight") {
      gSight = parseInt(event.target.value, 10);
    } else if (this.id === "stealth") {
      gStealth = parseInt(event.target.value, 10);
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
