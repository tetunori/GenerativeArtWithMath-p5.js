
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


const gRandomProbabilityArray = [];
let gDrawnRectCount = 0;
const initDivision = () => { gDrawnRectCount = 0; }

// Draw rectangles
const drawRect = ( xPos, yPos, width, height ) => {

  drawColorRect( xPos, yPos, width, height, gDrawnRectCount );

  if ( gRandomProbabilityArray.length <= gDrawnRectCount ){
    gRandomProbabilityArray.push( random( 1 ) );
  }

  gDrawnRectCount++;

}

// Divide a square whose length is squareWidth at ( xPos, yPos ) with some rectangles whose sides have ratio.
const divSquare = ( xPos, yPos, squareWidth, ratio, thrDiv, thrPrb ) => {

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth + yPos;
  let itr = 0;

  while( squareWidth > thrDiv + 0.1 ){

    itr++;
    if( isOdd( itr ) ){

      const nextWidth = squareWidth * ratio;
      while( xPos + nextWidth < xEndPos + 0.1 ){
        
        drawRect( xPos, yPos, nextWidth, squareWidth );
        if( gRandomProbabilityArray[ gDrawnRectCount - 1 ] < thrPrb ){
          divRect( xPos, yPos, nextWidth, ratio, thrDiv, thrPrb );
        }
        xPos += nextWidth;

      }
      squareWidth = xEndPos - xPos;

    }else{

      const nextHeight = squareWidth / ratio;
      while ( yPos + nextHeight < yEndPos + 0.1 ){

        drawRect( xPos, yPos, squareWidth, nextHeight );
        if( gRandomProbabilityArray[ gDrawnRectCount - 1 ] < thrPrb ){
          divRect( xPos, yPos, squareWidth, ratio, thrDiv, thrPrb );
        }
        yPos += nextHeight;
        
      }
      squareWidth = yEndPos - yPos;

    }

  }

}

// Divide a rectangle with specified ratio whose width is squareWidth at ( xPos, yPos ) with some squares.
const divRect = ( xPos, yPos, squareWidth, ratio, thrDiv, thrPrb ) => {

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth / ratio + yPos;
  let itr = 0;

  while( squareWidth > thrDiv + 0.1 ){

    itr++;
    if( isEven( itr ) ){

      while( xPos + squareWidth < xEndPos + 0.1 ){

        drawRect( xPos, yPos, squareWidth, squareWidth );
        if( gRandomProbabilityArray[ gDrawnRectCount - 1 ]  < thrPrb ){
          divSquare( xPos, yPos, squareWidth, ratio, thrDiv, thrPrb );
        }
        xPos += squareWidth;

      }
      squareWidth = xEndPos - xPos;

    }else{

      while ( yPos + squareWidth < yEndPos + 0.1 ){

        drawRect( xPos, yPos, squareWidth, squareWidth );
        if( gRandomProbabilityArray[ gDrawnRectCount - 1 ] < thrPrb ){
          divSquare( xPos, yPos, squareWidth, ratio, thrDiv, thrPrb );
        }
        yPos += squareWidth;
        
      }
      squareWidth = yEndPos - yPos;

    }

  }

}

// The number is even or not.
const isEven = ( number ) => {
  return ( number % 2 === 0 );
}

// The number is odd or not.
const isOdd = ( number ) => {
  return ( number % 2 === 1 );
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

const gRandomColorArray = [];

// Change all colors in the array
const changeColor = () => {

  gRandomColorArray.forEach( ( element, index ) => {
    gRandomColorArray[ index ] = random( 100 );
  });

}

// Draw colored rect
const drawColorRect = ( xPos, yPos, width, height, count ) => {

  if ( gRandomColorArray.length <= count ){
    gRandomColorArray.push( random( 100 ) );
  }

  if( isEnableMondrian() ){
    setMondrianColor( gRandomColorArray[ count ] );
  }else{    
    fill( color( gRandomColorArray[ count ], 100, 100 ) );
    strokeWeight( 1 );
  }

  rect( xPos, yPos, width, height );
  
}

// Set color from Mondrian color palette 
const setMondrianColor = ( randomValue ) => {

  let mondrianColor;

  if( randomValue < 15 ){
    mondrianColor = color( 0, 100, 100 );
  }else if( randomValue < 30 ){
    mondrianColor = color( 67, 100, 100 );
  }else if( randomValue < 45 ){
    mondrianColor = color( 17, 100, 100 );
  }else if( randomValue < 50 ){
    mondrianColor = color( 0, 100, 0 );
  }else if( randomValue < 70 ){
    mondrianColor = color( 0, 0, 90 );
  }else{
    mondrianColor = color( 0, 0, 100 );
  }

  fill( mondrianColor );
  strokeWeight( 5 );

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

let gIsMondrian = false;

// Is Mondrian function is ready or not
const isEnableMondrian = () => {
  return ( gIsMondrian === true );
}

// Enable Mondrian function
const enableMondrian = () => {
  gIsMondrian = true;
}

// Disable Mondrian function
const disableMondrian = () => {
  gIsMondrian = false;
}

// Toggle Mondrian function
const toggleMondrian = () => {
  if( isEnableMondrian() ){
    disableMondrian();
  }else{
    enableMondrian();
  }
}

let gSliderThrDivsion;
let gSliderThrProbability;

// Set up all controllers 
const setupController = ( initThrDivision, initThrProbability ) => {

  // Set font size for captions
  textSize( 15 );

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Slider Settings
  const minThrDivSlider = 10;
  const maxThrDivSlider = 300;
  gSliderThrDivsion = createSlider( minThrDivSlider, maxThrDivSlider, initThrDivision );
  gSliderThrDivsion.position( controllerOffset, controllerOffset );

  const minThrPrbSlider = 0;
  const maxThrPrbSlider = 1;
  gSliderThrProbability = createSlider( minThrPrbSlider, maxThrPrbSlider, initThrProbability, 0.01 );
  gSliderThrProbability.position( controllerOffset, gSliderThrDivsion.y + controllerMargin );

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btChangeColor = createButton( 'CHANGE COLOR' );
  btChangeColor.position( controllerOffset, gSliderThrProbability.y + controllerMargin );
  btChangeColor.size( buttonWidth, buttonHeight );
  btChangeColor.mousePressed( changeColor );

  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, btChangeColor.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

  const btToggleMondrian = createButton( 'TOGGLE MONDRIAN' );
  btToggleMondrian.position( controllerOffset, btCaptureImage.y + controllerMargin );
  btToggleMondrian.size( buttonWidth, buttonHeight );
  btToggleMondrian.mousePressed( toggleMondrian );

}

// Getters
const getSliderThreasholdDivisionValue = () => { return gSliderThrDivsion.value(); }
const getSliderThreasholdProbabilityValue = () => { return gSliderThrProbability.value(); }

// Draw controller captions  
const drawControllerCaptions = () => {

  // Tentatively, disable stroke.
  noStroke();
  
  // Draw background
  fill( color( 'rgba( 0, 0, 0, 0.3 )' ) );
  const offset = 10;
  const width = 285;
  const height = 205;
  const cornerRound = 5;
  rect( offset, offset, width, height, cornerRound );

  // Draw captions
  fill( color( 'white' ) );
  text( 'Thr Div: ' + getSliderThreasholdDivisionValue(), gSliderThrDivsion.x * 1.5 + gSliderThrDivsion.width, 37 );
  text( 'Thr Prb: ' + getSliderThreasholdProbabilityValue(), gSliderThrProbability.x * 1.5 + gSliderThrProbability.width, 77 );
  
  // Revert stroke
  stroke( color( 'black' ) );

}

