
// Set up all controllers 
const setupController = ( ) => {

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

  const btChangeParam = createButton( 'CHANGE PARAM' );
  btChangeParam.position( controllerOffset, btCaptureImage.y + controllerMargin );
  btChangeParam.size( buttonWidth, buttonHeight );
  btChangeParam.mousePressed( changeParam );

  const btToggleMode = createButton( 'TOGGLE MODE' );
  btToggleMode.position( controllerOffset, btChangeParam.y + controllerMargin );
  btToggleMode.size( buttonWidth, buttonHeight );
  btToggleMode.mousePressed( toggleMode );

}

// Draw controller captions  
const drawControllerCaptions = () => {

  // Tentatively, disable stroke.
  noStroke();
  
  // Draw background
  fill( color( 'rgba( 0, 0, 0, 0.4 )' ) );
  const offset = 10;
  const width = 170;
  const height = 122;
  const cornerRound = 5;
  rect( offset, offset, width, height, cornerRound );

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
