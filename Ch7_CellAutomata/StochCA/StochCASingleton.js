
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

// Transit to next generation values
const transition = ( numA, numB, numC, modulo ) => {

  let retValue = 0;

  if( random( 1 ) < 0.999 ){
    retValue = ( numA + numB + numC ) % modulo;
  }else{
    retValue = ( numA + numC ) % modulo;
  }
  return retValue;

}

// Update array
const updateState = () => {

  const arrayBoundaryValue = [ 0, 0 ];
  const array = gStateArray;
  const nextStateArray = new Array( array.length + 2 );

  for( let element of arrayBoundaryValue ){
    array.splice( 0, 0, element );
  }

  for( let element of arrayBoundaryValue ){
    array.splice( array.length, 0, element );
  }
  
  for( let index = 1; index < array.length - 1; index++ ){
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    nextStateArray[ prevIndex ] = 
      transition( array[ prevIndex ], array[ index ], array[ nextIndex ], gModulo );
  }

  gStateArray = nextStateArray;
  gGeneration++;

}

// Draw cells on canvas
const drawCell = ( generation, num, array, modulo, width ) => {

  const scalar = width * 0.5 / num;
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
