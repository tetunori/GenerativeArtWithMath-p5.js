
const gStep = 30;

let controlPoints = [];

let gGon = 10;

const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

function setup() {

  const myCanvas = createCanvas( WIDTH + WIDTH_EXT, HEIGHT, P2D );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  setupController( gGon );

  background( 'white' );
  drawNumber();
  drawShape();

}

function draw() {}

function mouseClicked() {

  if( ( mouseX < WIDTH ) && ( mouseY < HEIGHT ) ){
    drawShape();  
  }
  
}

const drawShape = () => {

  // Initialize control point array
  controlPoints = [];

  // fill( color( random(100), 100, 100 ) );
  fill( color( random(100), 40, 100 ) );
  stroke( 'black' );
  strokeWeight( 1 );

  push();

    translate( WIDTH / 2, HEIGHT / 2 );

    for( let idReflection = 0; idReflection < 2; idReflection++ ){

      for( let idRotation = 0; idRotation < gGon; idRotation++ ){

        push();

          // Consider reflection
          scale( 1, Math.pow( -1, idReflection )  );

          // Consider rotation
          rotate( idRotation * 2 * Math.PI / gGon );

          // Draw Curve
          drawCurve();

        pop();

      }

    }

  pop();

}

const drawCurve = () => {

  const vectors = [];

  for( let index = 0; index < 2; index++ ){
    
    let newVector = p5.Vector.fromAngle( index * Math.PI / gGon );
    newVector.mult( WIDTH / 2 );
    vectors.push( newVector );

  }

  for( let index = 0; index < 4; index++ ){

    const newVector = p5.Vector.mult( vectors[ Math.floor( index / 2 ) ], random( 1 ) );
    controlPoints.push( newVector );

  }

  beginShape();
    vertex( 0, 0 );
    vertex( controlPoints[ 0 ].x, controlPoints[ 0 ].y );
    bezierVertex(  
          controlPoints[ 1 ].x, controlPoints[ 1 ].y,
          controlPoints[ 2 ].x, controlPoints[ 2 ].y,
          controlPoints[ 3 ].x, controlPoints[ 3 ].y );
  endShape( CLOSE );

}

// Set number from controller
const setGonNumber = () => {

  gGon = getSliderNumValue();
  background( 'white' );
  drawNumber();
  drawShape();
  
}

let gSliderNum;
const controllerOffset = 20;
const controllerMargin = 40;

// Set up all controllers 
const setupController = ( initNum ) => {

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
  gSliderNum.mouseReleased( setGonNumber );
  gSliderNum.touchEnded( setGonNumber );

}

// Draw Number 
const drawNumber = () => {

  // Text
  noStroke();
  fill( color( 'black' ) );
  textSize( 14 );

  const description = 'gon: ' + gGon;
  text( description, 
          controllerOffset + WIDTH, 
          gSliderNum.y + controllerMargin );
  
}

// Getter
const getSliderNumValue = () => { return gSliderNum.value(); }

// Capture Image
const captureImage = () => {

  const namePNG = 'gon' + gGon + '_' + getYYYYMMDD_hhmmss( true ) + '.png';
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
