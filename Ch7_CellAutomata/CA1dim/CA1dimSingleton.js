
const gMaxGenerationNum = 250;
let gGeneration = 0;
let gStateArray = [ 1 ];
let gModulo = 2;

const WIDTH = 1000;
const HEIGHT = 500;

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  setupController();
  toggleTransition();
  console.log( 'modulo: ' + gModulo );
  background( 'white' );
  
}

function draw() {

  if( gGeneration < gMaxGenerationNum ){

    drawCell( gGeneration, gMaxGenerationNum, gStateArray, gModulo, WIDTH );
    updateState();
    
  }

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = 'Modulo_' + gModulo + '_' + getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

}

function mouseClicked() {
  
  gGeneration = 0;
  gStateArray = [ 1 ];
  gModulo = getRandomInteger( 2, 20 );
  console.log( 'modulo: ' + gModulo );
  background( 'white' );

}

let gModeTransition = -1;

// Transit to next generation values
const transition = ( numA, numB, numC, modulo ) => {

  let retValue = 0;

  switch( gModeTransition ){
    default:
    case 0:
      retValue = ( numA + numB + numC ) % modulo;
      break;
    case 1:
      retValue = ( numA + numC ) % modulo;
      break;
    case 2:
      retValue = ( numA + numB ) % modulo;
      break;
    case 3:
      retValue = ( numA + numB + numC + 1 ) % modulo;
      break;
    case 4:
      retValue = ( numB + numC ) % modulo;
      break;
  }

  return retValue;

}

const toggleTransition = () => {

  gModeTransition++;
  if( gModeTransition > 4 ){
    gModeTransition = 0;
  }

  switch( gModeTransition ){
    default:
    case 0:
      console.log( 'Transition: d = a + b + c' );
      break;
    case 1:
      console.log( 'Transition: d = a + c' );
      break;
    case 2:
      console.log( 'Transition: d = a + b' );
      break;
    case 3:
      console.log( 'Transition: d = a + b + c + 1' );
      break;
    case 4:
      console.log( 'Transition: d = b + c' );
      break;
  }

}

// Update array
const updateState = () => {

  const arrayBoundaryValue = [ 0, 0 ];
  const array = gStateArray;
  const nextStateArray = new Array( array.length + 2 );

  for( let element of arrayBoundaryValue ){
    array.splice( 0, 0, element );
  }

  for( let element of arrayBoundaryValue ){
    array.splice( array.length, 0, element );
  }
  
  for( let index = 1; index < array.length - 1; index++ ){
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    nextStateArray[ prevIndex ] = 
      transition( array[ prevIndex ], array[ index ], array[ nextIndex ], gModulo );
  }

  gStateArray = nextStateArray;
  gGeneration++;

}

// Draw cells on canvas
const drawCell = ( generation, num, array, modulo, width ) => {

  const scalar = width * 0.5 / num;
  let xPos = ( width - array.length * scalar ) * 0.5;
  const yPos = generation * scalar;

  noStroke();
  
  for( const element of array ){

    const colorParam = element * 100 / modulo;
    if( colorParam < 1 ){
      fill( colorParam, colorParam, 100 );
    }else{
      fill( colorParam, colorParam, 90 );
    }
    rect( xPos, yPos, scalar, scalar );
    xPos += scalar;

  }

}

// Get random integer between min and max
const getRandomInteger = ( min, max ) => {
  return Math.floor( random( min, max ) );
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

let gSliderNum;

// Set up all controllers 
const setupController = () => {

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btMode1 = createButton( 'TOGGLE TRANS' );
  btMode1.position( controllerOffset, controllerOffset );
  btMode1.size( buttonWidth, buttonHeight );
  btMode1.mousePressed( toggleTransition );

  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, btMode1.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

}

