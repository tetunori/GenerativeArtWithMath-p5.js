
const gMaxGenerationNum = 250;
let gGeneration = 0;
let gStateArray = [ 1 ];
let gModulo = 2;

const WIDTH = 1000;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  console.log( 'modulo: ' + gModulo );
  background( 'white' );
  
}

function draw() {

  if( gGeneration < gMaxGenerationNum ){

    drawCell( gGeneration, gMaxGenerationNum, gStateArray, gModulo, WIDTH );
    updateState();
    
  }

}

function mouseClicked() {
  
  gGeneration = 0;
  gStateArray = [ 1 ];
  gModulo = getRandomInteger( 2, 20 );
  console.log( 'modulo: ' + gModulo );
  background( 'white' );

}

// Get random integer between min and max
const getRandomInteger = ( min, max ) => {
  return Math.floor( random( min, max ) );
}
