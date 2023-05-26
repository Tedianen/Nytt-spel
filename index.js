const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
canvas.height = SCREENHEIGHT;
canvas.width = SCREENWIDTH;

// Get element by id input slider value
var slider = document.getElementById("myRange");
var sliderValue = slider.value;
// Event listerner to get input slider value
slider.addEventListener("input", function() {
  sliderValue = slider.value;
  console.log(sliderValue);
});

// Get element by id input value
var slider2 = document.getElementById("myRange2");
var slider2Value = slider2.value;
// Event listerner to get input slider value
slider2.addEventListener("input", function() {
  slider2Value = slider2.value;
  console.log(slider2Value);
});
// Bullets does not exist
var bullet = null;
var bullet2 = null;
// No players are dead
var deadPlayer = "false";
var deadPlayer2 = "false";
     
// Event listener to shoot bullet when Enter is pressed
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
    gravity: 0.15 + Math.random() * 0.1,
    // gravity: sliderValue,
    gravitySpeed:0,
    damage:10,
  };
  }
  console.log("bullet")
  }
  // Event listener to shoot bullet2 when Spece is pressed
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
      gravity: 0.15  + Math.random() * 0.1,
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
  hp:30,
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
    // If bullet hits player2, damage player2 and make bullet null
    if (
      bullet.x < player2.x + player2.width &&
      bullet.x + bullet.width > player2.x &&
      bullet.y < player2.y + player2.height &&
      bullet.y + bullet.height > player2.y
    ){
      player2.hp = player2.hp - bullet.damage
      console.log(player2.hp)
      bullet = null;
    }
    // Make bullet null if bullet leaves canvas
    else if (bullet.x < 0 || bullet.y > canvas.height /1.3 ) {
      bullet = null;
    }
    if (player2.hp <= 0){
      console.log("Player 2 is dead")
      deadPlayer2 = "true"
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
  hp:30,
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
    // If bullet hits player, damage player and make bullet2 null
    if (
      bullet2.x < player.x + player.width &&
      bullet2.x + bullet2.width > player.x &&
      bullet2.y < player.y + player.height &&
      bullet2.y + bullet2.height > player.y
    ){
      player.hp = player.hp - bullet2.damage
      console.log(player.hp)
      bullet2 = null;
    }
    // Make bullet null if bullet leaves canvas
    else if (bullet2.x > innerWidth|| bullet2.y > canvas.height /1.3 ) {
      bullet2 = null;
    }
    if (player.hp < 0){
      console.log("Player 2 is dead")
      deadPlayer = "true"
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

let Player2dead = document.getElementById("player2DeadBlock")


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
  if (deadPlayer == "true"){
    Player2dead.style.display = "block"
    Player2dead.innerHTML = "Player 2 Wins! Reset?"
    return;
   
  }

  else if (deadPlayer2 == "true"){
    Player2dead.style.display = "block"
    Player2dead.innerHTML = "player 1 Wins! Reset?"
    return;
  }
  update();
  update2();
  render();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
Player2dead.addEventListener("click", ()=>{
  location.reload();
})