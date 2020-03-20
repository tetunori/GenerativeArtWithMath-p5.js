
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
let gSliderThreashold;

// Set up all controllers 
const setupController = ( initNum, initThreashold ) => {

  // Set font size for captions
  textSize( 15 );

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Slider Settings
  const minNumSlider = 1;
  const maxNumSlider = 20;
  gSliderNum = createSlider( minNumSlider, maxNumSlider, initNum );
  gSliderNum.position( controllerOffset, controllerOffset );

  const minThreasholdSlider = 0;
  const maxThreasholdSlider = 9;
  gSliderThreashold = createSlider( minThreasholdSlider, maxThreasholdSlider, initThreashold );
  gSliderThreashold.position( controllerOffset, gSliderNum.y + controllerMargin );

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, gSliderThreashold.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

}

// Getters
const getSliderNumValue = () => { return gSliderNum.value(); }
const getSliderThreasholdValue = () => { return gSliderThreashold.value(); }

// Draw controller captions  
const drawControllerCaptions = () => {

  // Tentatively, disable stroke.
  noStroke();
  
  // Draw background
  fill( color( 'rgba( 0, 0, 0, 0.3 )' ) );
  const offset = 10;
  const width = 265;
  const height = 130;
  const cornerRound = 5;
  rect( offset, offset, width, height, cornerRound );

  // Draw captions
  fill( color( 'white' ) );
  text( 'Num: ' + getSliderNumValue(), gSliderNum.x * 1.5 + gSliderNum.width, 37 );
  text( 'Threashold: ' + getSliderThreasholdValue(), gSliderThreashold.x * 1.5 + gSliderThreashold.width, 77 );
  
  // Revert stroke
  stroke( color( 'black' ) );

}
