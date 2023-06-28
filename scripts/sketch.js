var inc = 0.1;
var scl = 20;
var cols, rows;
var fr;

var field = [];
var particles = [];
var zoff = 0;
var vectors = false;
var size;


function setup() {
  size = 800;
  canvas = createCanvas(size, size);
  canvas.parent(document.getElementById('canvas-container'));
  //colorMode(HSB, 255);
  //pixelDensity(2);
  //background(150);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = document.querySelector('.js-frameRate');

  //field = new Array(cols * rows);

  for (let i = 0; i < 200; i++) {

    particles[i] = new Particle();
  }
  loadPixels();
  noiseSeed(99);
  background(25);
}

function draw() {
  



  var yoff = 0;
  for (var y = 0; y <= rows; y++) {
    var xoff = 0;
    const row = [];
    for (var x = 0; x <= cols; x++) {
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var vector = p5.Vector.fromAngle(angle);
      vector.setMag(1);
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
  fr.innerHTML = floor(frameRate());





}

function keyPressed() {
  // Check if the key pressed is "g"
  if (keyCode === 71) {
    // Perform the action when "g" key is pressed
    vectors = !vectors;
    console.log('The "g" key is pressed!');
    background(255);

  }
}

