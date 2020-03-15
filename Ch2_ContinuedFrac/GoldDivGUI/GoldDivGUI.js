
const RATIO = ( Math.sqrt( 5 ) + 1 ) / 2;
let gThreasholdDivision = 100;
let gThreasholdProbability = 0.5;

const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  setupController( gThreasholdDivision, gThreasholdProbability );
  
}

function draw() {

  background( 100, 0, 100 );
  gThreasholdDivision = getSliderThreasholdDivisionValue();
  gThreasholdProbability = getSliderThreasholdProbabilityValue();

  initDivision();

  drawRect( 0, 0, WIDTH, WIDTH );
  divSquare( 0, 0, WIDTH, RATIO, gThreasholdDivision, gThreasholdProbability );

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = 'ThrDiv' + gThreasholdDivision + '_' + getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

  drawControllerCaptions();

}
