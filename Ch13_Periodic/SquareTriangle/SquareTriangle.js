
let gNum = 10;
const gLatticePoints = [];
const gBaseVectors = [];
let gColorArray = [];

const WIDTH = 500;
const HEIGHT = 500;

let scalar;
let gGap = 0.5;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gGap );

  initialize();

}

const initialize = () => {

  scalar = HEIGHT * 1.0 / gNum;

  for( let index = 0; index < 2; index++ ){
    gColorArray.push( getRandomColorLowSaturation() );
  }

  makeSqVector();
  makeSqLattice();

}

function draw() { 

  gGap = getSliderGapValue();
  
  drawTiling(); 

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = 'Gap' + gGap + '_' + 
                    getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

  drawControllerCaptions();

}

const changeColor = () => {

  gColorArray = [];
  for( let index = 0; index < 2; index++ ){
    gColorArray.push( getRandomColorLowSaturation() );
  }

}

// Get random color Low Saturation
const getRandomColorLowSaturation = () => {
  return color( random( 100 ), 40, 100 );
}
