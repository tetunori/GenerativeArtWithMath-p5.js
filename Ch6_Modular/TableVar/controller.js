
const toggleMode = () => { gIsAddition = !gIsAddition; }

const toggleVisualMode = () => {
  
  gModeVisual++;
  if( gModeVisual > VISUAL_MODE_COLORED_SCALE ){
    gModeVisual = VISUAL_MODE_COLORED;
  }

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

let gSliderModulo;

// Set up all controllers 
const setupController = ( initModulo ) => {

  // Set font size for captions
  textSize( 15 );

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Slider Settings
  const minNumSlider = 1;
  const maxNumSlider = 30;
  gSliderModulo = createSlider( minNumSlider, maxNumSlider, initModulo );
  gSliderModulo.position( controllerOffset, controllerOffset );

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btToggleMode = createButton( 'TOGGLE CALC' );
  btToggleMode.position( controllerOffset, gSliderModulo.y + controllerMargin );
  btToggleMode.size( buttonWidth, buttonHeight );
  btToggleMode.mousePressed( toggleMode );

  const btToggleVisualMode = createButton( 'TOGGLE VISUAL' );
  btToggleVisualMode.position( controllerOffset, btToggleMode.y + controllerMargin );
  btToggleVisualMode.size( buttonWidth, buttonHeight );
  btToggleVisualMode.mousePressed( toggleVisualMode );

  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, btToggleVisualMode.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

}

// Getters
const getSliderModuloValue = () => { return gSliderModulo.value(); }

// Draw controller captions  
const drawControllerCaptions = () => {

  // Tentatively, disable stroke.
  noStroke();
  
  // Draw background
  fill( color( 'rgba( 0, 0, 0, 0.4 )' ) );
  const offset = 10;
  const width = 290;
  const height = 170;
  const cornerRound = 5;
  rect( offset, offset, width, height, cornerRound );

  // Draw captions
  textSize( 20 );
  fill( color( 'white' ) );

  const captionXPos = gSliderModulo.x * 1.5 + gSliderModulo.width + 20;
  text( 'Modulo: ' + getSliderModuloValue(), captionXPos, 40 );

  // Calc mode text
  if( gIsAddition ){
    text( 'Add', captionXPos, 76 );
  }else{
    text( 'Mult', captionXPos, 76 );
  }

  // Visualize mode text
  if( gModeVisual === VISUAL_MODE_COLORED ){
    text( 'Colored', captionXPos, 116 );
  }else if( gModeVisual === VISUAL_MODE_SCALE ){
    text( 'Scale', captionXPos, 116 );
  }else if( gModeVisual === VISUAL_MODE_COLORED_SCALE ){
    text( 'Both', captionXPos, 116 );
  }
  
  // Revert stroke
  stroke( color( 'black' ) );

}
