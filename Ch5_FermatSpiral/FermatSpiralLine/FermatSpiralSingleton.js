
let gIteration =  0;
let gNum = 10;
let gRotationAngle = 1.0 / gNum ;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gNum );
  background( 'white' );
  push();
    translate( WIDTH / 2, HEIGHT / 2 );

    stroke( 'blue' );
    drawLine( gNum, WIDTH );

    stroke( 'red' );
    //drawRealCurve( gRotationAngle, WIDTH );
  pop();

}

function draw() {
  
  // translate( WIDTH / 2, HEIGHT / 2 );
  // noStroke();
  // drawFermatSpiral( gIteration, gRotationAngle );
  // gIteration++;

  // if( isEnableCaptureImage() ){

  //   disableCaptureImage();
  //   let namePNG;
  //   if( gMode === MODE_3 ){
  //     namePNG = '1_' + gNum;
  //   }else{
  //     namePNG = gMode;
  //   }
  //   namePNG += '_' + getYYYYMMDD_hhmmss( true ) + '.png';
  //   captureImage( namePNG );

  // }

}

const scalar = 30;

const drawFermatSpiral = ( iteration, angleRotation ) => {

  const theta = 2 * Math.PI * angleRotation * iteration;
  const vector = p5.Vector.fromAngle( theta );
  vector.mult( scalar * Math.sqrt( iteration ) );
  fill( 0 );
  ellipse( vector.x, vector.y, 10, 10 );

}

const drawLine = ( num, width ) => {

  for( let index = 0; index <= num / 2; index++ ){

    const vector = p5.Vector.fromAngle( 2 * index * Math.PI / num );
    vector.mult( width / Math.sqrt( 2 ) );
    line( vector.x, vector.y, -vector.x, -vector.y );

  }

}

const drawRealCurve = ( angleRotation, width ) => {

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

const MODE_1 = '17 / 55';
const MODE_2 = 'Math.sqrt(5)';
const MODE_3 = '1 / N';
const MODE_4 = '( 1 + Math.sqrt(5) ) / 2';
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
  }else{
    gRotationAngle = ( 1 + Math.sqrt(5) ) / 2;
  }

  background( 'white' );
  gIteration =  0;

}

const setMode1 = () => { setSpiralMode( MODE_1 ); }
const setMode2 = () => { setSpiralMode( MODE_2 ); }
const setMode3 = () => { setSpiralMode( MODE_3 ); }
const setMode4 = () => { setSpiralMode( MODE_4 ); }

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

  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, btMode4.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

}

// Getter
const getSliderNumValue = () => { return gSliderNum.value(); }
