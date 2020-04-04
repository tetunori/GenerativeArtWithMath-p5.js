
let gSliderNum;

// Set up all controllers 
const setupController = ( initNum ) => {

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset + WIDTH, controllerOffset + 20 );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( captureImage );

  // Slider Settings
  const minNumSlider = 3;
  const maxNumSlider = 20;
  gSliderNum = createSlider( minNumSlider, maxNumSlider, initNum );
  gSliderNum.position( controllerOffset + WIDTH, btCaptureImage.y + controllerMargin );
  gSliderNum.mouseReleased( setNumber );
  gSliderNum.touchEnded( setNumber );

}

// Draw Number 
const drawNumber = () => {

  const controllerOffset = 20;
  const controllerMargin = 40;
  
  // Text
  push();
    noStroke();
    fill( color( 'black' ) );
    textSize( 14 );

    const description = 'num: ' + gNum;
    text( description, 
            controllerOffset + WIDTH, 
            gSliderNum.y + controllerMargin );
  pop();
  
}

// Getter
const getSliderNumValue = () => { return gSliderNum.value(); }

// Capture Image
const captureImage = () => {

  const namePNG = 'num' + gNum + '_' + getYYYYMMDD_hhmmss( true ) + '.png';
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
