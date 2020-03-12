
const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  noLoop();
  
}


const numA = 10;
const numB =  6;
const RATIO = numB / numA;

function draw() {

  let squareWidth = WIDTH * RATIO;
  let xPos = 0;
  let yPos = 0;
  let itr = 0;

  colorMode( HSB, 100 );

  while( squareWidth > 0.1 ){

    itr++;
    if( !isEven( itr ) ){

      while( xPos + squareWidth < WIDTH + 0.1 ){
        
        divSquare( xPos, yPos, squareWidth );
        xPos += squareWidth;

      }
      squareWidth = WIDTH - xPos;

    }else{

      while ( yPos + squareWidth < WIDTH * RATIO + 0.1 ){

        divSquare( xPos, yPos, squareWidth );
        yPos += squareWidth;
        
      }
      squareWidth = WIDTH * RATIO - yPos;

    }

  }

}

// Divide a square whose length is width at ( xPosition, yPosition ) with some rectangles whose ratio is numA:numB.
const divSquare = ( xPosition, yPosition, width ) => {

  let squareWidth = width;
  let xPos = xPosition;
  let yPos = yPosition;
  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth + yPos;
  let itr = 0;

  while( squareWidth > 0.1 ){

    itr++;
    if( !isEven( itr ) ){

      while( xPos + squareWidth * RATIO < xEndPos + 0.1 ){
        
        const col = color( random( 100 ), 100, 100 );
        fill( col );
        rect( xPos, yPos, squareWidth * RATIO, squareWidth );
        xPos += squareWidth * RATIO;

      }
      squareWidth = xEndPos - xPos;

    }else{

      while ( yPos + squareWidth / RATIO < yEndPos + 0.1 ){

        const col = color( random( 100 ), 100, 100 );
        fill( col );
        rect( xPos, yPos, squareWidth, squareWidth / RATIO );
        yPos += squareWidth / RATIO;
        
      }
      squareWidth = yEndPos - yPos;

    }

  }

}

// The number is even or not.
const isEven = ( number ) => {
  return ( number % 2 === 0 );
}

