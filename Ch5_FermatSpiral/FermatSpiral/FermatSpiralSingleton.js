
let gIteration =  0;
let gRotationAngle = 17.0 / 55;
let gNum = 10;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gNum );
  background( 'white' );

}

function draw() {
  
  translate( WIDTH / 2, HEIGHT / 2 );
  fill( 0 );
  drawFermatSpiral( gIteration, gRotationAngle );
  gIteration++;

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    let namePNG;
    if( gMode === MODE_3 ){
      namePNG = '1_' + gNum;
    }else{
      namePNG = gMode;
    }
    namePNG += '_' + getYYYYMMDD_hhmmss( true ) + '.png';
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

const MODE_1 = '17 / 55';
const MODE_2 = 'Math.sqrt(5)';
const MODE_3 = '1 / N';
const MODE_4 = '( 1 + Math.sqrt(5) ) / 2';
const MODE_5 = 'Math.PI';
let gMode = MODE_1;

const setSpiralMode = ( mode ) => {

  gMode = mode;
  if( mode === MODE_1 ){
    gRotationAngle = 17.0 / 55;
  }else if( mode === MODE_2 ){
    gRotationAngle = Math.sqrt( 5 );
  }else if( mode === MODE_3 ){
    gNum = getSliderNumValue();
    gRotationAngle = 1 / gNum;
    console.log( 'num: ' + gNum  );
  }else if( mode === MODE_4 ){
    gRotationAngle = ( 1 + Math.sqrt(5) ) / 2;
  }else{
    gRotationAngle = Math.PI;
  }

  background( 'white' );
  gIteration =  0;

}

const setMode1 = () => { setSpiralMode( MODE_1 ); }
const setMode2 = () => { setSpiralMode( MODE_2 ); }
const setMode3 = () => { setSpiralMode( MODE_3 ); }
const setMode4 = () => { setSpiralMode( MODE_4 ); }
const setMode5 = () => { setSpiralMode( MODE_5 ); }

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

  const minNumSlider = 1;
  const maxNumSlider = 40;
  gSliderNum = createSlider( minNumSlider, maxNumSlider, initNum );
  gSliderNum.position( controllerOffset, btMode3.y + controllerMargin / 2 );
  gSliderNum.mouseReleased( setMode3 );

  const btMode4 = createButton( MODE_4 );
  btMode4.position( controllerOffset, gSliderNum.y + controllerMargin );
  btMode4.size( buttonWidth, buttonHeight );
  btMode4.mousePressed( setMode4 );

  const btMode5 = createButton( MODE_5 );
  btMode5.position( controllerOffset, btMode4.y + controllerMargin );
  btMode5.size( buttonWidth, buttonHeight );
  btMode5.mousePressed( setMode5 );

  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, btMode5.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

}

// Getter
const getSliderNumValue = () => { return gSliderNum.value(); }
