
let gIteration =  0;
let gNum = 10;
let gRotationAngle = 1.0 / gNum;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gNum );
  console.log( 'num: ' + gNum  );
  background( 'white' );

  push();
    translate( WIDTH / 2, HEIGHT / 2 );

    stroke( 'blue' );
    drawLine( gNum, WIDTH );

    stroke( 'red' );
    drawRealFermatCurve( gRotationAngle, WIDTH );
  pop();

}

function draw() {
  
  translate( WIDTH / 2, HEIGHT / 2 );
  noStroke();
  drawFermatSpiral( gIteration, gRotationAngle );
  gIteration++;

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = '1_' + gNum + '_' + getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

}

const scalar = 30;

const drawFermatSpiral = ( iteration, angleRotation ) => {

  const theta = 2 * Math.PI * angleRotation * iteration;
  const vector = p5.Vector.fromAngle( theta );
  vector.mult( scalar * Math.sqrt( iteration ) );
  fill( 0 );
  ellipse( vector.x, vector.y, 10, 10 );

}

// Draw Line from the center to divide the canvas into num pieces
const drawLine = ( num, width ) => {

  for( let index = 0; index < num; index++ ){

    const vector = p5.Vector.fromAngle( 2 * index * Math.PI / num );
    vector.mult( width / Math.sqrt( 2 ) );
    line( vector.x, vector.y, 0, 0 );

  }

}

const drawRealFermatCurve = ( angleRotation, width ) => {

  const STEP = 2 * Math.PI * 0.01;
  let theta = 0;
  let radian = 0;

  noFill();
  beginShape();

  while( radian < width / Math.sqrt( 2 ) ){

    radian = scalar * Math.sqrt( theta / ( 2 * Math.PI * angleRotation ) );
    const vector = p5.Vector.fromAngle( theta );
    vector.mult( radian );
    vertex( vector.x, vector.y );
    theta += STEP;

  }

  endShape();
  
}

const setSpiralMode = () => {

  gNum = getSliderNumValue();
  gRotationAngle = 1 / gNum;
  console.log( 'num: ' + gNum );
  background( 'white' );

  stroke( 'blue' );
  drawLine( gNum, WIDTH );

  stroke( 'red' );
  drawRealFermatCurve( gRotationAngle, WIDTH );

  gIteration =  0;

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
const setupController = ( initNum ) => {

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;

  const minNumSlider = 1;
  const maxNumSlider = 40;
  gSliderNum = createSlider( minNumSlider, maxNumSlider, initNum );
  gSliderNum.position( controllerOffset, controllerOffset / 2 );
  gSliderNum.mouseReleased( setSpiralMode );

  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, gSliderNum.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

}

// Getter
const getSliderNumValue = () => { return gSliderNum.value(); }
