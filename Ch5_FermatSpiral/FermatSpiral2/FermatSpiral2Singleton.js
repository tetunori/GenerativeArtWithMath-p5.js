
let gIteration =  0;

const MODE1_ARRAY = [ 1.0 / 3, 1.0 / 61, 20.0 / 61 ];
const MODE2_ARRAY = [ 4.0 / 17, 17.0 / 72, 72.0 / 305 ];
const MODE3_ARRAY = [ 33.0 / 109, 109.0 / 360 ];  
let gRotationAngleArray = MODE1_ARRAY;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  setupController();
  background( 'white' );

}

function draw() {
  
  translate( WIDTH / 2, HEIGHT / 2 );
  noStroke();

  fill( 255, 0, 0, 127 ); // Red
  drawFermatSpiral( gIteration, gRotationAngleArray[0] );
  fill( 0, 0, 255, 127  ); // Blue
  drawFermatSpiral( gIteration, gRotationAngleArray[1] );

  if( gRotationAngleArray.length > 2 ){
    fill( 0, 255, 0, 127 ); // Green
    drawFermatSpiral( gIteration, gRotationAngleArray[2] );
  }

  gIteration++;

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = gMode + '_' + getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

}

const drawFermatSpiral = ( iteration, angleRotation ) => {

  const scalar = 5;

  const theta = 2 * Math.PI * angleRotation * iteration;
  const vectorV = p5.Vector.fromAngle( theta );
  vectorV.mult( scalar * Math.sqrt( iteration ) );
  ellipse( vectorV.x, vectorV.y, scalar, scalar );

}

const MODE_1 = '1/3, 1/61, 20/61';
const MODE_2 = '4/17, 17/72, 72/305';
const MODE_3 = '33/109, 109/360';
let gMode = MODE_1;

const setSpiralMode = ( mode ) => {

  gMode = mode;
  if( mode === MODE_1 ){
    gRotationAngleArray = MODE1_ARRAY;
  }else if( mode === MODE_2 ){
    gRotationAngleArray = MODE2_ARRAY;
  }else if( mode === MODE_3 ){
    gRotationAngleArray = MODE3_ARRAY;  
  }

  background( 'white' );
  gIteration =  0;

}

const setMode1 = () => { setSpiralMode( MODE_1 ); }
const setMode2 = () => { setSpiralMode( MODE_2 ); }
const setMode3 = () => { setSpiralMode( MODE_3 ); }

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
  const btMode1 = createButton( MODE_1 );
  btMode1.position( controllerOffset, controllerOffset );
  btMode1.size( buttonWidth, buttonHeight );
  btMode1.mousePressed( setMode1 );

  const btMode2 = createButton( MODE_2 );
  btMode2.position( controllerOffset, btMode1.y + controllerMargin );
  btMode2.size( buttonWidth, buttonHeight );
  btMode2.mousePressed( setMode2 );

  const btMode3 = createButton( MODE_3 );
  btMode3.position( controllerOffset, btMode2.y + controllerMargin );
  btMode3.size( buttonWidth, buttonHeight );
  btMode3.mousePressed( setMode3 );

  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, btMode3.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

}

// Getter
const getSliderNumValue = () => { return gSliderNum.value(); }
