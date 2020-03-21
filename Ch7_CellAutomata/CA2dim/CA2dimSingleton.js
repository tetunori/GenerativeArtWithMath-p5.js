
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

// Transit to next generation values
const transition = ( idRow, idColumn, num, array, modulo ) => {

  const next = array[ ( idRow - 1 + num ) % num ][ idColumn ] +   // Up cell
                array[ idRow ][ ( idColumn - 1 + num ) % num ] +  // Left cell
                array[ idRow ][ idColumn ] +                      // Center cell
                array[ idRow ][ ( idColumn + 1 ) % num ] +        // Right cell
                array[ ( idRow + 1 ) % num ][ idColumn ];         // Down cell


  return next % modulo;

}

// Update array
const updateState = () => {

  const num = gMaxGenerationNum;

  const nextStateArray = getNew2DimensionArray( num );

  for( let idRow = 0; idRow < num; idRow++ ){

    for( let idColumn = 0; idColumn < num; idColumn++ ){

      nextStateArray[ idRow ][ idColumn ] = 
        transition( idRow, idColumn, num, gStateArray, gModulo );
      
    }

  }

  gStateArray = nextStateArray;

}

// Draw cells on canvas
const drawCell = ( num, array, modulo, height ) => {

  const scalar = height / num;
  let yPos = 0;
  let xPos = 0;
  
  for( let idRow = 0; idRow < num; idRow++ ){

    xPos = 0;
    for( let idColumn = 0; idColumn < num; idColumn++ ){

      noStroke();
      const colorParam = array[ idRow ][ idColumn ] * 100 / modulo;
      fill( colorParam, colorParam, 100 );
      rect( xPos, yPos, scalar, scalar );
      
      xPos += scalar;

    }
    
    yPos += scalar;

  }

}

// Get new two dimension array with padding 0
const getNew2DimensionArray = ( num ) => {
  return Array.from( new Array( num ), () => new Array( num ).fill( 0 ) );
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

const onChangeModuloValue = () => {

  initialize();
  gModulo = getSliderModuloValue();
  console.log( 'modulo: ' + gModulo );
  background( 'white' );

}

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
  gSliderModulo.mouseReleased( onChangeModuloValue );

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
