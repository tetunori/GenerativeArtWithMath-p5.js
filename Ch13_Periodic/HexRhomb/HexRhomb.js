
const gNum = 10;
const gLatticePoints = [];
const gBaseVectors = [];
let gColorArray = [];
let gRotationArray = [];

const WIDTH = 500;
const HEIGHT = 500;

let scalar;

const MODE_STANDARD = 0;
const MODE_RANDOM_ROTATION = 1;
const MODE_CONNECT_MIDPOINT = 2;
const MODE_MIDPOINT_ROTATION = 3;
let gMode = MODE_STANDARD;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController();

  initialize();

}

const initialize = () => {

  scalar = HEIGHT * 1.0 / gNum;

  initializeColor();
  
  makeHexVector();
  makeLattice();

  initializeRotationArray();

}

function draw() { 

  drawTiling( gColorArray ); 

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

  drawControllerCaptions();

}

const initializeColor = () => {

  gColorArray = [];
  for( let index = 0; index < 3; index++ ){
    gColorArray.push( getRandomColor() );
  }

}

// Get random color
const getRandomColor = () => {
  // return color( random( 100 ), 100, 100 );
  return color( random( 100 ), 80, 100 );
}

const initializeRotationArray = () => {

  gRotationArray = [];
  for( const vectorArray of gLatticePoints ){

    const tempArray = [];

    for( const vector of vectorArray ){
      tempArray.push( getRandomInteger( 0, 6 ) * Math.PI / 3 );
    }

    gRotationArray.push( tempArray );

  }
  
}

const changeParam = () => {

  initializeColor();
  initializeRotationArray();

}

const toggleMode = () => {
  gMode = ( gMode + 1 ) % 4;
  draw();
}
