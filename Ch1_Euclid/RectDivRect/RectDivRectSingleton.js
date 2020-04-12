
const numA = 10;
const numB =  6;
const RATIO = numB / numA;

const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH * RATIO );
  colorMode( HSB, 100 );
  noLoop();
  
}

function draw() {

  let squareWidth = WIDTH * RATIO;
  let xPos = 0;
  let yPos = 0;
  let itr = 0;

  while( squareWidth > 0.1 ){

    itr++;
    if( isOdd( itr ) ){

      while( xPos + squareWidth < WIDTH + 0.1 ){
        
        divSquare( xPos, yPos, squareWidth, RATIO );
        xPos += squareWidth;

      }
      squareWidth = WIDTH - xPos;

    }else{

      while ( yPos + squareWidth < WIDTH * RATIO + 0.1 ){

        divSquare( xPos, yPos, squareWidth, RATIO );
        yPos += squareWidth;
        
      }
      squareWidth = WIDTH * RATIO - yPos;

    }

  }

}

// Divide a square whose length is squareWidth at ( xPos, yPos ) with some rectangles whose sides have ratio.
const divSquare = ( xPos, yPos, squareWidth, ratio ) => {

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth + yPos;
  let itr = 0;

  while( squareWidth > 0.1 ){

    itr++;
    if( isOdd( itr ) ){

      const nextWidth = squareWidth * ratio;
      while( xPos + nextWidth < xEndPos + 0.1 ){
        
        fill( getRandomColor() );
        rect( xPos, yPos, nextWidth, squareWidth );
        xPos += nextWidth;

      }
      squareWidth = xEndPos - xPos;

    }else{

      const nextHeight = squareWidth / ratio;
      while ( yPos + nextHeight < yEndPos + 0.1 ){

        fill( getRandomColor() );
        rect( xPos, yPos, squareWidth, nextHeight );
        yPos += nextHeight;
        
      }
      squareWidth = yEndPos - yPos;

    }

  }

}

// The number is even or not.
const isEven = ( number ) => {
  return ( number % 2 === 0 );
}

// The number is odd or not.
const isOdd = ( number ) => {
  return ( number % 2 === 1 );
}

// Get random color
const getRandomColor = () => {
  // return color( random( 100 ), 100, 100 );
  return color( random( 100 ), 40, 100 );
}

