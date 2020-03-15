
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

let gIsMondrian = false;

// Is Mondrian function is ready or not
const isEnableMondrian = () => {
  return ( gIsMondrian === true );
}

// Enable Mondrian function
const enableMondrian = () => {
  gIsMondrian = true;
}

// Disable Mondrian function
const disableMondrian = () => {
  gIsMondrian = false;
}

// Toggle Mondrian function
const toggleMondrian = () => {
  if( isEnableMondrian() ){
    disableMondrian();
  }else{
    enableMondrian();
  }
}

let gSliderThrDivsion;
let gSliderThrProbability;

// Set up all controllers 
const setupController = ( initThrDivision, initThrProbability ) => {

  // Set font size for captions
  textSize( 15 );

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Slider Settings
  const minThrDivSlider = 10;
  const maxThrDivSlider = 300;
  gSliderThrDivsion = createSlider( minThrDivSlider, maxThrDivSlider, initThrDivision );
  gSliderThrDivsion.position( controllerOffset, controllerOffset );

  const minThrPrbSlider = 0;
  const maxThrPrbSlider = 1;
  gSliderThrProbability = createSlider( minThrPrbSlider, maxThrPrbSlider, initThrProbability, 0.01 );
  gSliderThrProbability.position( controllerOffset, gSliderThrDivsion.y + controllerMargin );

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btChangeColor = createButton( 'CHANGE COLOR' );
  btChangeColor.position( controllerOffset, gSliderThrProbability.y + controllerMargin );
  btChangeColor.size( buttonWidth, buttonHeight );
  btChangeColor.mousePressed( changeColor );

  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, btChangeColor.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

  const btToggleMondrian = createButton( 'TOGGLE MONDRIAN' );
  btToggleMondrian.position( controllerOffset, btCaptureImage.y + controllerMargin );
  btToggleMondrian.size( buttonWidth, buttonHeight );
  btToggleMondrian.mousePressed( toggleMondrian );

}

// Getters
const getSliderThreasholdDivisionValue = () => { return gSliderThrDivsion.value(); }
const getSliderThreasholdProbabilityValue = () => { return gSliderThrProbability.value(); }

// Draw controller captions  
const drawControllerCaptions = () => {

  // Tentatively, disable stroke.
  noStroke();
  
  // Draw background
  fill( color( 'rgba( 0, 0, 0, 0.3 )' ) );
  const offset = 10;
  const width = 285;
  const height = 205;
  const cornerRound = 5;
  rect( offset, offset, width, height, cornerRound );

  // Draw captions
  fill( color( 'white' ) );
  text( 'Thr Div: ' + getSliderThreasholdDivisionValue(), gSliderThrDivsion.x * 1.5 + gSliderThrDivsion.width, 37 );
  text( 'Thr Prb: ' + getSliderThreasholdProbabilityValue(), gSliderThrProbability.x * 1.5 + gSliderThrProbability.width, 77 );
  
  // Revert stroke
  stroke( color( 'black' ) );

}
