/*Shared driving and typing between Lisa and Naomi
Project includes:
!-If statement using a conditional
!-Loops and Nested loops
!-Literal object 
!-Constructor function
!-Moving shape that reverses
!-Iteration through an array*/

//Creating a flower object that holds the size variables used throughout the code
var flwr = {
	w: 300,
  x: 250,
	y: 100,
  z: 200
}

//variables to be used for the bee
var beeX = 0;
var beeY = 150;
var speed = 2;

var seeds = []; //declaring an empty array

function setup() {
  createCanvas(500, 500); //starting with a square canvas
	for (var i = 0; i < 10; i++) { //using a for loop to make copies of the seed object
		seeds[i] = new Seed(); //the keyword "new" invokes a seed object from the Seed template 
	}
}

function draw() {
  background('#6699cc');
  
  fill('#f9c22e'); //sun
  noStroke();
  push();
  translate(width+0.95, height*0.05);
  rotate(frameCount / 100.0);
  sun(0, 0, 75, 100, 10); //calling the sun function and giving it parameters
  pop();
  
	noStroke();
	fill('#D4B483'); //ground color
	rect(0, 450, 500, 50); //ground
	
	fill('#A8D4AD'); //stem color
  rect(240, 300, 20, 150); //stem
	
	fill('#CAE2BC');
	ellipse(220, 400, 50, 30); //leaf
	ellipse(280, 380, 50, 30); //leaf2
	
	//drawing the petals using bracket notation
	frameRate(20);
	fill(255, random(155), random(255));
  ellipse(flwr["x"], flwr["x"], flwr["z"], flwr["y"]); //middle-horizontal petal
	ellipse(flwr["x"], flwr["x"], flwr["y"], flwr["z"]); //middle-vertical peta
	
	fill('#ff8c42'); //petal color
	strokeWeight(3); //petal stroke weights
	//drawing the petals using variables and dot notation
	var topLeftPetal = ellipse(flwr.z, flwr.z, flwr.y, flwr.y);
  var topRightPetal = ellipse(flwr.w, flwr.z, flwr.y, flwr.y);
  var bottomLeftPetal = ellipse(flwr.z, flwr.w, flwr.y, flwr.y);
  var bottomRightPetal = ellipse(flwr.w, flwr.w, flwr.y, flwr.y);
    
  stroke('#967D69'); //pistil stroke color
  fill('#967D69'); //pistil color
  ellipse(flwr.x, flwr.x, flwr.y, flwr.y); //center pistil
	
	for (var i = 0; i < seeds.length; i++) { // the for loop iterates through the length of the array to display and move each seed 
		seeds[i].move();
		seeds[i].display();
	} //the for loop must be within the draw function
		
	noStroke();
	fill('#BADEFC'); //bee wing color
	ellipse(beeX, beeY, 20, 60); //bee wing
	fill('yellow'); //bee body color
	ellipse(beeX, beeY, 50, 30); //bee body
	stroke('black'); //stripe color
	strokeWeight(15); //stripe color weight
	line(beeX, beeY-8, beeX, beeY+8); //bee stripe
	
	
if (mouseX >= beeX && mouseY >= beeY) { //if the location of the mouse is on the bee or to the right and below it, 
	//the bee will randomly shake on both its x and y axis the amount below
    beeX += random(-2, 2);
    beeY += random(-5, 5);
  } else if (beeX > width || beeX < 0) { //this if statement keeps the bee moving between the bounds of the canvas
		speed = -speed;
	}
	beeX = beeX + speed; //this changes the bee's x-location and makes it move
}

	//creating the Seeds constructor function Remember the keyword "this" references the implied object function
	function Seed() {
	this.x = random(230, 270);
	this.y = random(230, 270);

	this.display = function() {
		noStroke();
		fill('#5a352a');
		ellipse(this.x, this.y, 10, 10);
	}

	this.move = function() {
		this.x = this.x + random(-0.5, 0.5);
		this.y = this.y + random(-0.5, 0.5);
	}
}

//the sun function creates a for loop that makes the sun rotate
function sun(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
