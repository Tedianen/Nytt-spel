const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
canvas.height = SCREENHEIGHT;
canvas.width = SCREENWIDTH;


var slider = document.getElementById("myRange");
var sliderValue = slider.value;

slider.addEventListener("input", function() {
  sliderValue = slider.value;
  console.log(sliderValue);
});

var slider2 = document.getElementById("myRange2");
var slider2Value = slider2.value;

slider2.addEventListener("input", function() {
  slider2Value = slider2.value;
  console.log(slider2Value);
});

var bullet = null;
var bullet2 = null;
     
// Event listener to shoot a bullet when spacebar is pressed
document.addEventListener('keydown', function(event) {
  if (event.code === 'Enter') {
  if (!bullet) {
  bullet = {
    x: player.x + player.width / 3,
    y: player.y + player.height / 5,
    width: 7,
    height: 5,
    color: 'black',
    speedX: 10,
    speedY:5,
    // gravity: 0.15,
    gravity: sliderValue,
    // speedY:0,
    // gravity: 0,
    gravitySpeed:0,
    damage:10,
  };
  }
  console.log("bullet")
  }
  if (event.code === 'Space') {
  if (!bullet2) {
    bullet2 = {
      x: player2.x + player.width / 2,
      y: player2.y + player2.height / 5,
      width: 7,
      height: 5,
      color: 'black',
      speedX: 10,
      speedY:5,
      // gravity: 0.5,   
      // gravity: slider2Value,
      // speedY:0,
      // gravity: 0.15,
      gravitySpeed:0,
      damage:10,
    };
  }
  console.log("bullet2")
  }
});

//-----------------------------------  player  --------------------------------

const image1 = document.getElementById("image1");

// Player object
let player = {
  x: canvas.width / 1.3,
  y: canvas.height /1.5,
  width: 100,
  height: 50,
  color: "#FFFFFF00",
  dx: 2,
  hp:200,
};
// Function to draw the player
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}
// Function to draw the bullet
function drawBullet() {
  if (bullet) {
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  }
}
// Function to update the game state
function update() {
  // Move the bullet
  if (bullet) {
    bullet.gravitySpeed += bullet.gravity;
    bullet.x -= bullet.speedX;
    // bullet.y += bullet.speedY + bullet.gravitySpeed;
    bullet.y += bullet.gravitySpeed - bullet.speedY;
    if (
      bullet.x < player2.x + player2.width &&
      bullet.x + bullet.width > player2.x &&
      bullet.y < player2.y + player2.height &&
      bullet.y + bullet.height > player2.y
    ){
      player.hp = player.hp - bullet.damage
      console.log(player.hp)
    }
    if (bullet.x < 0 || bullet.y > canvas.height /1.3 ) {
      bullet = null;
    }
    if (player.hp < 0){
      console.log(player.hp)
      console.log("Player is dead")
    }
  }
}
// -----------------------    Player movement    ----------------------
let directions = {
  left: false,
  right: false,
};
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      directions.left = true;
      break;
    case "ArrowRight":
      directions.right = true;
      break;
      default:
      break;
  }
});
document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      directions.left = false;
      break;
    case "ArrowRight":
      directions.right = false;
      break;
    default:
      break;
  }
});
// -------------------------------   Player 2  -----------------------------------------
const image2 = document.getElementById("image2");
// Player2 object
let player2 = {
  x: canvas.width / 5,
  y: canvas.height /1.5,
  width: 100,
  height: 50,
  color: 'FFFFFF00',
  dx: 2,
  hp:200,
};
// Function to draw the player
function drawPlayer2() {
  ctx.fillStyle = player2.color;
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}
// Function to draw the bullet
function drawBullet2() {
  if (bullet2) {
    ctx.fillStyle = bullet2.color;
    ctx.fillRect(bullet2.x, bullet2.y, bullet2.width, bullet2.height);
  }
}
// Function to update the game state
function update2() {
  // Move the bullet
  if (bullet2) {
    bullet2.gravitySpeed += bullet2.gravity;
    bullet2.x += bullet2.speedX;
    // bullet2.y += bullet2.speedY + bullet2.gravitySpeed;
    bullet2.y += bullet2.gravitySpeed - bullet2.speedY;
    if (
      bullet2.x < player.x + player.width &&
      bullet2.x + bullet2.width > player.x &&
      bullet2.y < player.y + player.height &&
      bullet2.y + bullet2.height > player.y
    ){
      player2.hp = player2.hp - bullet2.damage
      console.log(player2.hp)
    }
    if (bullet2.x > innerWidth|| bullet2.y > canvas.height /1.3 ) {
      bullet2 = null;
    }
    if (player2.hp < 0){
      console.log(player2.hp)
      console.log("Player 2 is dead")
    }
  }
}
// -----------------------    Player2 movement    ----------------------
let directions2 = {
  left: false,
  right: false,
};
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "a":
      directions2.left = true;
      break;
    case "d":
      directions2.right = true;
      break;
      default:
      break;
  }
});
document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
      directions2.left = false;
      break;
    case "d":
      directions2.right = false;
      break;
    default:
      break;
  }
});

// Function to render the game
function render() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ----------------- Player movement -------------------------
  if (directions.right) {
    player.x += player.dx;
  } else if (directions.left) {
    player.x -= player.dx;
  } 
  // Check if the player is outside the left edge of the canvas
  if (player.x < 0) {
    player.x = 0;
  }
  // Check if the player is outside the right edge of the canvas
  if (player.x + player.width > SCREENWIDTH) {
    player.x = SCREENWIDTH - player.width;
  }

  // ------------------- Player2 movement -----------------------
  if (directions2.right) {
    player2.x += player2.dx;
  } else if (directions2.left) {
    player2.x -= player2.dx;
  } 
  // Check if the player2 is outside the left edge of the canvas
  if (player2.x < 0) {
    player2.x = 0;
  }
  // Check if the player2 is outside the right edge of the canvas
  if (player2.x + player2.width > SCREENWIDTH) {
    player2.x = SCREENWIDTH - player2.width;
  }

  // Draw the player and bullet
  drawPlayer();
  drawPlayer2();
  drawBullet();
  drawBullet2();
  ctx.drawImage(image1, player.x, player.y);
  ctx.drawImage(image2, player2.x, player2.y);
}

// Function to run the game loop
function gameLoop() {
  update();
  update2();
  render();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();