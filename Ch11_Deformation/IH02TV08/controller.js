
let gSliderHorizontal;
let gSliderVertical;

// Set up all controllers 
const setupController = ( initHorizontal, initVertical ) => {

  // Set font size for captions
  textSize( 15 );

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, controllerOffset );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

  // Slider Settings
  const minHorizontalSlider = -1;
  const maxHorizontalSlider = ( Math.sqrt( 3 ) - 1 ) / 2;
  gSliderHorizontal = createSlider( minHorizontalSlider, maxHorizontalSlider, initHorizontal, 0.01 );
  gSliderHorizontal.position( controllerOffset, btCaptureImage.y + controllerMargin );

  const minVerticalSlider = 0;
  const maxVerticalSlider = 1;
  gSliderVertical = createSlider( minVerticalSlider, maxVerticalSlider, initVertical, 0.01 );
  gSliderVertical.position( controllerOffset, gSliderHorizontal.y + controllerMargin );

  const btRandomize = createButton( 'RANDOMIZE' );
  btRandomize.position( controllerOffset, gSliderVertical.y + controllerMargin );
  btRandomize.size( buttonWidth, buttonHeight );
  btRandomize.mousePressed( randomize );

}

// Getter
const getSliderHorValue = () => { return gSliderHorizontal.value(); }
const getSliderVerValue = () => { return gSliderVertical.value(); }

// Draw controller captions  
const drawControllerCaptions = () => {

  // Tentatively, disable stroke.
  noStroke();
  
  // Draw background
  fill( color( 'rgba( 0, 0, 0, 0.4 )' ) );
  const offset = 10;
  const width = 285;
  const height = 160;
  const cornerRound = 5;
  rect( offset, offset, width, height, cornerRound );

  // Draw captions
  fill( color( 'white' ) );
  text( 'Horizontal: ' + getSliderHorValue(), gSliderHorizontal.x * 1.5 + gSliderHorizontal.width, 77 );
  text( 'Vertical: ' + getSliderVerValue(), gSliderVertical.x * 1.5 + gSliderVertical.width, 117 );
  
  // Revert stroke
  stroke( color( 'black' ) );

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
