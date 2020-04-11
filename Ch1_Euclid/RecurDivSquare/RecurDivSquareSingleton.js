
let gThreashold = 160;
let gNumA = 10;
let gNumB =  6;
let gRatio = gNumB / gNumA;

const WIDTH = 500;

function setup() {

  const myCanvas = createCanvas( WIDTH, WIDTH );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  noLoop();
  
}

function draw() {

  divSquare( 0, 0, WIDTH, gRatio, gThreashold );
  
}

function mouseClicked() {
  
  gNumA = getRandomInteger( 1, 20 );
  gNumB = getRandomInteger( 1, 20 );
  while ( gNumA === gNumB ){
    gNumB = getRandomInteger( 1, 20 );
  }

  gThreashold = getRandomInteger( 10, 300 );
  console.log( 'NumA = ' + gNumA + ', NumB = ' + gNumB + ', Threashold = ' + gThreashold ); 

  gRatio = gNumB / gNumA;

  background( 0, 0, 100 );
  divSquare( 0, 0, WIDTH, gRatio, gThreashold );

}


// Divide a square whose length is squareWidth at ( xPos, yPos ) with some rectangles whose sides have ratio.
const divSquare = ( xPos, yPos, squareWidth, ratio, threashold ) => {

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth + yPos;
  let itr = 0;

  fill( getRandomColor() );
  rect( xPos, yPos, squareWidth, squareWidth );
  
  while( squareWidth > threashold + 0.1 ){

    itr++;
    if( isOdd( itr ) ){

      const nextWidth = squareWidth * ratio;
      while( xPos + nextWidth < xEndPos + 0.1 ){
        
        divRect( xPos, yPos, nextWidth, ratio, threashold );
        xPos += nextWidth;

      }
      squareWidth = xEndPos - xPos;

    }else{

      const nextHeight = squareWidth / ratio;
      while ( yPos + nextHeight < yEndPos + 0.1 ){

        divRect( xPos, yPos, squareWidth, ratio, threashold );
        yPos += nextHeight;
        
      }
      squareWidth = yEndPos - yPos;

    }

  }

}

// Divide a rectangle with specified ratio whose width is squareWidth at ( xPos, yPos ) with some squares.
const divRect = ( xPos, yPos, squareWidth, ratio, threashold ) => {

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth / ratio + yPos;
  let itr = 0;

  fill( getRandomColor() );
  rect( xPos, yPos, squareWidth, squareWidth / ratio );

  while( squareWidth > threashold + 0.1 ){

    itr++;
    if( isEven( itr ) ){

      while( xPos + squareWidth < xEndPos + 0.1 ){

        divSquare( xPos, yPos, squareWidth, ratio, threashold );
        xPos += squareWidth;

      }
      squareWidth = xEndPos - xPos;

    }else{

      while ( yPos + squareWidth < yEndPos + 0.1 ){

        divSquare( xPos, yPos, squareWidth, ratio, threashold );
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

// Get random integer between min and max
const getRandomInteger = ( min, max ) => {
  return Math.floor( random( min, max ) );
}
