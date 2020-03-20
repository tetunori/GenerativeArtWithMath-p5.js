
let gNum = 10;
let gThreashold = 0;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gNum, gThreashold );

}

function draw() {

  background( 'white' );

  gNum = getSliderNumValue();
  gThreashold = getSliderThreasholdValue();

  // Set values for division.js
  setDivisionValues( WIDTH, gNum, gThreashold );
  generateFibonacci( gNum );

  // Draw
  initialDivSquare();

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = 'RecurDivGUI_Num' +  + gNum + '_Thr' + gThreashold + 
                      '_' + getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

  drawControllerCaptions();
  
}
