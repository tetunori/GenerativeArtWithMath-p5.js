
const gMaxGenerationNum = 250;
let gGeneration = 0;
let gStateArray = [ 1 ];
let gModulo = 2;

const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
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

// Transit to next generation values
const transition = ( index, array, modulo ) => {
  return ( array[ index + 1 ] + array[ index ] ) % modulo;
}

// Update array
const updateState = () => {

  const BOUNDARY_VALUE = 0;
  const array = gStateArray;
  const nextStateArray = new Array( array.length + 1 );

  array.splice( 0, 0, BOUNDARY_VALUE );
  array.splice( array.length, 0, BOUNDARY_VALUE );

  for( let index = 0; index < array.length - 1; index++ ){
    nextStateArray[ index ] = transition( index, array, gModulo );
  }

  gStateArray = nextStateArray;
  gGeneration++;

}

// Draw cells on canvas
const drawCell = ( generation, num, array, modulo, width ) => {

  const scalar = width / num;
  let xPos = ( width - array.length * scalar ) * 0.5;
  const yPos = generation * scalar;

  noStroke();
  
  for( const element of array ){

    const colorParam = element * 100 / modulo;
    fill( colorParam, colorParam, 100 );
    rect( xPos, yPos, scalar, scalar );
    xPos += scalar;

  }

}

// Get random integer between min and max
const getRandomInteger = ( min, max ) => {
  return Math.floor( random( min, max ) );
}

