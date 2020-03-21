
const gMaxGenerationNum = 250;

let gStateArray;

let gModulo = 4;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gModulo );

  console.log( 'modulo: ' + gModulo );
  background( 'white' );

  initialize();
  // frameRate( 2 );
  
}

function draw() {

  background( 'white' );
  gModulo = getSliderModuloValue();
  drawCell( gMaxGenerationNum, gStateArray, gModulo, HEIGHT );
  updateState();

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = 'Modulo_' + gModulo + 
                      '_' + getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

  drawControllerCaptions();

}

const initialize = () => {

  const num = gMaxGenerationNum;
  gStateArray = getNew2DimensionArray( num );
  gStateArray[ num / 2 ][ num / 2 ] = 1;

}

// Get new two dimension array with padding 0
const getNew2DimensionArray = ( num ) => {
  return Array.from( new Array( num ), () => new Array( num ).fill( 0 ) );
}

