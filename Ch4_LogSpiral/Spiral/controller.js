
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
