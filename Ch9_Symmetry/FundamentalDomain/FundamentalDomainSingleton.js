
const WIDTH = 300;
const HEIGHT = 300;

// For button
const WIDTH_EXT = 200;

let gImage;

const GON = 6;

const FILE_NAMES = [
  'yosegiC6Part.svg',
  'yosegiD6Part.svg',
  'HelloWorld.svg',
  'HelloWorld.svg'
];

function preload() {

  // Load initial image
  gImage = loadImage( 'yosegiC6Part.svg' );

}

function setup() {

  createCanvas( WIDTH + WIDTH_EXT, HEIGHT );
  setupController();
  
  drawShape();

  noLoop();

}

function draw() {}

let gImageIndex = 0;
const toggleImage = () => {
  
  gImageIndex = ( gImageIndex + 1 ) % FILE_NAMES.length;
  gImage = loadImage( FILE_NAMES[ gImageIndex ], () => {
    drawShape();
  } );
  
}

// Draw Shapes including wireframe, number and image.
const drawShape = () => {

  background( 'silver' );
  push();

    translate( WIDTH / 2, HEIGHT / 2 );

    for( let idReflection = 0; idReflection < 2; idReflection++ ){

      for( let idRotation = 0; idRotation < GON; idRotation++ ){

        push();

          // imageMode center for only HelloWorld.svg
          if( gImageIndex > 1 ){
            imageMode( CENTER );
          }

          // Consider reflection for only D6 case
          if( ( gImageIndex === 1 ) || ( gImageIndex === 3 ) ){
            scale( 1, pow( -1, idReflection )  );
          }

          // Consider rotation
          rotate( idRotation * 2 * Math.PI / GON );

          // Draw Image
          image( gImage, 0, 0 );

        pop();

      }

    }

  pop();

}

// Set up all controllers 
const setupController = () => {

  const controllerOffset = 20;

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;

  const btToggleImage = createButton( 'TOGGLE IMAGE' );
  btToggleImage.position( controllerOffset + WIDTH, controllerOffset + 20 );
  btToggleImage.size( buttonWidth, buttonHeight );
  btToggleImage.mousePressed( toggleImage );

}
