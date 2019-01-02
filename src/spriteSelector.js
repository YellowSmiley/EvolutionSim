const selectedSpriteInfo = document.getElementById("selectedSpriteInfo");

export function clearSelectedSpriteAndInterval(sprite) {
  selectedSpriteInfo.innerHTML = "";
  clearInterval(sprite.interval);
}

function startGame() {
  // Add game screen to sim div
  const simDiv = document.getElementById("sim");
  const leftDiv = document.createElement("div");
  leftDiv.className = "left padded-content";
  const menuUl = document.createElement("ul");
  menuUl.className = "menu";
  const pauseSpanLi = document.createElement("li");
  const pauseSpan = document.createElement("span");
  pauseSpan.className = "interactive-span";
  pauseSpan.onclick = "togglePause()";
  pauseSpanLi.append(pauseSpan);
  menuUl.append(pauseSpanLi);
  const restartSpanLi = document.createElement("li");
  const restartSpan = document.createElement("span");
  restartSpan.className = "interactive-span";
  restartSpan.onclick = "restart()";
  restartSpanLi.append(restartSpan);
  menuUl.append(restartSpanLi);
  leftDiv.append(menuUl);
  const canvas = ocument.createElement("canvas");
  canvas.id = "game";
  canvas.width = "800";
  canvas.height = "600";
  leftDiv.append(canvas);
  simDiv.append(leftDiv);
  const rightDiv = document.createElement("div");
  rightDiv.className = "right";
  const infoUl = document.createElement("ul");
  infoUl.className = "padded-content";
  const errorTextLi = document.createElement("li");
  errorTextLi.id = "errorText";
  errorTextLi.style = "display:none;";
  infoUl.append(errorTextLi);
  const spriteCountLi = document.createElement("li");
  const spriteCountLiText = document.createTextNode("Sprites: ");
  spriteCountLi.append(spriteCountLiText);
  const spriteCountSpan = document.createElement("span");
  spriteCountSpan.id = "spriteCount";
  spriteCountSpan.innerHTML = "0";
  spriteCountLi.append(spriteCountSpan);
  infoUl.append(spriteCountLi);
  const timerLi = document.createElement("li");
  const timerLiText = document.createTextNode("Timer: ");
  timerLi.append(timerLiText);
  const timerHours = document.createElement("span");
  timerHours.id = "hours";
  timerHours.innerHTML = "0";
  timerLi.append(timerHours);
  const timerLiHourMinuteCol = document.createTextNode(":");
  timerLi.append(timerLiHourMinuteCol);
  const timerMinutes = document.createElement("span");
  timerMinutes.id = "minutes";
  timerMinutes.innerHTML = "0";
  timerLi.append(timerMinutes);
  const timerLiMinuteSecondCol = document.createTextNode(":");
  timerLi.append(timerLiMinuteSecondCol);
  const timerSeconds = document.createElement("span");
  timerSeconds.id = "seconds";
  timerSeconds.innerHTML = "0";
  timerLi.append(timerSeconds);
  spriteCountLi.append(spriteCountSpan);
  infoUl.append(timerLi);
  rightDiv.append(infoUl);
  const selectedSpriteInfoDiv = document.createElement("div");
  selectedSpriteInfoDiv.class = "padded-content";
  selectedSpriteInfoDiv.id = "selectedSpriteInfo";
  rightDiv.append(selectedSpriteInfoDiv);
  simDiv.append(rightDiv);

  //TODO: Add starting param inputs, switch to game once happy and enter input values into starting sprites
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
    "sight"
  ];
  Object.entries(sprite).map(prop => {
    for (let i = 0; i < shownProps.length - 1; i++) {
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
  sprite.color = "green";
  sprite.selected = "true";
  displaySpriteProps(sprite);
  sprite.interval = setInterval(() => {
    if (!isTimerPaused) {
      displaySpriteProps(sprite);
    }
  }, 100);
}
