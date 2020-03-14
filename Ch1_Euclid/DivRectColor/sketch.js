
const CANVAS_WIDTH = 1000; 

const SCALAR = 50;
const WIDTH  = 9 * SCALAR;
const HEIGHT =  38 * SCALAR;


function setup() {

  createCanvas( WIDTH + 10, HEIGHT + 10 );
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
    if( !isEven( itr ) ){

      // If iteration number is odd, add square in x-axis direction.
      while( xPos + squareWidth <= WIDTH ){
        
        const col = color( random( 100 ), 100, 100 );
        fill( col );
        rect( xPos, yPos, squareWidth, squareWidth );
        xPos += squareWidth;

      }
      squareWidth = WIDTH - xPos;

    }else{

      // If iteration number is even, add square in y-axis direction.
      while ( yPos + squareWidth <= HEIGHT ){

        const col = color( random( 100 ), 100, 100 );
        fill( col );
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

