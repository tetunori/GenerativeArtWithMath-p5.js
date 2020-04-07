
const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

let gColorArray = [];
let gListT = [];
let gListF = [];

const DIV_MODE_PENT = 0;
const DIV_MODE_RHOMB = 1;
const DIV_MODE_KITE_DART = 2;
let gModeDivision = DIV_MODE_PENT;

const INIT_MODE_TRIANGLE = 0;
const INIT_MODE_DECAGON = 1;
let gModeInit = INIT_MODE_TRIANGLE;

function setup() {

  const myCanvas = createCanvas( WIDTH + WIDTH_EXT, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  
  setupController();
  initialize();

}

function draw() {}

function mouseClicked() {

  if( ( mouseX < WIDTH ) && ( mouseY < HEIGHT ) ){
    divide();
  }

}

const divide = () => {

  background( 'white' );

  switch( gModeDivision ){

    default:
    case DIV_MODE_PENT:
      pentDivision();
      break;

    case DIV_MODE_RHOMB:
      rhombDivision();
      break;

    case DIV_MODE_KITE_DART:
      kiteDartDivision();
      break;

  }

}

const toggleDivision = () => {

  gModeDivision = ( gModeDivision + 1 ) % 3;
  initialize();

}

const toggleInit = () => {

  gModeInit = ( gModeInit + 1 ) % 2;
  initialize();

}
