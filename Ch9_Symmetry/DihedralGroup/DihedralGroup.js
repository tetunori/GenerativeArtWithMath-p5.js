
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
