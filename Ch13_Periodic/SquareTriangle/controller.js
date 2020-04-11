
const setFibonacci = () => {
  gSliderGap.value( ( Math.sqrt( 5 ) - 1 ) / 2 );
}

const randomizeGap = () => {
  gSliderGap.value( random( 0, 1 ) );
}

let gSliderGap;

// Set up all controllers 
const setupController = ( initGap ) => {

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

  const btSetFibonacci = createButton( 'SET FIBONACCI' );
  btSetFibonacci.position( controllerOffset, btCaptureImage.y + controllerMargin );
  btSetFibonacci.size( buttonWidth, buttonHeight );
  btSetFibonacci.mousePressed( setFibonacci );

  // Slider Settings
  const minGapSlider = 0;
  const maxGapSlider = 1;
  gSliderGap = createSlider( minGapSlider, maxGapSlider, initGap, 0.01 );
  gSliderGap.position( controllerOffset, btSetFibonacci.y + controllerMargin );

  const btChangeColor = createButton( 'CHANGE COLOR' );
  btChangeColor.position( controllerOffset, gSliderGap.y + controllerMargin );
  btChangeColor.size( buttonWidth, buttonHeight );
  btChangeColor.mousePressed( changeColor );

  const btRandomize = createButton( 'RANDOMIZE ALL' );
  btRandomize.position( controllerOffset, btChangeColor.y + controllerMargin );
  btRandomize.size( buttonWidth, buttonHeight );
  btRandomize.mousePressed( randomize );

  const btToggleMode = createButton( 'TOGGLE MODE' );
  btToggleMode.position( controllerOffset, btRandomize.y + controllerMargin );
  btToggleMode.size( buttonWidth, buttonHeight );
  btToggleMode.mousePressed( toggleMode );

}

// Getter
const getSliderGapValue = () => { return gSliderGap.value(); }

// Draw controller captions  
const drawControllerCaptions = () => {

  // Tentatively, disable stroke.
  noStroke();
  
  // Draw background
  fill( color( 'rgba( 0, 0, 0, 0.4 )' ) );
  const offset = 10;
  const width = 235;
  const height = 242;
  const cornerRound = 5;
  rect( offset, offset, width, height, cornerRound );

  // Draw captions
  fill( color( 'white' ) );
  text( 'Gap: ' + getSliderGapValue(), gSliderGap.x * 1.5 + gSliderGap.width, 117 );
  
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

// Get random color
const getRandomColor = () => {
  // return color( random( 100 ), 100, 100 );
  return color( random( 100 ), 80, 100 );
}

// Get random color Low Saturation
const getRandomColorLowSaturation = () => {
  return color( random( 100 ), 40, 100 );
}

