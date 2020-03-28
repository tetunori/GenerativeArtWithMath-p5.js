
const gStep = 30;

let controlPoints = [];

let gGon = 10;

const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

function setup() {

  const myCanvas = createCanvas( WIDTH + WIDTH_EXT, HEIGHT, P2D );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  setupController( gGon );

  background( 'white' );
  drawNumber();
  drawShape();

}

function draw() {}

function mouseClicked() {

  if( ( mouseX < WIDTH ) && ( mouseY < HEIGHT ) ){
    drawShape();  
  }
  
}

// Set number from controller
const setGonNumber = () => {

  gGon = getSliderNumValue();
  background( 'white' );
  drawNumber();
  drawShape();
  
}
