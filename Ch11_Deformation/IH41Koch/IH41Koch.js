
let gNum = 10;
let gLatticePoints = [];
const gBaseVectors = [];

const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

let scalar;
let gUpperLimit = 0;

function setup() {

  const myCanvas = createCanvas( WIDTH + WIDTH_EXT, HEIGHT, P2D );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  setupController( gNum );

  initialize();

}

const initialize = () => {

  background( 'white' );
  scalar = HEIGHT * 1.0 / gNum;
  gUpperLimit = 0;

  makeSqVector();
  makeSqLattice();
  drawTiling();

}

function draw() {}

function mouseClicked() {

  if( ( mouseX < WIDTH ) && ( mouseY < HEIGHT ) ){

    background( 'white' );
    gUpperLimit++;
    drawTiling();
    
  }
  
}

// Set number from controller
const setNumber = () => {

  gNum = getSliderNumValue();
  initialize();
  
}
