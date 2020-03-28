
const WIDTH = 300;
const HEIGHT = 300;

// For buttons
const WIDTH_EXT = 200;

let gImage;

let gGon = 6;
const SCALAR = HEIGHT * 0.4;

const FILE_NAMES = [
  'F.svg',
  'yosegi1.svg',
  'yosegi2.svg'
];

let gReflectionParameter = 1; // 1 or -1
let gRotationParameter = 0;   // From 0 to (gGon - 1)

function preload() {

  // Load initial image
  gImage = loadImage('F.svg');

}

function setup() {

  createCanvas( WIDTH + WIDTH_EXT, HEIGHT );
  setupController( gGon );
  
  drawShape( SCALAR );

  noLoop();

}

function draw() {}

function keyPressed() {

  if( key === 's'){
    reflectImage();
  }else if( key === 'r'){
    rotateImage();
  }else if( key === 'e'){
    resetImage();
  }

} 

const reflectImage = () => {

  gReflectionParameter *= -1;
  drawShape( SCALAR );
  console.log( 'Reflect' );
 
}

const rotateImage = () => {

  gRotationParameter = ( gRotationParameter + gReflectionParameter + gGon ) % gGon;
  drawShape( SCALAR );
  console.log( 'Rotate' );
 
}

const resetImage = () => {

  gRotationParameter = 0;
  gReflectionParameter = 1;
  drawShape( SCALAR );
  console.log( 'Reset' );
 
}

let gImageIndex = 0;
const toggleImage = () => {
  
  if( gGon === 6 ){

    gImageIndex = ( gImageIndex + 1 ) % 3;
    gImage = loadImage( FILE_NAMES[ gImageIndex ], () => {
      resetImage();
    } );

  }
  
}

const setGonNumber = () => {

  gGon = getSliderGonValue();
  if( gImageIndex !== 0 ){
    gImageIndex = 0;
    gImage = loadImage( FILE_NAMES[ gImageIndex ], () => {
      resetImage();
    } );
  }else{
    resetImage();
  }
  
  drawShape( SCALAR );
  
}

const setGonNumberMouse = () => {

  if ( !mouseIsPressed ){
    return;
  }

  setGonNumber();
  
}

// Draw Shapes including wireframe, number and image.
const drawShape = ( scalar ) => {

  background( 'silver' );
  push();

    translate( WIDTH / 2, HEIGHT / 2 );

    // Draw Image
    drawImage();
    
    // Draw Dihedral wireframe
    drawDihedral( scalar );

    // Draw numbers near the vertex
    drawNumbers( scalar );

    // Draw Gon Number
    drawGonNumber();
  pop();

}

// Draw Image
const drawImage = () => {

  push();

    // Center the rotation point
    imageMode( CENTER );

    // Consider reflection
    scale( 1, gReflectionParameter );

    // Consider rotation
    rotate( gRotationParameter * 2 * Math.PI / gGon );

    // Draw Image
    image( gImage, 0, 0 );

  pop();

}

// Draw Dihedral
const drawDihedral = ( scalar ) => {

  noFill();
  beginShape();

    for( let idVertex = 0; idVertex < gGon; idVertex++ ){

      const vector = p5.Vector.fromAngle( 2 * Math.PI * idVertex / gGon );
      vector.mult( scalar );
      vertex( vector.x, vector.y );

    }

  endShape( CLOSE );

}

// Draw Numbers
const drawNumbers = ( scalar ) => {

  fill( color( 'white' ) );
  textSize( 20 );

  for( let idVertex = 0; idVertex < gGon; idVertex++ ){

    // Calcurate position
    const indexNumber = ( gReflectionParameter * idVertex - gRotationParameter + 2 * gGon ) % gGon;
    const vector = p5.Vector.fromAngle( 2 * Math.PI * idVertex / gGon );
    vector.mult( scalar );
    
    // Draw text
    text( indexNumber, vector.x, vector.y );

  }

}

let gSliderGon;

// Set up all controllers 
const setupController = ( initGon ) => {

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
  gSliderGon = createSlider( minNumSlider, maxNumSlider, initGon );
  gSliderGon.position( controllerOffset + WIDTH, btReset.y + controllerMargin );
  gSliderGon.mouseMoved( setGonNumberMouse );
  gSliderGon.touchMoved( setGonNumber );

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
          gSliderGon.y + controllerMargin - HEIGHT / 2 );
  
}

// Getter
const getSliderGonValue = () => { return gSliderGon.value(); }
