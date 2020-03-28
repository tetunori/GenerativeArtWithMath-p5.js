
const WIDTH = 300;
const HEIGHT = 300;

// For buttons
const WIDTH_EXT = 200;

let gImage;

const GON = 6;
const SCALAR = HEIGHT * 0.4;

const FILE_NAMES = [
  'F.svg',
  'yosegi1.svg',
  'yosegi2.svg'
];

let gReflectionParameter = 1; // 1 or -1
let gRotationParameter = 0;   // From 0 to (GON - 1)

function preload() {

  // Load initial image
  gImage = loadImage('F.svg');

}

function setup() {

  createCanvas( WIDTH + WIDTH_EXT, HEIGHT );
  setupController();
  
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

  gRotationParameter = ( gRotationParameter + gReflectionParameter + GON ) % GON;
  drawShape( SCALAR );
  console.log( 'Rotate' );
 
}

const resetImage = () => {

  gRotationParameter = 0;
  gReflectionParameter = 1;
  drawShape( SCALAR );
  console.log( 'Reset' );
 
}

let gImageIndex = 1;
const toggleImage = () => {
  
  gImage = loadImage( FILE_NAMES[ gImageIndex ], () => {
    resetImage();
  } );
  gImageIndex = ( gImageIndex + 1 ) % 3;

}
