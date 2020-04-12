
const WIDTH  = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  noLoop();

}

const RATIO = Math.sqrt( 2 );
function draw() { divRect( 0, 0, WIDTH, RATIO ); }

const divRect = ( xPos, yPos, squareWidth, ratio ) => {

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth / ratio + yPos;
  let itr = 0;

  while( squareWidth > 0.1 ){

    itr++;
    fill( getRandomColor() );

    if( isEven( itr ) ){

      while( xPos + squareWidth < xEndPos + 0.1 ){

        rect( xPos, yPos, squareWidth, squareWidth );
        xPos += squareWidth;

      }
      squareWidth = xEndPos - xPos;

    }else{

      while ( yPos + squareWidth < yEndPos + 0.1 ){

        rect( xPos, yPos, squareWidth, squareWidth );
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

// The number is odd or not.
const isOdd = ( number ) => {
  return ( number % 2 === 1 );
}

// Get random color
const getRandomColor = () => {
  // return color( random( 100 ), 100, 100 );
  return color( random( 100 ), 40, 100 );
}

