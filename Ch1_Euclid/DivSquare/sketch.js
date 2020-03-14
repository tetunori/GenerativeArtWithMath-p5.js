
const CANVAS_WIDTH = 1000; 
const WIDTH = 500;

function setup() {

  createCanvas( CANVAS_WIDTH, CANVAS_WIDTH );
  colorMode( HSB, 100 );
  noLoop();
  
}

function draw() {

  const numA = 17;
  const numB = 12;
  const RATIO = numB / numA;

  let squareWidth = WIDTH;
  let xPos = 0;
  let yPos = 0;
  let itr = 0;

  while( squareWidth > 0.1 ){

    itr++;
    if( !isEven( itr ) ){

      // If iteration number is odd, add square in x-axis direction.
      while( xPos + squareWidth * RATIO < WIDTH + 0.1 ){
        
        const col = color( random( 100 ), 100, 100 );
        fill( col );
        rect( xPos, yPos, squareWidth * RATIO, squareWidth );
        xPos += squareWidth * RATIO;

      }
      squareWidth = WIDTH - xPos;

    }else{

      // If iteration number is even, add square in y-axis direction.
      while ( yPos + squareWidth / RATIO < WIDTH + 0.1 ){

        const col = color( random( 100 ), 100, 100 );
        fill( col );
        rect( xPos, yPos, squareWidth, squareWidth / RATIO );
        yPos += squareWidth / RATIO;
        
      }
      squareWidth = WIDTH - yPos;

    }

  }
  
}

// The number is even or not.
const isEven = ( number ) => {
  return ( number % 2 === 0 );
}

