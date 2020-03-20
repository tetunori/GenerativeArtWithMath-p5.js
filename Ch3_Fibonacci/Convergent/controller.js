
let gSlider;

// Set up all controllers 
const setupController = ( initNum ) => {

  noStroke();

  // Set font size for captions
  textSize( 15 );

  // Slider Settings
  const minNumSlider = 1;
  const maxNumSlider = 10;
  const controllerOffset = 20;
  gSlider = createSlider( minNumSlider, maxNumSlider, initNum );
  gSlider.position( controllerOffset, controllerOffset + HEIGHT );

}

// Getters
const getSliderNumAValue = () => { return gSlider.value(); }

// Draw controller captions  
const drawControllerCaptions = () => {
  
  // Draw captions
  noStroke();
  fill( color( 'black' ) );
  text( 'm = ' + getSliderNumAValue(), gSlider.x * 1.5 + gSlider.width, 37 + HEIGHT );

}

