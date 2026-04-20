let player = document.getElementById("player");
let game = document.getElementById("game");

let score, coins, lives, speed;
let y = 0, velocity = 0, gravity = 0.6;
let jumping = false;
let running = false;
let shield = false;

// START GAME
function startGame() {
  document.getElementById("startScreen").style.display = "none";
  game.style.display = "block";

  score = 0;
  coins = 0;
  lives = 5;
  speed = 6;
  running = true;

  gameLoop();
  spawnLoop();
}

// RESTART
function restart() {
  location.reload();
}

// JUMP
function jump() {
  if (!jumping) {
    velocity = -12;
    jumping = true;
  }
}

document.addEventListener("click", jump);
document.addEventListener("touchstart", jump);
document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});

// GAME LOOP
function gameLoop() {
  if (!running) return;

  velocity += gravity;
  y += velocity;

  if (y > 0) {
    y = 0;
    jumping = false;
  }

  player.style.bottom = (80 - y) + "px";

  score++;
  updateHUD();

  // Increase difficulty
  if (score % 500 === 0) speed += 1;

  requestAnimationFrame(gameLoop);
}

// SPAWN LOOP
function spawnLoop() {
  setInterval(() => spawn("coin"), 1500);
  setInterval(() => spawn("enemy"), 2500);
  setInterval(() => spawn("power"), 7000);
}

// SPAWN OBJECT
function spawn(type) {
  let el = document.createElement("div");
  el.className = type;

  el.style.left = "100vw";

  if (type === "enemy") {
    el.style.bottom = "80px";
  } else {
    el.style.top = Math.random() * 60 + "%";
  }

  game.appendChild(el);
  move(el, type);
}

// MOVE OBJECT
function move(el, type) {
  let pos = window.innerWidth;

  let m = setInterval(() => {
    pos -= speed;
    el.style.left = pos + "px";

    if (collide(player, el)) {
      if (type === "coin") {
        coins++;
        score += 20;
      } 
      else if (type === "enemy") {
        if (!shield) lives--;
      } 
      else if (type === "power") {
        activateShield();
      }

      el.remove();
      clearInterval(m);
    }

    if (pos < -50) {
      el.remove();
      clearInterval(m);
    }

  }, 30);
}

// SHIELD POWER
function activateShield() {
  shield = true;
  player.style.background = "lime";

  setTimeout(() => {
    shield = false;
    player.style.background = "cyan";
  }, 5000);
}

// COLLISION
function collide(a, b) {
  let r1 = a.getBoundingClientRect();
  let r2 = b.getBoundingClientRect();

  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}

// HUD
function updateHUD() {
  document.getElementById("score").innerText = score;
  document.getElementById("coins").innerText = coins;
  document.getElementById("lives").innerText = lives;

  if (lives <= 0) {
    running = false;
    document.getElementById("gameOver").style.display = "flex";
  }
}
