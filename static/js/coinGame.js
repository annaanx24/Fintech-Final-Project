// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke, 
          key, keyCode, createGraphics, textAlign, createButton, CENTER, BOLD, LEFT,TOP,textStyle, PI, HALF_PI, Color, UP_ARROW, round, millis, keyIsDown, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

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
let button;
let button2;
let resetTime = 0;
let ipad;
let pool;
let lego;
let candy;
let timeLimit;
let popup;
let mode;
let selectedItem;
let ipadImg 
let poolImg 
let legoImg 
let candyImg 


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
    this.y = height - (this.size + 10);
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
  mode = 1;
  timeLimit = 5;
  selectedItem = ""
  popup = createGraphics(300, 300);
  images();
  coins = [];
  for (let i = 0; i < 3; i++) {
    coins.push(new Coin(random(width), 0, 20, random(3, 7)));
  }
  // Variables for droplet 2
  pig = new Pig();
  time = 0;

  ipad = new Prize(30, 45, "iPad", 400);
  pool = new Prize(270, 45, "Pool", 250);
  lego = new Prize(30, 270, "Legos", 50);
  candy = new Prize(270, 270, "Candy", 10);

  
}

function draw() {
  background(195, 27, 97);
  
  //move all the coins
  if (mode == 1) {
    screen1();
  }
  else if (mode ==2) {
    screen2();
  }
  else if(mode ==3) {
    screen3();
  }
}

function screen1() {
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
      textSize(20);
      textStyle(BOLD);
      textAlign(LEFT, TOP);
      fill(144, 100, 63);
      text("Coins Collected: " + score, 10, 30);
      time = round((millis() - resetTime) / 1000);
      text("Time left: " + (timeLimit - time), 10, 60);
    }

    if (time > timeLimit) {
      mode = 2
    }
}

function screen3() {
  ipad.display();
  pool.display();
  lego.display();
  candy.display();
  textSize (15)
  text(`You have ${score} coins`, width/2, 20)
  // text(mouseX, 10, 10)
  // text(mouseY, 10, 20)
  //display item images
  image(ipadImg, ipad.x, ipad.y, ipad.size, ipad.size);
  image(poolImg, pool.x, pool.y, pool.size, pool.size);
  image(legoImg, lego.x, lego.y, lego.size, lego.size);
  image(candyImg, candy.x, candy.y, candy.size, candy.size);
  
  //to display popup of if the purchase is possible
  popup.fill(255,255,255)
  popup.textAlign(LEFT)
  if (selectedItem=="ipad") {
    
    popup.clear()
    popup.background('rgba(0, 0, 0, 0.75)')
    
    
    if (ipad.checkPurchase()) {
      console.log("enough money")
      popup.text(`You have enough coins to buy the ${selectedItem}!\n Press v to buy!`,40,40)
       
    }
    else {
      console.log("NOT enough money")
      popup.text(`Sorry, you do not have enough coins to buy\nthe ${selectedItem}. Press click another item to close.`, 40,40)
      
    }
    image(popup, 50,50)
    
  }  
  else if (selectedItem=="pool") {
    popup.clear()
    console.log("pool")
     popup.background('rgba(0, 0, 0, 0.75)')
    if (pool.checkPurchase()) {
      console.log("enough money")
      popup.text(`You have enough coins to buy the ${selectedItem}.\nBut you are ${ipad.price-score} coins from buying an ipad! \nPress v to buy ${selectedItem}. Click next to continue\ncollecting coins!`,10,40)
     
    }
    else {
      console.log("NOT enough money")
      popup.text(`Sorry, you do not have enough coins to buy \nthe ${selectedItem}. Click another item to close.\nClick next to continue collecting coins!`, 40,40)
      
    }
    image(popup, 50,50)
  }  
  
  else if (selectedItem=="lego") {
    popup.clear()
     popup.background('rgba(0, 0, 0, 0.75)')
    console.log("lego")
    if (lego.checkPurchase()) {
      console.log("enough money")
      popup.text(`You have enough coins to buy the ${selectedItem}s.\nBut you are ${pool.price-score} coins from buying a pool! Press v to buy ${selectedItem}. Click next to continue\ncollecting coins!`,40,40)
     
    }
    else {
      console.log("NOT enough money")
      popup.text(`Sorry, you do not have enough coins to buy \n${selectedItem}s. Click another item to close.\nClick next to continue collecting coins!`, 40,40)
      
    }
    image(popup, 50,50)
  }  
  else if (selectedItem=="candy") {
    popup.clear()
    popup.background('rgba(0, 0, 0, 0.75)')
    console.log("candy")
    if (candy.checkPurchase()) {
      console.log("enough money")
      popup.text(`You have enough coins to buy ${selectedItem}.\nBut you are ${lego.price-score} coins from buying legos! Press v to buy ${selectedItem}. Click next to continue\ncollecting coins!`,40,40)
     
    }
    else {
      console.log("NOT enough money")
      popup.text(`Sorry, you do not have enough coins to buy \n the ${selectedItem}. Click another item to close. \n Click next to continue collecting coins!`, 40,40)
      
    }
    image(popup, 50,50)
  }  
}

function mouseClicked() {
  if (mouseX<230&&mouseX>30&&mouseY>45&&mouseY<245) {
   console.log("ipad")
    selectedItem = "ipad"
  }  
  else if (mouseX<470&&mouseX>270&&mouseY>45&&mouseY<245) {
    console.log("pool")
    selectedItem = "pool"
  }  
  
  else if (mouseX<230&&mouseX>30&&mouseY>280&&mouseY<480) {
    console.log("lego")
    selectedItem = "lego"
  }  
  else if (mouseX<470&&mouseX>270&&mouseY>280&&mouseY<480) {
    console.log("candy")
    selectedItem = "candy"
  }  
  
}

 
function screen2() {
 
    let coin = "coins";
    if (score == 1) {
      coin = "coin";
    }
    textSize(40);
    text(
      "Game Over! \n Congratulations! \n You collected " + score + " " + coin+ ". \n Click the next button \n to buy prizes!",
      250,
      250
    );
    textAlign(CENTER, CENTER);

    button2 = createButton("Next!");
    button2.position(width - 50, 19);
    button2.mousePressed(prizeSelection);

}

class Prize {
  constructor(x, y, name, price) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.price = price;
    this.image = 10; //change this var to actual image when you get it
    this.size = 200;
  }

  display() {
    
    text(`${this.name} | ${this.price} coins`, this.x+100, this.y+210)
    // text(this.price +" coins", this.x+100, this.y+225)
  }
  
  checkPurchase() {
    if (score>=this.price) {
      // popup.text("you can make purchase")
      // image(popup, 50, 50)
      return true
      console.log("checking purchase")
    }
    else 
      // popup.text("you can't make purchase")
      // image(popup, 50, 50)
      console.log("not enough money")
      return false
  }
}

function prizeSelection() {
  if (mode!=3) {
    mode+=1
  }
  else {
    mode = 1
    restart()
  }

  // button = createButton("Restart");
  // button.position(width - 80, 19);
  // button.mousePressed(restart);
}

function images() {
  pigImg = loadImage(
    "https://cdn.glitch.com/075a41f8-cc68-4f5f-af51-36b05eee518b%2Fpiggy-bank-solid.svg?v=1595859772283"
  );

  coinImg = loadImage(
    "https://cdn.glitch.com/075a41f8-cc68-4f5f-af51-36b05eee518b%2F25498.jpg?v=1595864737068"
  );
  
  ipadImg = loadImage("https://cdn.glitch.com/075a41f8-cc68-4f5f-af51-36b05eee518b%2Fipad%20image.jpg?v=1595991487563")
  
  poolImg = loadImage("https://cdn.glitch.com/075a41f8-cc68-4f5f-af51-36b05eee518b%2Fpool%20image.png?v=1595991705340")
  
  legoImg = loadImage("https://cdn.glitch.com/075a41f8-cc68-4f5f-af51-36b05eee518b%2Flego%20man.jpg?v=1595991708603")
  
  candyImg = loadImage("https://cdn.glitch.com/075a41f8-cc68-4f5f-af51-36b05eee518b%2Fcandy.jpg?v=1595991715711")
}

function overlayImages() {
  // tint(330, 49, 94);
  image(pigImg, pig.x, pig.y, pig.size, pig.size);
  // image(coinImg, coins[0].x, coins[0].y, coins[0].size, coins[0].d);
}

function restart() {
  time = 0;
  isEndGame = false;
  coins = [];
  for (let i = 0; i < 3; i++) {
    coins.push(new Coin(random(width), 0, 20, random(3, 7)));
  }
  resetTime = millis();
}
