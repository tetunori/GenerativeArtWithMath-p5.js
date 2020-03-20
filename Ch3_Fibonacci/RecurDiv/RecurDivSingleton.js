
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

let gArrayFibonacci = undefined;
const generateFibonacci = ( maxIndex ) => {

  const array = [ 0, 1 ];

  for( let index = 1; index < maxIndex; index++ ){
    array.push( array[ index - 1 ] + array[ index ] )
  }

  gArrayFibonacci = array.reverse();
  // console.log( gArrayFibonacci );

}

// Initial divSquare
const initialDivSquare = () =>{

  const xPos = 0;
  const yPos = 0;
  const index = 0;
  const iteration = 0;
  const signX = 1;
  const signY = 1;

  divSquare( xPos, yPos, index, iteration, signX, signY ); 

}

let gDivisionCanvasWidth = 0;
let gDivisionNum = 0;
let gDivisionThreashold = 0;
const setDivisionValues = ( width, num, threashold ) => {

  gDivisionCanvasWidth = width;
  gDivisionNum = num;
  gDivisionThreashold = threashold;

} 

// Return appropriate sign value against index
const getSign = ( index ) => {

  const signArray = [ 1, 1, -1, -1 ];
  return signArray[ index % 4 ];

} 

// Draw colored rect. index is used for setting color
const drawColorRect = ( xPos, yPos, width, height, index ) => {

  const scalar = gDivisionCanvasWidth / gArrayFibonacci[ 0 ];

  // Change the colors in order
  fill( ( 100 * index / gDivisionNum ) % 100, 100, 100 );

  rect( scalar * xPos, scalar * yPos, 
          scalar * width, scalar * height );
  
}

// Divide a rectangle with squares
const divRect = ( xPos, yPos, index, iteration, signX, signY ) => {

  for( let i = 0; i < gDivisionNum - index; i++ ){

    // Draw a square
    const length = gArrayFibonacci[ i + index ];
    const newSignX = signX * getSign( i + 1 );
    const newSignY = signY * getSign( i );
    drawColorRect( xPos, yPos, 
                    newSignX * length, newSignY * length, 
                      i + index );

    // Move position
    xPos += newSignX * length;
    yPos += newSignY * length;
    if( iteration < gDivisionThreashold ){
      divSquare( xPos, yPos, i + index, iteration + 1, -newSignX, -newSignY );
    }

  }

}

// Divide a square with rectangles
const divSquare = ( xPos, yPos, index, iteration, signX, signY ) => {

  for( let i = 0; i < gDivisionNum - index; i++ ){ 

    // Draw a rectangle
    const lengthShort = gArrayFibonacci[ i + index + 1 ];
    const lengthLong = gArrayFibonacci[ i + index ];
    const newSignX = signX * getSign( i );
    const newSignY = signY * getSign( i + 1 );
    drawColorRect( xPos, yPos, 
                    newSignX * lengthShort, newSignY * lengthLong, 
                      i + index + 1 );

    // Move position
    xPos += newSignX * lengthShort;
    yPos += newSignY * lengthLong;
    if( iteration < gDivisionThreashold ){
      divRect( xPos, yPos, i + index + 1, iteration + 1, -newSignX, -newSignY );
    }

  }

}

