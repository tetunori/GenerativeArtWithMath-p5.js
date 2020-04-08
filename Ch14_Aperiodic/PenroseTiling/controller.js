
// Set up all controllers 
const setupController = () => {

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset + WIDTH, controllerOffset + 20 );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( captureImage );

  const btToggleDivision = createButton( 'TOGGLE DIVISION' );
  btToggleDivision.position( controllerOffset + WIDTH, btCaptureImage.y + controllerMargin );
  btToggleDivision.size( buttonWidth, buttonHeight );
  btToggleDivision.mousePressed( toggleDivision );

  const btToggleInit = createButton( 'TOGGLE INIT' );
  btToggleInit.position( controllerOffset + WIDTH, btToggleDivision.y + controllerMargin );
  btToggleInit.size( buttonWidth, buttonHeight );
  btToggleInit.mousePressed( toggleInit );

}

// Capture Image
const captureImage = () => {

  const namePNG = getYYYYMMDD_hhmmss( true ) + '.png';
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

