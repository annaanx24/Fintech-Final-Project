// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke, 
          key, keyCode, textAlign, CENTER, BOLD, textStyle, PI, HALF_PI, Color, UP_ARROW, round, millis, keyIsDown, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

// Collide2D functions:
/* global collideRectCircle */

// let drop1X;
// let drop1Y;
// let drop1D;
// let drop1FallSpeed;
// let drop1;
// let drop2;
let coins;
let pig;
let score;
let time;
let isEndGame;
let pigImg;
let coinImg;
let c;
class Coin {
  constructor(x, y, d, fallSpeed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.fallSpeed = fallSpeed;
    //this.x is assigning a value to this rain drop that we are creating and x is a property of this object
  }
  display() {
    fill(46, 69, 96);
    ellipse(this.x, this.y, this.d); //need to use this so that the method can work on any rain drop
    // image(coinImg, this.x, this.y, this.d, this.d);
  }
}

class Pig {
  constructor() {
    this.x = width / 2;
    this.size = 40;
    this.y = height - (this.size+10);
  }

  display() {
    fill(302, 58, 98);
    rect(this.x, this.y, this.size, this.size);
    
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= 5;
    }

    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.size) {
      this.x += 5;
    }
    if (keyIsDown(UP_ARROW) && this.x < width - this.size) {
      this.y -= 5;
    }
  }
  checkCollection() {
    for (let i = 0; i < coins.length; i++) {
      if (
        collideRectCircle(
          this.x,
          this.y,
          this.size,
          this.size,
          coins[i].x,
          coins[i].y,
          coins[i].d
        )
      ) {
        coins[i].y = 0;
        coins[i].x = random(width);
        score++;
      }
    }
  }
}
function setup() {
  createCanvas(500, 500);
  colorMode(HSB);
  score = 0;
  images()
  // Variables for droplet 1
  // drop1X = random(width);
  // drop1Y = 0;
  // drop1D = random(5, 15);
  // drop1FallSpeed = random(8, 12);
  coins = [];
  for (let i = 0; i < 3; i++) {
    coins.push(new Coin(random(width), 0, 20, random(3, 7)));
  }
  // Variables for droplet 2
  pig = new Pig();
  time = 0;
  
}

function draw() {
  background(195, 27, 97);
  //move all the coins
  if (!isEndGame) {
    for (let i = 0; i < coins.length; i++) {
      coins[i].y += coins[i].fallSpeed;
      // If it goes off the screen...
      if (coins[i].y > height) {
        // ...reset it...
        coins[i].y = 0;
        // ...and move it somewhere random.
        coins[i].x = random(width);
      }
      coins[i].display();
    }
  
    overlayImages();
    
    pig.move();
    pig.checkCollection();
    textSize(20)
    textStyle(BOLD)
    fill(144, 100, 63)
    text("Coins Collected: " + score, 10, 30);
    time = round(millis() / 1000);
    text("Time left: " + (60 - time), 10, 60);
    //color ellipise
    // fill(330, 49, 94)
    // ellipse (250,250,50)
  }

  if (time > 60) {
    isEndGame = true;
  }
  endGame();
}

function endGame() {
  if (isEndGame) {
    let coin = "coins"
    if (score == 1) {
      coin = "coin"
    }
    textSize(40)
    text("Game Over! \n Congratulations! \n You collected " + score + coin, 250, 250);
    textAlign(CENTER, CENTER)
  }
}

function images() {
  
  pigImg = loadImage(
    "https://cdn.glitch.com/075a41f8-cc68-4f5f-af51-36b05eee518b%2Fpiggy-bank-solid.svg?v=1595859772283"
  );
  
  coinImg = loadImage("https://cdn.glitch.com/075a41f8-cc68-4f5f-af51-36b05eee518b%2F25498.jpg?v=1595864737068")
}

function overlayImages() {
  tint(330, 49, 94)
  image(pigImg, pig.x, pig.y, pig.size, pig.size);
  // image(coinImg, coins[0].x, coins[0].y, coins[0].size, coins[0].d);

}