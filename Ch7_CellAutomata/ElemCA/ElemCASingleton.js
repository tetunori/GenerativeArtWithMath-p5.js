
const gMaxGenerationNum = 250;
let gGeneration = 0;
let gStateArray = [ 1 ];
const gModulo = 2;

const WIDTH = 1000;
const HEIGHT = 500;

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  console.log( 'modulo: ' + gModulo );
  console.log( 'Rule: 30' );
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
  reloadRule();
  background( 'white' );

}


let gArrayRule = [ 0, 0, 0, 1, 1, 1, 1, 0 ]; // Rule  30
// let gArrayRule = [ 0, 1, 1, 0, 1, 1, 1, 0 ]; // Rule 110

const reloadRule = () => {

  const newRule = new Array(8);
  let ruleInteger = 0;

  for( let index = 0; index < 8; index++ ){

    newRule[ index ] = getRandomInteger( 0, 2 );
    ruleInteger += newRule[ index ] * Math.pow( 2, 7 - index );

  }
  gArrayRule = newRule;
  console.log( 'Rule: ' + ruleInteger );

}

// Transit to next generation values
const transition = ( numA, numB, numC, arrayRule ) => {

  const ruleInteger = numA * Math.pow( 2, 2 ) + 
                        numB * Math.pow( 2, 1 ) + 
                          numC * Math.pow( 2, 0 );

  return arrayRule[ 7 - ruleInteger ];

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
      transition( array[ prevIndex ], array[ index ], array[ nextIndex ], gArrayRule );
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

    fill( 0, 0, 100 * ( 1 - element ) );
    rect( xPos, yPos, scalar, scalar );
    xPos += scalar;

  }

}

// Get random integer between min and max
const getRandomInteger = ( min, max ) => {
  return Math.floor( random( min, max ) );
}
