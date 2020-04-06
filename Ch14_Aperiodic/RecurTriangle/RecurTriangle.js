
const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

let gColorArray = [];
let gListT = [];
let gListF = [];

const DIV_MODE_TSFL = 0;
const DIV_MODE_TLFS = 1;
const DIV_MODE_TSFS = 2;
const DIV_MODE_TLFL = 3;
let gModeDivision = DIV_MODE_TSFL;

const INIT_MODE_TRIANGLE = 0;
const INIT_MODE_PENTAGON = 1;
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
    triangularDivision();
  }

}

const toggleDivision = () => {

  gModeDivision = ( gModeDivision + 1 ) % 4;
  initialize();

}

const toggleInit = () => {

  gModeInit = ( gModeInit + 1 ) % 2;
  initialize();

}
