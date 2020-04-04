
let gNum = 2;

const MODE_HELLO_WORLD = 0;
const MODE_RECUR_TRIANGLE = 1;
let gMode = MODE_HELLO_WORLD;

let gLatticePoints = [];
let gBaseVectors = [];

const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

let scalar;
let gImage;

function preload() {

  // Load initial image
  gImage = loadImage( 'HelloWorld.svg' );

}

function setup() {

  const myCanvas = createCanvas( WIDTH + WIDTH_EXT, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  setupController( gNum, gMode );

  initialize();

}

const initialize = () => {

  background( 'white' );
  gLatticePoints = [];
  gBaseVectors = [];
  scalar = HEIGHT * 1.0 / gNum;

  makeHexVector();
  makeLattice();
  drawTiling();

}

function draw() {}

function mouseClicked() {

  if( ( mouseX < WIDTH ) && ( mouseY < HEIGHT ) ){
    drawTiling();
  }
  
}

const toggleMode = () => { 

  gMode = ( gMode + 1 ) % 2; 
  drawTiling();

}

// Set number from controller
const setNumber = () => {

  gNum = getSliderNumValue();
  initialize();
  
}