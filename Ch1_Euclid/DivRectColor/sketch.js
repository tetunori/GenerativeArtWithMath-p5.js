
function setup() {
  createCanvas( 500, 500 );
}

function draw() {

  const SCALAR = 50;
  const WIDTH  = 10 * SCALAR;
  const HEIGHT =  6 * SCALAR;

  let squareWidth = HEIGHT;
  let xPos = 0;
  let yPos = 0;
  let itr = 0;

  colorMode( HSB, 100 );

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

  noLoop();

}

// The number is even or not.
const isEven = ( number ) => {
  return ( number % 2 === 0 );
}

