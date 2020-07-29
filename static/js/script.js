
// //Code to implement collision detection
// console.log("### p5.collide ###"),p5.prototype._collideDebug=!1,p5.prototype.collideDebug=function(a){_collideDebug=a},p5.prototype.collideRectRect=function(a,b,c,d,e,f,g,h){return a+c>=e&&e+g>=a&&b+d>=f&&f+h>=b?!0:!1},p5.prototype.collideRectCircle=function(a,b,c,d,e,f,g){var h=e,i=f;a>e?h=a:e>a+c&&(h=a+c),b>f?i=b:f>b+d&&(i=b+d);var j=this.dist(e,f,h,i);return g/2>=j?!0:!1},p5.prototype.collideCircleCircle=function(a,b,c,d,e,f){return this.dist(a,b,d,e)<=c/2+f/2?!0:!1},p5.prototype.collidePointCircle=function(a,b,c,d,e){return this.dist(a,b,c,d)<=e/2?!0:!1},p5.prototype.collidePointRect=function(a,b,c,d,e,f){return a>=c&&c+e>=a&&b>=d&&d+f>=b?!0:!1},p5.prototype.collidePointLine=function(a,b,c,d,e,f,g){var h=this.dist(a,b,c,d),i=this.dist(a,b,e,f),j=this.dist(c,d,e,f);return void 0===g&&(g=.1),h+i>=j-g&&j+g>=h+i?!0:!1},p5.prototype.collideLineCircle=function(a,b,c,d,e,f,g){var h=this.collidePointCircle(a,b,e,f,g),i=this.collidePointCircle(c,d,e,f,g);if(h||i)return!0;var j=a-c,k=b-d,l=this.sqrt(j*j+k*k),m=((e-a)*(c-a)+(f-b)*(d-b))/this.pow(l,2),n=a+m*(c-a),o=b+m*(d-b),p=this.collidePointLine(n,o,a,b,c,d);if(!p)return!1;this._collideDebug&&this.ellipse(n,o,10,10),j=n-e,k=o-f;var q=this.sqrt(j*j+k*k);return g/2>=q?!0:!1},p5.prototype.collideLineLine=function(a,b,c,d,e,f,g,h,i){var j,k=((g-e)*(b-f)-(h-f)*(a-e))/((h-f)*(c-a)-(g-e)*(d-b)),l=((c-a)*(b-f)-(d-b)*(a-e))/((h-f)*(c-a)-(g-e)*(d-b));if(k>=0&&1>=k&&l>=0&&1>=l){if(this._collideDebug||i)var m=a+k*(c-a),n=b+k*(d-b);return this._collideDebug&&this.ellipse(m,n,10,10),i?j={x:m,y:n}:!0}return i?j={x:!1,y:!1}:!1},p5.prototype.collideLineRect=function(a,b,c,d,e,f,g,h,i){var j,k,l,m,n;return i?(j=this.collideLineLine(a,b,c,d,e,f,e,f+h,!0),k=this.collideLineLine(a,b,c,d,e+g,f,e+g,f+h,!0),l=this.collideLineLine(a,b,c,d,e,f,e+g,f,!0),m=this.collideLineLine(a,b,c,d,e,f+h,e+g,f+h,!0),n={left:j,right:k,top:l,bottom:m}):(j=this.collideLineLine(a,b,c,d,e,f,e,f+h),k=this.collideLineLine(a,b,c,d,e+g,f,e+g,f+h),l=this.collideLineLine(a,b,c,d,e,f,e+g,f),m=this.collideLineLine(a,b,c,d,e,f+h,e+g,f+h)),j||k||l||m?i?n:!0:!1},p5.prototype.collidePointPoly=function(a,b,c){for(var d=!1,e=0,f=0;f<c.length;f++){e=f+1,e==c.length&&(e=0);var g=c[f],h=c[e];(g.y>b&&h.y<b||g.y<b&&h.y>b)&&a<(h.x-g.x)*(b-g.y)/(h.y-g.y)+g.x&&(d=!d)}return d},p5.prototype.collideCirclePoly=function(a,b,c,d,e){void 0==e&&(e=!1);for(var f=0,g=0;g<d.length;g++){f=g+1,f==d.length&&(f=0);var h=d[g],i=d[f],j=this.collideLineCircle(h.x,h.y,i.x,i.y,a,b,c);if(j)return!0}if(1==e){var k=this.collidePointPoly(a,b,d);if(k)return!0}return!1},p5.prototype.collideRectPoly=function(a,b,c,d,e,f){void 0==f&&(f=!1);for(var g=0,h=0;h<e.length;h++){g=h+1,g==e.length&&(g=0);var i=e[h],j=e[g],k=this.collideLineRect(i.x,i.y,j.x,j.y,a,b,c,d);if(k)return!0;if(1==f){var l=this.collidePointPoly(a,b,e);if(l)return!0}}return!1},p5.prototype.collideLinePoly=function(a,b,c,d,e){for(var f=0,g=0;g<e.length;g++){f=g+1,f==e.length&&(f=0);var h=e[g].x,i=e[g].y,j=e[f].x,k=e[f].y,l=this.collideLineLine(a,b,c,d,h,i,j,k);if(l)return!0}return!1},p5.prototype.collidePolyPoly=function(a,b,c){void 0==c&&(c=!1);for(var d=0,e=0;e<a.length;e++){d=e+1,d==a.length&&(d=0);var f=a[e],g=a[d],h=this.collideLinePoly(f.x,f.y,g.x,g.y,b);if(h)return!0;if(1==c&&(h=this.collidePointPoly(b[0].x,b[0].y,a)))return!0}return!1},p5.prototype.collidePointTriangle=function(a,b,c,d,e,f,g,h){var i=this.abs((e-c)*(h-d)-(g-c)*(f-d)),j=this.abs((c-a)*(f-b)-(e-a)*(d-b)),k=this.abs((e-a)*(h-b)-(g-a)*(f-b)),l=this.abs((g-a)*(d-b)-(c-a)*(h-b));return j+k+l==i?!0:!1},p5.prototype.collidePointPoint=function(a,b,c,d,e){return void 0==e&&(e=0),this.dist(a,b,c,d)<=e?!0:!1},p5.prototype.collidePointArc=function(a,b,c,d,e,f,g,h){void 0==h&&(h=0);var i=this.createVector(a,b),j=this.createVector(c,d),k=this.createVector(e,0).rotate(f),l=i.copy().sub(j);if(i.dist(j)<=e+h){var m=k.dot(l),n=k.angleBetween(l);if(m>0&&g/2>=n&&n>=-g/2)return!0}return!1};

// //frog variables
// let frogX = 400
// let frogY = 550
// let frogSize = 25
// let frogLives = 3

// //car variables
// let car1X = 400
// let car1Y = 300
// let car1Width = 80
// let car1Height = 30

// let car2X = 100
// let car2Y = 200
// let car2Width = 90
// let car2Height = 50

// let car3X = 250
// let car3Y = 100
// let car3Width = 150
// let car3Height = 20

// function setup(){
//   // Code here runs only once
//   createCanvas(800, 600)
// }

// function draw(){
//   background(220)
//   textSize(32)
//   text('Lives: '+ frogLives,600,50)
  
//   //Make a frog
//   fill(10, 252, 14)
//   noStroke()
//   ellipse(frogX, frogY, frogSize)
  
//   //Make a car move; compensate for the size of the car by taking out 80
//   fill(255, 10, 10)
//   rect(car1X, car1Y, car1Width, car1Height)
//   car1X = car1X + 3
//   if(car1X > 800){
//     car1X = -90
//   }
  
//   fill(189, 8, 255)
//   rect(car2X, car2Y, car2Width, car2Height)
//   car2X = car2X + 2
//   if(car2X > 800){
//     car2X = -80
//   }
  
//   fill(54, 255, 245)
//   rect(car3X, car3Y, car3Width, car3Height)
//   car3X = car3X - 10
//   if(car3X < -car3Width){
//     car3X = 800 + car3Width
//   }
  
//   checkForCollisions()
// }

// function keyPressed() {
//   if (keyCode === LEFT_ARROW) {
//     frogX = frogX - 10
//   } else if (keyCode === RIGHT_ARROW) {
//     frogX = frogX + 10
//   } else if (keyCode === UP_ARROW) {
//     frogY = frogY - 10
//   } else if (keyCode === DOWN_ARROW) {
//     frogY = frogY + 10
//   }
// }



// //collideRectCircle(x1, y1, width1, height1, cx, cy, diameter)

// function checkForCollisions(){

//   if(collideRectCircle(car1X, car1Y, car1Width, car1Height, frogX, frogY, frogSize)){
//     frogX = 400
//     frogY = 550
//     frogLives -= 1
//   }
  
//   if(collideRectCircle(car2X, car2Y, car2Width, car2Height, frogX, frogY, frogSize)){
//     frogX = 400
//     frogY = 550
//     frogLives -= 1
//   }

//   if(collideRectCircle(car3X, car3Y, car3Width, car3Height, frogX, frogY, frogSize)){
//     frogX = 400
//     frogY = 550
//     frogLives -= 1
//   }
  
// }

// ChatBotJs
var bot = document.getElementById("poptext");

bot.onclick = function() {
   modal.style.display = "popuptext";
 }
 
function openForm() {
  document.getElementById("botHelp").style.display = "block";
}

function closeForm() {
  document.getElementById("botHelp").style.display = "none";
}
