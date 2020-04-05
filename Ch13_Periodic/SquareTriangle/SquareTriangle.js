
const gNum = 5;
const gLatticePoints = [];
const gBaseVectors = [];
let gColorArray = [];

const WIDTH = 500;
const HEIGHT = 500;

let scalar;
let gGap = 0.5;

const MODE_SQUARE_TRIANGLE = 0;
const MODE_DUAL_PENTAGON = 0;
let gMode = MODE_SQUARE_TRIANGLE;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gGap );

  initialize();

}

const initialize = () => {

  scalar = HEIGHT * 1.0 / gNum;

  initializeColor();
  
  makeSqVector();
  makeSqLattice();

}

function draw() { 

  gGap = getSliderGapValue();
  
  drawTiling( gColorArray, gGap ); 

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = 'Gap' + gGap + '_' + 
                    getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

  drawControllerCaptions();

}

const initializeColor = () => {

  gColorArray = [];
  gColorArray.push( getRandomColorLowSaturation() );

  for( let index = 0; index < 4; index++ ){
    gColorArray.push( getRandomColor() );
  }

}

const changeColor = () => {

  initializeColor();

}

const randomize = () => {

  randomizeGap();
  changeColor();

}

const toggleMode = () => {
  gMode = ( gMode + 1 ) % 2;
}
