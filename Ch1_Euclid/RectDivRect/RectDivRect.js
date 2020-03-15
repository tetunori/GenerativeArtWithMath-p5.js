
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
