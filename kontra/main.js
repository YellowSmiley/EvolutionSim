kontra.init();

let sprites = [];
let isColliding = [];

function createSprite(x, y) {
  let sprite = kontra.sprite({
    x: x,
    y: y,
    color: "red",
    width: 25,
    height: 25,
    ttl: Infinity,
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2
  });
  sprites.push(sprite);
  isColliding.push(false);
}

for (let i = 0; i < 50; i++) {
  createSprite(50 * i, 100);
}

function isCollide(a, b) {
  return !(
    a.y + a.height < b.y ||
    a.y > b.y + b.height ||
    a.x + a.width < b.x ||
    a.x > b.x + b.width
  );
}

let loop = kontra.gameLoop({
  update() {
    sprites.map(sprite => {
      sprite.update();
      // sprite is beyond the left edge
      if (sprite.x < 0) {
        sprite.x = kontra.canvas.width;
      }
      // sprite is beyond the right edge
      else if (sprite.x > kontra.canvas.width) {
        sprite.x = 0;
      }
      // sprite is beyond the top edge
      if (sprite.y < 0) {
        sprite.y = kontra.canvas.height;
      }
      // sprite is beyond the bottom edge
      else if (sprite.y > kontra.canvas.height) {
        sprite.y = 0;
      }
    });

    isColliding = isColliding.map(val => false);

    //collision detection
    for (let i = 0; i < sprites.length - 1; i++) {
      for (let j = i + 1; j < sprites.length; j++) {
        let sprite1 = sprites[i];
        let sprite2 = sprites[j];
        if (isCollide(sprite1, sprite2)) {
          isColliding[i] = true;
          isColliding[j] = true;
        }
      }
    }
    //sprites = sprites.filter(sprite => sprite.isAlive());
    sprites.forEach(
      (sprite, i) => (sprite.color = isColliding[i] ? "green" : "red")
    );
  },
  render() {
    sprites.map(sprite => sprite.render());
  }
});
loop.start();
