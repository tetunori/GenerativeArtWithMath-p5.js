
let gTheta = 0;
const STEP = 2 * Math.PI * 0.01;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  setupController();
  
}

function draw() {

  translate( WIDTH / 2, HEIGHT / 2 );

  const lineX1 = rad( gTheta ) * Math.cos( gTheta );
  const lineY1 = rad( gTheta ) * Math.sin( gTheta );
  const lineX2 = rad( gTheta + STEP ) * Math.cos( gTheta + STEP );
  const lineY2 = rad( gTheta + STEP ) * Math.sin( gTheta + STEP );
  line( lineX1, lineY1, lineX2, lineY2 );

  gTheta += STEP;
  
  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = gMode + '_' + getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

}

const MODE_ARCHIMEDES = 'ARCHIMEDES';
const MODE_FERMAT = 'FERMAT';
const MODE_LOGARITHMIC = 'LOGARITHMIC';
let gMode = MODE_ARCHIMEDES;

// Calcurate radian
const rad = ( angle ) => {

  let retValue = undefined;
  
  if( gMode === MODE_ARCHIMEDES ){
    retValue = 5 * angle;
  }else if( gMode === MODE_FERMAT ){
    retValue = 20 * Math.sqrt( angle );
  }else{
    retValue = Math.pow( 1.1, angle );
  }
  return retValue;

}

const setSpiralMode = ( mode ) => {

  gMode = mode;
  gTheta = 0;
  background( 'white' );
  translate( -WIDTH / 2, -HEIGHT / 2 );

}

const setArchimedes = () => { setSpiralMode( MODE_ARCHIMEDES ); }
const setFermat = () => { setSpiralMode( MODE_FERMAT ); }
const setLogarithmic = () => { setSpiralMode( MODE_LOGARITHMIC ); }

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

// Set up all controllers 
const setupController = () => {

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btArchimedes = createButton( MODE_ARCHIMEDES );
  btArchimedes.position( controllerOffset, controllerOffset );
  btArchimedes.size( buttonWidth, buttonHeight );
  btArchimedes.mousePressed( setArchimedes );

  const btFermat = createButton( MODE_FERMAT );
  btFermat.position( controllerOffset, btArchimedes.y + controllerMargin );
  btFermat.size( buttonWidth, buttonHeight );
  btFermat.mousePressed( setFermat );

  const btLogarithmic = createButton( MODE_LOGARITHMIC );
  btLogarithmic.position( controllerOffset, btFermat.y + controllerMargin );
  btLogarithmic.size( buttonWidth, buttonHeight );
  btLogarithmic.mousePressed( setLogarithmic );

  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, btLogarithmic.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

}
