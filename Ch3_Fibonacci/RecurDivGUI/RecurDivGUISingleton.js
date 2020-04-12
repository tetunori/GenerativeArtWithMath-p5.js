
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
let gSliderThreashold;

// Set up all controllers 
const setupController = ( initNum, initThreashold ) => {

  // Set font size for captions
  textSize( 15 );

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Slider Settings
  const minNumSlider = 1;
  const maxNumSlider = 20;
  gSliderNum = createSlider( minNumSlider, maxNumSlider, initNum );
  gSliderNum.position( controllerOffset, controllerOffset );

  const minThreasholdSlider = 0;
  const maxThreasholdSlider = 9;
  gSliderThreashold = createSlider( minThreasholdSlider, maxThreasholdSlider, initThreashold );
  gSliderThreashold.position( controllerOffset, gSliderNum.y + controllerMargin );

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, gSliderThreashold.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

}

// Getters
const getSliderNumValue = () => { return gSliderNum.value(); }
const getSliderThreasholdValue = () => { return gSliderThreashold.value(); }

// Draw controller captions  
const drawControllerCaptions = () => {

  // Tentatively, disable stroke.
  noStroke();
  
  // Draw background
  fill( color( 'rgba( 0, 0, 0, 0.3 )' ) );
  const offset = 10;
  const width = 265;
  const height = 130;
  const cornerRound = 5;
  rect( offset, offset, width, height, cornerRound );

  // Draw captions
  fill( color( 'white' ) );
  text( 'Num: ' + getSliderNumValue(), gSliderNum.x * 1.5 + gSliderNum.width, 37 );
  text( 'Threashold: ' + getSliderThreasholdValue(), gSliderThreashold.x * 1.5 + gSliderThreashold.width, 77 );
  
  // Revert stroke
  stroke( color( 'black' ) );

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

let gArrayFibonacci = undefined;
const generateFibonacci = ( maxIndex ) => {

  const array = [ 0, 1 ];

  for( let index = 1; index < maxIndex; index++ ){
    array.push( array[ index - 1 ] + array[ index ] )
  }

  gArrayFibonacci = array.reverse();
  // console.log( gArrayFibonacci );

}

// Initial divSquare
const initialDivSquare = () =>{

  const xPos = 0;
  const yPos = 0;
  const index = 0;
  const iteration = 0;
  const signX = 1;
  const signY = 1;

  divSquare( xPos, yPos, index, iteration, signX, signY ); 

}

let gDivisionCanvasWidth = 0;
let gDivisionNum = 0;
let gDivisionThreashold = 0;
const setDivisionValues = ( width, num, threashold ) => {

  gDivisionCanvasWidth = width;
  gDivisionNum = num;
  gDivisionThreashold = threashold;

} 

// Return appropriate sign value against index
const getSign = ( index ) => {

  const signArray = [ 1, 1, -1, -1 ];
  return signArray[ index % 4 ];

} 

// Draw colored rect. index is used for setting color
const drawColorRect = ( xPos, yPos, width, height, index ) => {

  const scalar = gDivisionCanvasWidth / gArrayFibonacci[ 0 ];

  // Change the colors in order
  // fill( ( 100 * index / gDivisionNum ) % 100, 100, 100 );
  fill( ( 100 * index / gDivisionNum ) % 100, 40, 100 );

  rect( scalar * xPos, scalar * yPos, 
          scalar * width, scalar * height );
  
}

// Divide a rectangle with squares
const divRect = ( xPos, yPos, index, iteration, signX, signY ) => {

  for( let i = 0; i < gDivisionNum - index; i++ ){

    // Draw a square
    const length = gArrayFibonacci[ i + index ];
    const newSignX = signX * getSign( i + 1 );
    const newSignY = signY * getSign( i );
    drawColorRect( xPos, yPos, 
                    newSignX * length, newSignY * length, 
                      i + index );

    // Move position
    xPos += newSignX * length;
    yPos += newSignY * length;
    if( iteration < gDivisionThreashold ){
      divSquare( xPos, yPos, i + index, iteration + 1, -newSignX, -newSignY );
    }

  }

}

// Divide a square with rectangles
const divSquare = ( xPos, yPos, index, iteration, signX, signY ) => {

  for( let i = 0; i < gDivisionNum - index; i++ ){ 

    // Draw a rectangle
    const lengthShort = gArrayFibonacci[ i + index + 1 ];
    const lengthLong = gArrayFibonacci[ i + index ];
    const newSignX = signX * getSign( i );
    const newSignY = signY * getSign( i + 1 );
    drawColorRect( xPos, yPos, 
                    newSignX * lengthShort, newSignY * lengthLong, 
                      i + index + 1 );

    // Move position
    xPos += newSignX * lengthShort;
    yPos += newSignY * lengthLong;
    if( iteration < gDivisionThreashold ){
      divRect( xPos, yPos, i + index + 1, iteration + 1, -newSignX, -newSignY );
    }

  }

}

