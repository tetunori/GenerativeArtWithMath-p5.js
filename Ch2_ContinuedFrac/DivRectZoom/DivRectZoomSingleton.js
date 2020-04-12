
const RATIO = Math.sqrt( 2 );
// const RATIO = Math.sqrt( 3 );
// const RATIO = ( 1 + Math.sqrt( 5 ) ) / 2;
const WIDTH  = 500;
const HEIGHT = WIDTH / RATIO;

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( getPointerX ); 
  colorMode( HSB, 1 );

}

function draw() { 

  background( 0, 0, 1 );
  const scalar = Math.pow( 50, getPointerX() * 1.0 / WIDTH ) * WIDTH;
  divRect( WIDTH - scalar, HEIGTH - ( scalar / RATIO ), scalar, RATIO );
  
}

const getPointerX = () => {

  if( touches[0] ){
    return touches[0].x;
  }else{
    return mouseX;
  }

}

const divRect = ( xPos, yPos, squareWidth, ratio ) => {

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth / ratio + yPos;
  let itr = 0;

  while( squareWidth > 0.1 ){

    itr++;
    // fill( color( ( itr * ratio ) % 1, 1, 1 ) );
    fill( color( ( itr * ratio ) % 1, 0.4, 1 ) );

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
