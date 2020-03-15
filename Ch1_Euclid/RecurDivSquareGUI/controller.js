
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

let gSliderNumA;
let gSliderNumB;
let gSliderThreashold;

// Set up all controllers 
const setupController = ( initNumA, initNumB, initThr ) => {

  // Set font size for captions
  textSize( 15 );

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Slider Settings
  const minNumSlider = 1;
  const maxNumSlider = 40;
  gSliderNumA = createSlider( minNumSlider, maxNumSlider, initNumA );
  gSliderNumA.position( controllerOffset, controllerOffset );

  gSliderNumB = createSlider( minNumSlider, maxNumSlider, initNumB );
  gSliderNumB.position( controllerOffset, gSliderNumA.y + controllerMargin );

  const minThrSlider = 10;
  const maxThrSlider = 300;
  gSliderThreashold = createSlider( minThrSlider, maxThrSlider, initThr );
  gSliderThreashold.position( controllerOffset, gSliderNumB.y + controllerMargin );

  // Button Settings
  const buttonWidth = 130;
  const buttonHeight = 20;
  const btChangeColor = createButton( 'CHANGE COLOR' );
  btChangeColor.position( controllerOffset, gSliderThreashold.y + controllerMargin );
  btChangeColor.size( buttonWidth, buttonHeight );
  btChangeColor.mousePressed( changeColor );

  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, btChangeColor.y + controllerMargin );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

}

// Getters
const getSliderNumAValue = () => { return gSliderNumA.value(); }
const getSliderNumBValue = () => { return gSliderNumB.value(); }
const getSliderThreasholdValue = () => { return gSliderThreashold.value(); }

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
  text( 'Num A: ' + getSliderNumAValue(), gSliderNumA.x * 1.5 + gSliderNumA.width, 37 );
  text( 'Num B: ' + getSliderNumBValue(), gSliderNumB.x * 1.5 + gSliderNumB.width, 77 );
  text( 'Threashold: ' + getSliderThreasholdValue(), gSliderThreashold.x * 1.5 + gSliderThreashold.width, 117 );
  
  // Revert stroke
  stroke( color( 'black' ) );

}
