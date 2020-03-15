
const THREASHOLD = 40;
const gRatioArray = 
  [ ( Math.sqrt( 5 ) + 1 ) / 2,
    Math.sqrt( 2 ), 
    Math.sqrt( 3 ), 
    Math.sqrt( 5 )
  ];
const gRatioArrayDescription = 
  [ 'ratio = ( Math.sqrt( 5 ) + 1 ) / 2',
    'ratio = Math.sqrt( 2 )', 
    'ratio = Math.sqrt( 3 )', 
    'ratio = Math.sqrt( 5 )'
  ];
let gRatioArrayIndex = 0;
let gRatio = gRatioArray[ gRatioArrayIndex ];

const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  noLoop();
  
}

function draw() {
  divSquare( 0, 0, WIDTH, gRatio, THREASHOLD );
}

function mouseClicked() {

  background( 0, 0, 100 );

  gRatioArrayIndex++;
  if( gRatioArrayIndex > gRatioArray.length - 1 ){ gRatioArrayIndex = 0; }
  gRatio = gRatioArray[ gRatioArrayIndex ];
  console.log( gRatioArrayDescription[ gRatioArrayIndex ] + ', Threashold = 40.' );
  divSquare( 0, 0, WIDTH, gRatio, THREASHOLD );

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
  return color( random( 100 ), 100, 100 );
}

// Get random integer between min and max
const getRandomInteger = ( min, max ) => {
  return Math.floor( random( min, max ) );
}
