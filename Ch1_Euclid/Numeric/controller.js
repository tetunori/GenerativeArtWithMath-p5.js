
let gSliderNumA;
let gSliderNumB;

const controllerOffset = 20;
const controllerMargin = 40;

// Set up all controllers 
const setupController = ( initNumA, initNumB ) => {

  noStroke();

  // Set font size for captions
  textSize( 15 );

  // Slider Settings
  const minNumSlider = 1;
  const maxNumSlider = 100;
  gSliderNumA = createSlider( minNumSlider, maxNumSlider, initNumA );
  gSliderNumA.position( controllerOffset, controllerOffset );

  gSliderNumB = createSlider( minNumSlider, maxNumSlider, initNumB );
  gSliderNumB.position( controllerOffset, gSliderNumA.y + controllerMargin );

}

// Getters
const getSliderNumAValue = () => { return gSliderNumA.value(); }
const getSliderNumBValue = () => { return gSliderNumB.value(); }

// Draw controller captions  
const drawControllerCaptions = () => {
  
  // Draw captions
  fill( color( 'black' ) );
  text( 'Num A: ' + getSliderNumAValue(), gSliderNumA.x * 1.5 + gSliderNumA.width, 37 );
  text( 'Num B: ' + getSliderNumBValue(), gSliderNumB.x * 1.5 + gSliderNumB.width, 77 );

}

const showText = ( _text ) => {

  // console.log( _text );
  const xPos = controllerOffset;
  const yPos = ( controllerOffset + controllerMargin ) * 2; 
  text( _text, xPos, yPos );

}
