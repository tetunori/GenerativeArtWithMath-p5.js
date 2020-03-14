const CANVAS_WIDTH = 1000; 

const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  noLoop();
  
}

let threashold = 160;
let numA = 10;
let numB =  6;
let ratio = numB / numA;

function draw() {

  divSquare( 0, 0, WIDTH );
  
}

function mouseClicked() {
  
  numA = Math.floor( random( 1, 20 ) );
  numB = Math.floor( random( 1, 20 ) );
  while ( numA === numB ){
    numB = Math.floor( random( 1, 20 ) );
  }

  threashold = Math.floor( random( 10, 300 ) );
  console.log( 'numA = ' + numA + ', numB = ' + numB + ', threashold = ' + threashold ); 
  ratio = numB / numA;
  background( 0, 0, 100 );
  divSquare( 0, 0, WIDTH );

}


// Divide a square whose length is width at ( xPosition, yPosition ) with some rectangles whose ratio is numA:numB.
const divSquare = ( xPosition, yPosition, wd ) => {

  let squareWidth = normalizeNumber( wd );
  let xPos = normalizeNumber( xPosition );
  let yPos = normalizeNumber( yPosition );

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth + yPos;
  let itr = 0;

  const col = color( random( 100 ), 100, 100 );
  fill( col );
  rect( xPos, yPos, squareWidth, squareWidth );
  
  while( squareWidth > threashold + 0.1 ){

    itr++;
    if( !isEven( itr ) ){

      while( xPos + squareWidth * ratio < xEndPos + 0.1 ){
        
        divRect( xPos, yPos, squareWidth * ratio );
        xPos += squareWidth * ratio;

      }
      squareWidth = xEndPos - xPos;

    }else{

      while ( yPos + squareWidth / ratio < yEndPos + 0.1 ){

        divRect( xPos, yPos, squareWidth );
        yPos += squareWidth / ratio;
        
      }
      squareWidth = yEndPos - yPos;

    }

  }

}

// Divide a rectangle whose width is 'width' at ( xPosition, yPosition ) with some squares.
const divRect = ( xPosition, yPosition, wd ) => {
  let squareWidth = normalizeNumber( wd );
  let xPos = normalizeNumber( xPosition );
  let yPos = normalizeNumber( yPosition );

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth / ratio + yPos;
  let itr = 0;

  const col = color( random( 100 ), 100, 100 );
  fill( col );
  rect( xPos, yPos, squareWidth, squareWidth / ratio );

  while( squareWidth > threashold + 0.1 ){

    itr++;
    if( isEven( itr ) ){

      while( xPos + squareWidth < xEndPos + 0.1 ){

        divSquare( xPos, yPos, squareWidth );
        xPos += squareWidth;

      }
      squareWidth = xEndPos - xPos;

    }else{

      while ( yPos + squareWidth < yEndPos + 0.1 ){

        divSquare( xPos, yPos, squareWidth );
        yPos += squareWidth;
        
      }
      squareWidth = yEndPos - yPos;

    }

  }

}

// The number is even or not.
const isEven = ( number ) => {
  return ( number % 2 === 0 );
}

const normalizeNumber = ( num ) => {

  const ROUND_OFF_THREASHOLD = 0.001

  const numRounded = Math.round( num )
  if( Math.abs( num - numRounded ) < ROUND_OFF_THREASHOLD ){
    return numRounded;
  }else{
    return num;
  }

}
