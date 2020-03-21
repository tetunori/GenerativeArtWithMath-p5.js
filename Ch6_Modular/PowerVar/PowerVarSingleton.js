
let gModulo = 7;

const VISUAL_MODE_COLORED = 1;
const VISUAL_MODE_SCALE   = 2;
const VISUAL_MODE_COLORED_SCALE = 3;
let gModeVisual = VISUAL_MODE_COLORED;

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
    let namePNG = 'Modulo_' + gModulo;

    if( gModeVisual === VISUAL_MODE_COLORED ){
      namePNG += '_Colored'; 
    }else if( gModeVisual === VISUAL_MODE_SCALE ){
      namePNG += '_Scale'; 
    }else if( gModeVisual === VISUAL_MODE_COLORED_SCALE ){
      namePNG += '_Both'; 
    } 

    namePNG += '_' + getYYYYMMDD_hhmmss( true ) + '.png';
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

      
      const vector = createVector( idColumn - 0.5, idRow - 0.5 );
      vector.mult( scalar );

      if( gModeVisual === VISUAL_MODE_COLORED ){

        // Draw color dot
        fill( num * 100 / modulo, 100, 100 );
        noStroke();
        ellipse( vector.x, vector.y, scalar / 2, scalar / 2 );

      }else if( gModeVisual === VISUAL_MODE_SCALE ){

        // Draw black dot
        fill( 'black' );
        const size = scalar * num / modulo;
        ellipse( vector.x, vector.y, size, size );

      }else if( gModeVisual === VISUAL_MODE_COLORED_SCALE ){

        // Draw black dot
        fill( num * 100 / modulo, 100, 100 );
        noStroke();
        const size = scalar * num / modulo;
        ellipse( vector.x, vector.y, size, size );

      }

      num = ( num * idRow ) % modulo;
      
    }

  }

}

const toggleVisualMode = () => {
  
  gModeVisual++;
  if( gModeVisual > VISUAL_MODE_COLORED_SCALE ){
    gModeVisual = VISUAL_MODE_COLORED;
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
  const maxNumSlider = 30;
  gSliderModulo = createSlider( minNumSlider, maxNumSlider, initModulo );
  gSliderModulo.position( controllerOffset, controllerOffset );

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btToggleVisualMode = createButton( 'TOGGLE VISUAL' );
  btToggleVisualMode.position( controllerOffset, gSliderModulo.y + controllerMargin );
  btToggleVisualMode.size( buttonWidth, buttonHeight );
  btToggleVisualMode.mousePressed( toggleVisualMode );

  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, btToggleVisualMode.y + controllerMargin );
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
  const height = 130;
  const cornerRound = 5;
  rect( offset, offset, width, height, cornerRound );

  // Draw captions
  textSize( 20 );
  fill( color( 'white' ) );

  const captionXPos = gSliderModulo.x * 1.5 + gSliderModulo.width + 20;
  text( 'Modulo: ' + getSliderModuloValue(), captionXPos, 40 );

  // Visualize mode text
  if( gModeVisual === VISUAL_MODE_COLORED ){
    text( 'Colored', captionXPos, 76 );
  }else if( gModeVisual === VISUAL_MODE_SCALE ){
    text( 'Scale', captionXPos, 76 );
  }else if( gModeVisual === VISUAL_MODE_COLORED_SCALE ){
    text( 'Both', captionXPos, 76 );
  }
  
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
