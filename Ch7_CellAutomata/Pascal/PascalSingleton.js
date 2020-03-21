
const gMaxGenerationNum = 8;
let gGeneration = 0;
let gStateArray = [ 1 ];

const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  
}

function draw() {

  if( gGeneration < gMaxGenerationNum ){

    drawNumber( gGeneration, gMaxGenerationNum, gStateArray, WIDTH );
    updateState();
    
  }

}

// Transit to next generation values
const transition = ( index, array ) => {
  return array[ index + 1 ] + array[ index ];
}

// Update array
const updateState = () => {

  const BOUNDARY_VALUE = 0;
  const array = gStateArray;
  const nextStateArray = new Array( array.length + 1 );

  array.splice( 0, 0, BOUNDARY_VALUE );
  array.splice( array.length, 0, BOUNDARY_VALUE );

  for( let index = 0; index < array.length - 1; index++ ){
    nextStateArray[ index ] = transition( index, array );
  }

  gStateArray = nextStateArray;
  gGeneration++;

}

// Draw Number on canvas
const drawNumber = ( generation, num, array, width ) => {

  const scalar = width / num;
  let xPos = ( width - array.length * scalar ) * 0.5;
  const yPos = generation * scalar;

  fill( 'black' );
  textSize( scalar * 0.5 );
  
  for( const element of array ){

    text( element, xPos + scalar * 0.5, yPos + scalar * 0.5 );
    xPos += scalar;

  }

}
