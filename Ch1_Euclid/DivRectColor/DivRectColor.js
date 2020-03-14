
const SCALAR = 50;
const WIDTH  = 10 * SCALAR;
const HEIGHT =  6 * SCALAR;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  noLoop();

}

function draw() {

  let squareWidth = HEIGHT;
  let xPos = 0;
  let yPos = 0;
  let itr = 0;

  while( squareWidth > 0 ){

    itr++;
    if( isOdd( itr ) ){

      // If iteration number is odd, add square in x-axis direction.
      while( xPos + squareWidth <= WIDTH ){
        
        fill( getRandomColor() );
        rect( xPos, yPos, squareWidth, squareWidth );
        xPos += squareWidth;

      }
      squareWidth = WIDTH - xPos;

    }else{

      // If iteration number is even, add square in y-axis direction.
      while ( yPos + squareWidth <= HEIGHT ){

        fill( getRandomColor() );
        rect( xPos, yPos, squareWidth, squareWidth );
        yPos += squareWidth;
        
      }
      squareWidth = HEIGHT - yPos;

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

