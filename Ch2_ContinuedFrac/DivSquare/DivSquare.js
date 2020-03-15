
const RATIO = ( Math.sqrt( 5 ) + 1 ) / 2;

const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  noLoop();
  
}

function draw() {

  let squareWidth = WIDTH;
  let xPos = 0;
  let yPos = 0;
  let itr = 0;

  while( squareWidth > 0.1 ){

    itr++;
    if( isOdd( itr ) ){

      // If iteration number is odd, add square in x-axis direction.
      const nextWidth = squareWidth * RATIO;
      while( xPos + nextWidth < WIDTH + 0.1 ){
        
        fill( getRandomColor() );
        rect( xPos, yPos, nextWidth, squareWidth );
        xPos += nextWidth;

      }
      squareWidth = WIDTH - xPos;

    }else{

      // If iteration number is even, add square in y-axis direction.
      const nextHeight = squareWidth / RATIO;
      while ( yPos + nextHeight < WIDTH + 0.1 ){

        fill( getRandomColor() );
        rect( xPos, yPos, squareWidth, nextHeight );
        yPos += nextHeight;
        
      }
      squareWidth = WIDTH - yPos;

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
  return color( random( 100 ), 100, 100 );
}

