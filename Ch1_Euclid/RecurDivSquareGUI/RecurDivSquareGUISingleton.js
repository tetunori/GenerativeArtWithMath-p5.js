
let gThreashold = 100;
let gNumA = 10;
let gNumB =  6;
let gRatio = gNumB / gNumA;

const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  setupController( gNumA, gNumB, gThreashold );
  
}

function draw() {
  
  background( 100, 0, 100 );
  gNumA = getSliderNumAValue();
  gNumB = getSliderNumBValue();
  gThreashold = getSliderThreasholdValue();

  gRatio = gNumB / gNumA;
  initColorCount();

  if( gRatio != 1 ){
    divSquare( 0, 0, WIDTH, gRatio, gThreashold );
  }

  if( isEnableCaptureImage() ){
    disableCaptureImage();
    const namePNG = 'NumA' + gNumA + '_NumB' + gNumB + '_Thr' + gThreashold + '.png';
    captureImage( namePNG );
  }

  drawControllerCaptions();
}

// Divide a square whose length is squareWidth at ( xPos, yPos ) with some rectangles whose sides have ratio.
const divSquare = ( xPos, yPos, squareWidth, ratio, threashold ) => {

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth + yPos;
  let itr = 0;

  setColor();
  rect( xPos, yPos, squareWidth, squareWidth );
  
  while( squareWidth > threashold + 0.1 ){

    itr++;
    if( isOdd( itr ) ){

      const nextWidth = squareWidth * ratio;
      while( xPos + nextWidth < xEndPos + 0.1 ){
        
        divRect( xPos, yPos, nextWidth, ratio, threashold );
        xPos += nextWidth;

      }
      squareWidth = xEndPos - xPos;

    }else{

      const nextHeight = squareWidth / ratio;
      while ( yPos + nextHeight < yEndPos + 0.1 ){

        divRect( xPos, yPos, squareWidth, ratio, threashold );
        yPos += nextHeight;
        
      }
      squareWidth = yEndPos - yPos;

    }

  }

}

// Divide a rectangle with specified ratio whose width is squareWidth at ( xPos, yPos ) with some squares.
const divRect = ( xPos, yPos, squareWidth, ratio, threashold ) => {

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth / ratio + yPos;
  let itr = 0;

  setColor();
  rect( xPos, yPos, squareWidth, squareWidth / ratio );

  while( squareWidth > threashold + 0.1 ){

    itr++;
    if( isEven( itr ) ){

      while( xPos + squareWidth < xEndPos + 0.1 ){

        divSquare( xPos, yPos, squareWidth, ratio, threashold );
        xPos += squareWidth;

      }
      squareWidth = xEndPos - xPos;

    }else{

      while ( yPos + squareWidth < yEndPos + 0.1 ){

        divSquare( xPos, yPos, squareWidth, ratio, threashold );
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

let gColorCount = 0;
const initColorCount = () => { gColorCount = 0; }

const gRandomColorArray = [];

// Set Color for each count
const setColor = () => {
  
  // If new element found, add a random color. 
  if( gRandomColorArray.length <= gColorCount ){
    gRandomColorArray.push( random( 100 ) );
  }
  
  // fill( color( gRandomColorArray[ gColorCount ], 100, 100 ) );
  fill( color( gRandomColorArray[ gColorCount ], 40, 100 ) );
  gColorCount++;
  
}

// Change all colors in the array
const changeColor = () => {

  gRandomColorArray.forEach( ( element, index ) => {
    gRandomColorArray[ index ] = random( 100 );
  });

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

let gSliderNumA;
let gSliderNumB;
let gSliderThreashold;

// Set up all controllers 
const setupController = ( initNumA, initNumB, initThr ) => {

  // Set font size for captions
  textSize( 15 );

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Slider Settings
  const minNumSlider = 1;
  const maxNumSlider = 40;
  gSliderNumA = createSlider( minNumSlider, maxNumSlider, initNumA );
  gSliderNumA.position( controllerOffset, controllerOffset );

  gSliderNumB = createSlider( minNumSlider, maxNumSlider, initNumB );
  gSliderNumB.position( controllerOffset, gSliderNumA.y + controllerMargin );

  const minThrSlider = 10;
  const maxThrSlider = 300;
  gSliderThreashold = createSlider( minThrSlider, maxThrSlider, initThr );
  gSliderThreashold.position( controllerOffset, gSliderNumB.y + controllerMargin );

  // Button Settings
  const buttonWidth = 130;
  const buttonHeight = 20;
  const btChangeColor = createButton( 'CHANGE COLOR' );
  btChangeColor.position( controllerOffset, gSliderThreashold.y + controllerMargin );
  btChangeColor.size( buttonWidth, buttonHeight );
  btChangeColor.mousePressed( changeColor );

  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, btChangeColor.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

}

// Getters
const getSliderNumAValue = () => { return gSliderNumA.value(); }
const getSliderNumBValue = () => { return gSliderNumB.value(); }
const getSliderThreasholdValue = () => { return gSliderThreashold.value(); }

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
  text( 'Num A: ' + getSliderNumAValue(), gSliderNumA.x * 1.5 + gSliderNumA.width, 37 );
  text( 'Num B: ' + getSliderNumBValue(), gSliderNumB.x * 1.5 + gSliderNumB.width, 77 );
  text( 'Threashold: ' + getSliderThreasholdValue(), gSliderThreashold.x * 1.5 + gSliderThreashold.width, 117 );
  
  // Revert stroke
  stroke( color( 'black' ) );

}
