
let gSlidergGon;

// Set up all controllers 
const setupController = ( initgGon ) => {

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;

  const btToggleImage = createButton( 'TOGGLE IMAGE' );
  btToggleImage.position( controllerOffset + WIDTH, controllerOffset + 20 );
  btToggleImage.size( buttonWidth, buttonHeight );
  btToggleImage.mousePressed( toggleImage );

  const btRotate = createButton( 'ROTATE(r)' );
  btRotate.position( controllerOffset + WIDTH, btToggleImage.y + controllerMargin );
  btRotate.size( buttonWidth, buttonHeight );
  btRotate.mousePressed( rotateImage );

  const btReflect = createButton( 'REFLECT(s)' );
  btReflect.position( controllerOffset + WIDTH, btRotate.y + controllerMargin );
  btReflect.size( buttonWidth, buttonHeight );
  btReflect.mousePressed( reflectImage );

  const btReset = createButton( 'RESET(e)' );
  btReset.position( controllerOffset + WIDTH, btReflect.y + controllerMargin );
  btReset.size( buttonWidth, buttonHeight );
  btReset.mousePressed( resetImage );

  // Slider Settings
  const minNumSlider = 3;
  const maxNumSlider = 20;
  gSlidergGon = createSlider( minNumSlider, maxNumSlider, initgGon );
  gSlidergGon.position( controllerOffset + WIDTH, btReset.y + controllerMargin );
  gSlidergGon.mouseMoved( setGonNumberMouse );
  gSlidergGon.touchMoved( setGonNumber );

}

// Draw GON number 
const drawGonNumber = () => {

  const controllerOffset = 20;
  const controllerMargin = 40;
  
  // Text
  fill( color( 'black' ) );
  textSize( 14 );

  let description = 'Gon value: ' + gGon;
  description += '\n"TOGGLE IMAGE" \n is valid only if Gon=6.';
  
  text( description, 
          controllerOffset + WIDTH / 2, 
          gSlidergGon.y + controllerMargin - HEIGHT / 2 );
  
}

// Getter
const getSlidergGonValue = () => { return gSlidergGon.value(); }
