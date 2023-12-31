var inc = 0.1;
var scl = 20;
var maxspeed;
var magnitude;
var cols, rows;
var fr;

var field = [];
var particles = [];
var zoff = 0;
var vectors = false;
var size;

var sliderRed;
var sliderGreen;
var sliderBlue;

var redInput;
var greenInput;
var blueInput;

var particleColor;


function setup() {
  //size = 800;
  canvas = createCanvas(windowWidth, windowHeight, WebGL2RenderingContext);
  canvas.parent(document.getElementById('canvas-container'));

  can = document.getElementById('canvas-container');

  can.addEventListener('click', handleClick);
  
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = document.querySelector('.js-frameRate');


  //sliders
  sliderRed = createSlider(0,255,150);
  sliderGreen = createSlider(0,255,50);
  sliderBlue = createSlider(0,255,255);

  forceSlider = createSlider(0,10,5);
  velocitySlider = createSlider(0,10,5);

  sliderRed.parent(document.getElementById('redSlider'));
  sliderGreen.parent(document.getElementById('greenSlider'));
  sliderBlue.parent(document.getElementById('blueSlider'));

  forceSlider.parent(document.getElementById('forceSlider'));
  velocitySlider.parent(document.getElementById('velocitySlider'));

  for (let i = 0; i < 200; i++) {

    particles[i] = new Particle();
  }
  noiseSeed(99);
  background(25);
}

function draw() {

  document.querySelector('.red').style.background = color(sliderRed.value(),0,0);
  document.querySelector('.green').style.background = color(0,sliderGreen.value(),0);
  document.querySelector('.blue').style.background = color(0,0,sliderBlue.value());

  document.querySelector('.color').style.backgroundColor = color(sliderRed.value(),sliderGreen.value(),sliderBlue.value());

  maxspeed = velocitySlider.value();
  magnitude = forceSlider.value();

  field.splice(0);

  var yoff = 0;
  for (var y = 0; y <= rows; y++) {
    var xoff = 0;
    const row = [];
    for (var x = 0; x <= cols; x++) {
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var vector = p5.Vector.fromAngle(angle);
      vector.setMag(magnitude);
      row.push(vector);
      xoff += inc;


      if (vectors) {
        stroke(0);
        strokeWeight(1);
        rect(x * scl, y * scl, scl, scl);

        push();

        translate(x * scl, y * scl);
        rotate(vector.heading());
        strokeWeight(1);
        line(0, 0, scl, vector.y);
        pop();
      }
}

    yoff += inc;
    field.push(row);
    zoff += 0.0002;

  }


  for (let particle of particles) {
    particle.recieveField(field);
    particle.update();
    particle.edges();
    if (!vectors) {
      particle.show();
    }

  }
  field.splice(0, field.length);
 // fr.innerHTML = floor(frameRate());
}



let touchProcessed = false;
let touchDelay = 500; // Adjust the delay time as needed
let lastTouchTime = 0;
/* //field
function handleClick() {
  let currentTime = millis();
  if (!touchProcessed && (currentTime - lastTouchTime) > touchDelay) {
    touchProcessed = true;
    lastTouchTime = currentTime;

    console.log(touches.length);
    vectors = !vectors;
    background(255);
    if (!vectors) {
      background(25);
      particles.splice(0);
      for (let i = 0; i < 400; i++) particles[i] = new Particle();
    }
  }
}
*/

//restart sketch
function handleClick(){
  let currentTime = millis();
  if (!touchProcessed && (currentTime - lastTouchTime) > touchDelay) {
    lastTouchTime = currentTime;
    background(25);
    particles.splice(0);
    for (let i = 0; i < 400; i++) particles[i] = new Particle();
  }
}