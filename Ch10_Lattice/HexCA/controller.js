
let gSliderNum;
let gSliderModulo;

// Set up all controllers 
const setupController = ( initNum, initModulo ) => {

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
  const minNumSlider = 50;
  const maxNumSlider = 200;
  gSliderNum = createSlider( minNumSlider, maxNumSlider, initNum );
  gSliderNum.position( controllerOffset + WIDTH, btCaptureImage.y + controllerMargin );
  gSliderNum.mouseReleased( setNumber );
  gSliderNum.touchEnded( setNumber );

  const minModuloSlider = 2;
  const maxModuloSlider = 30;
  gSliderModulo = createSlider( minModuloSlider, maxModuloSlider, initModulo );
  gSliderModulo.position( controllerOffset + WIDTH, gSliderNum.y + controllerMargin * 2 );
  gSliderModulo.mouseReleased( setNumber );
  gSliderModulo.touchEnded( setNumber );

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

    const numDescription = 'num: ' + gNum;
    text( numDescription, 
            controllerOffset + WIDTH, 
            gSliderNum.y + controllerMargin );

    const moduloDescription = 'mod: ' + gModulo;
    text( moduloDescription, 
            controllerOffset + WIDTH, 
            gSliderModulo.y + controllerMargin );
  pop();
  
}

// Getter
const getSliderNumValue = () => { return gSliderNum.value(); }
const getSliderModuloValue = () => { return gSliderModulo.value(); }

// Capture Image
const captureImage = () => {

  const namePNG = 'num' + gNum + '_' + 'mod' + gModulo + '_' + 
                    getYYYYMMDD_hhmmss( true ) + '.png';
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
