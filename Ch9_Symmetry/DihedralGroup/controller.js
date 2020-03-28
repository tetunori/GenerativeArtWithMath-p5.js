
// Set up all controllers 
const setupController = () => {

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

}
