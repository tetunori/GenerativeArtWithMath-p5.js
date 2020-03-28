
const gStep = 30;
let gIterator = 0;

let gNum = 5;
let controlPoints = [];

const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

function setup() {

  const myCanvas = createCanvas( WIDTH + WIDTH_EXT, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  setupController( gNum );

  // Initialize control points
  initializeControlPoints();

  noFill();

}

function draw() {

  if( gIterator === 0 ){
    background( 'white' );
    drawNumber();
  }

  drawBezier( gStep );

}

// Draw Bezier curve
const drawBezier = ( step ) => {

  // Draw Bezier curve by ourselves 
  let midPoint = controlPoints;
  while( midPoint.length > 1 ){

    midPoint = getVertex( midPoint, gIterator * 1.0 / step );

    stroke( midPoint.length * 100 / controlPoints.length, 100, 100, 20 );
    drawLine( midPoint );

  }
  gIterator++;

  // Draw Bezier curve from p5.js API 
  if( gIterator > step ){
    noLoop();
  }
 
}

function mouseClicked() {

  if( ( mouseX < WIDTH ) && ( mouseY < HEIGHT ) ){
    initializeControlPoints();
  }
  
}

const initializeControlPoints = () => {

  gIterator = 0;
  controlPoints = [];

  for( let index = 0; index < gNum; index++ ){

    controlPoints[ index ] = p5.Vector.random2D();
    controlPoints[ index ].mult( WIDTH / 2 );
    controlPoints[ index ].add( WIDTH / 2, HEIGHT / 2 );

  }

  loop();

}

// Draw line
const drawLine = ( vectors ) => {

  if( vectors.length > 1 ){

    for( let index = 0; index < vectors.length - 1; index++ ){

      strokeWeight( 1 );
      const currentElement = vectors[ index ];
      const nextElement    = vectors[ index + 1 ];
      line( currentElement.x, currentElement.y, nextElement.x, nextElement.y );
      
    }

  }else{

    stroke( 'black' );
    strokeWeight( 8 );
    point( vectors[ 0 ].x, vectors[ 0 ].y );

  }

}

// Get Vertex
const getVertex = ( vectors, scalar ) => {
  
  const newVertex = [];
  for( let index = 0; index < vectors.length - 1; index++ ){

    let newVector = p5.Vector.sub( vectors[ index + 1 ], vectors[ index ] );
    newVector.mult( scalar );
    newVector.add( vectors[ index ] );
    newVertex.push( newVector );

  }

  return newVertex;

}

// Set number from controller
const setNumber = () => {

  gNum = getSliderNumValue();
  initializeControlPoints();
  
}

let gSliderNum;

// Set up all controllers 
const setupController = ( initNum ) => {

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset + WIDTH, controllerOffset + 20 );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( captureImage );

  // Slider Settings
  const minNumSlider = 3;
  const maxNumSlider = 20;
  gSliderNum = createSlider( minNumSlider, maxNumSlider, initNum );
  gSliderNum.position( controllerOffset + WIDTH, btCaptureImage.y + controllerMargin );
  gSliderNum.mouseReleased( setNumber );
  gSliderNum.touchEnded( setNumber );

}

// Draw Number 
const drawNumber = () => {

  const controllerOffset = 20;
  const controllerMargin = 40;
  
  // Text
  noStroke();
  fill( color( 'black' ) );
  textSize( 14 );

  const description = 'num: ' + gNum;
  text( description, 
          controllerOffset + WIDTH, 
          gSliderNum.y + controllerMargin );
  
}

// Getter
const getSliderNumValue = () => { return gSliderNum.value(); }

// Capture Image
const captureImage = () => {

  const namePNG = 'num' + gNum + '_' + getYYYYMMDD_hhmmss( true ) + '.png';
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
