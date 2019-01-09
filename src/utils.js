function checkInp(value) {
  if (isNaN(value)) {
    alert("Input must be a number");
    return false;
  } else {
    return true;
  }
}

export function changeEventHandler(event) {
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
      checkInp(event.target.value)
        ? (amountToSpawn = parseInt(event.target.value, 10))
        : (event.target.value = amountToSpawn);
    } else if (this.id === "size") {
      checkInp(event.target.value)
        ? (gSize = parseInt(event.target.value, 10))
        : (event.target.value = gSize);
    } else if (this.id === "speed") {
      checkInp(event.target.value)
        ? (gSpeed = parseInt(event.target.value, 10))
        : (event.target.value = gSpeed);
    } else if (this.id === "fertilityRate") {
      checkInp(event.target.value)
        ? (gFertilityRate = parseInt(event.target.value, 10))
        : (event.target.value = gFertilityRate);
    } else if (this.id === "fertilityProgress") {
      checkInp(event.target.value)
        ? (gFertilityProgress = parseInt(event.target.value, 10))
        : (event.target.value = gFertilityProgress);
    } else if (this.id === "totalHunger") {
      checkInp(event.target.value)
        ? (gTotalHunger = parseInt(event.target.value, 10))
        : (event.target.value = gTotalHunger);
    } else if (this.id === "health") {
      checkInp(event.target.value)
        ? (gHealth = parseInt(event.target.value, 10))
        : (event.target.value = gHealth);
    } else if (this.id === "damage") {
      checkInp(event.target.value)
        ? (gDamage = parseInt(event.target.value, 10))
        : (event.target.value = gDamage);
    } else if (this.id === "defence") {
      checkInp(event.target.value)
        ? (gDefence = parseInt(event.target.value, 10))
        : (event.target.value = gDefence);
    } else if (this.id === "sight") {
      checkInp(event.target.value)
        ? (gSight = parseInt(event.target.value, 10))
        : (event.target.value = gSight);
    } else if (this.id === "stealth") {
      checkInp(event.target.value)
        ? (gStealth = parseInt(event.target.value, 10))
        : (event.target.value = gStealth);
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
