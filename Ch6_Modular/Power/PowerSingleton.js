
let gModulo = 7;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gModulo );

}

function draw() {

  background( 'white' );

  gModulo = getSliderModuloValue();
  drawTable( gModulo, WIDTH );

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = 'Modulo_' + gModulo + 
                      '_' + getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

  drawControllerCaptions();
  
}

// Draw table
const drawTable = ( modulo, width ) => {

  const scalar = width / ( modulo - 1 );
  let num;

  for( let idRow = 1; idRow < modulo; idRow++ ){

    num = idRow;  
    for( let idColumn = 1; idColumn < modulo; idColumn++ ){

      const vector = createVector( idColumn - 1, idRow - 1 );
      vector.mult( scalar );

      // Draw frame
      fill( 'white' );
      rect( vector.x, vector.y, scalar, scalar );

      // Draw number text
      fill( 'black' );
      textSize( scalar );
      text( num, vector.x, vector.y + scalar );
      num = ( num * idRow ) % modulo;

    }

  }

}

let gIsCaptureImage = false;

// Is capture image function is ready or not
const isEnableCaptureImage = () => {
  return ( gIsCaptureImage === true );
}

// Enable capture image function
const enableCaptureImage = () => {
  gIsCaptureImage = true;
}

// Disable capture image function
const disableCaptureImage = () => {
  gIsCaptureImage = false;
}

let gSliderModulo;

// Set up all controllers 
const setupController = ( initModulo ) => {

  // Set font size for captions
  textSize( 15 );

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Slider Settings
  const minNumSlider = 1;
  const maxNumSlider = 10;
  gSliderModulo = createSlider( minNumSlider, maxNumSlider, initModulo );
  gSliderModulo.position( controllerOffset, controllerOffset );

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;

  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, gSliderModulo.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

}

// Getters
const getSliderModuloValue = () => { return gSliderModulo.value(); }

// Draw controller captions  
const drawControllerCaptions = () => {

  // Tentatively, disable stroke.
  noStroke();
  
  // Draw background
  fill( color( 'rgba( 0, 0, 0, 0.4 )' ) );
  const offset = 10;
  const width = 290;
  const height = 90;
  const cornerRound = 5;
  rect( offset, offset, width, height, cornerRound );

  // Draw captions
  textSize( 20 );
  fill( color( 'white' ) );

  const captionXPos = gSliderModulo.x * 1.5 + gSliderModulo.width + 20;
  text( 'Modulo: ' + getSliderModuloValue(), captionXPos, 40 );

  // Revert stroke
  stroke( color( 'black' ) );

}

// Capture Image
const captureImage = ( namePNG ) => {
  saveCanvas( namePNG, 'png' );
}

// get Timestamp string
const getYYYYMMDD_hhmmss = ( isNeedUS ) => {

  const now = new Date();
  let retVal = '';

  // YYMMDD
  retVal += now.getFullYear();
  retVal += padZero2Digit( now.getMonth() + 1 );
  retVal += padZero2Digit( now.getDate() );

  if( isNeedUS ){ retVal += '_'; }

  // hhmmss
  retVal += padZero2Digit( now.getHours() );
  retVal += padZero2Digit( now.getMinutes() );
  retVal += padZero2Digit( now.getSeconds() );

  return retVal;

}

// padding function
const padZero2Digit = ( num ) => {
  return ( num < 10 ? "0" : "" ) + num;
}
