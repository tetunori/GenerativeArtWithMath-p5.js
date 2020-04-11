
const WIDTH = 500;
const HEIGHT = 500;

let gVector1;
let gVector2;
let gUpperLimit = 0;

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );

  gVector1 = createVector( 0, HEIGHT / 2 );
  gVector2 = createVector( WIDTH, HEIGHT / 2 );

  drawCurve();

}

function draw() {}

function mouseClicked() {
  
  gUpperLimit++;
  drawCurve();

}
