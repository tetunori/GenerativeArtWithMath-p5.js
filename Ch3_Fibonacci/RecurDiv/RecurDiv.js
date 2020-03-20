
let gNum = 10;
let gThreashold = 1;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  background( 'white' );

  // Set values for division.js
  setDivisionValues( WIDTH, gNum, gThreashold );

  generateFibonacci( gNum );
  noLoop();

}

function draw() {

  // Initial drawing
  initialDivSquare(); 
  
}

function mouseClicked() {
  
  gNum = getRandomInteger( 2, 10 );
  gThreashold = getRandomInteger( 0, 9 );
  console.log( "Num: ", gNum, ", Threashold: ", gThreashold );

  // Set values for division.js
  setDivisionValues( WIDTH, gNum, gThreashold );

  generateFibonacci( gNum );  

  // Draw
  background( 'white' );
  initialDivSquare(); 

}

// Get random integer between min and max
const getRandomInteger = ( min, max ) => {
  return Math.floor( random( min, max ) );
}

