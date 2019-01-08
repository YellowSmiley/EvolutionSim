const selectedSpriteInfo = document.getElementById("selectedSpriteInfo");

export function clearSelectedSpriteAndInterval(sprite) {
  selectedSpriteInfo.innerHTML = "";
  clearInterval(sprite.interval);
}

function displaySpriteProps(sprite) {
  selectedSpriteInfo.innerHTML = "";
  let listOfSprites = document.createElement("ul");
  const shownProps = [
    "height",
    "width",
    "color",
    "speed",
    "isFertile",
    "fertilityRate",
    "fertilityProgress",
    "hunger",
    "totalHunger",
    "health",
    "totalHealth",
    "damage",
    "defence",
    "sight",
    "stealth"
  ];
  Object.entries(sprite).map(prop => {
    for (let i = 0; i < shownProps.length; i++) {
      if (prop[0] === shownProps[i]) {
        let li = document.createElement("li");
        let liContent = document.createTextNode(prop[0] + ": " + prop[1]);
        li.appendChild(liContent);
        listOfSprites.appendChild(li);
        break;
      }
    }
  });
  selectedSpriteInfo.appendChild(listOfSprites);
}

export function handleSpriteOnClick(sprite) {
  sprites.forEach(otherSprite => {
    if (sprite !== otherSprite) {
      otherSprite.selected = "false";
      clearInterval(otherSprite.interval);
      otherSprite.color = "red";
    }
  });
  if (sprite.selected !== "true") {
    clearInterval(sprite);
    sprite.color = "green";
    sprite.selected = "true";
    displaySpriteProps(sprite);
    sprite.interval = setInterval(() => {
      if (!isTimerPaused) {
        displaySpriteProps(sprite);
      }
    }, 100);
  }
}
