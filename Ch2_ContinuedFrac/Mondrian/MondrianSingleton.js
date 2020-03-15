
const RATIO = ( Math.sqrt( 5 ) + 1 ) / 2;
let gThreasholdDivision = 80;
let gThreasholdProbability = 0.5;

const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  noLoop();
  
}

function draw() {
  colorRect( 0, 0, WIDTH, WIDTH );
  divSquare( 0, 0, WIDTH, RATIO, gThreasholdDivision, gThreasholdProbability );
}

function mouseClicked() {

  background( 0, 0, 100 );

  gThreasholdDivision = getRandomInteger( 10, 300 );
  gThreasholdProbability = random( 0, 1 );
  console.log( 'Threashold Division: ' + gThreasholdDivision + ',\n' +
                  'Threashold Probability: ' + gThreasholdProbability );
  
  colorRect( 0, 0, WIDTH, WIDTH );
  divSquare( 0, 0, WIDTH, RATIO, gThreasholdDivision, gThreasholdProbability );

}


// Divide a square whose length is squareWidth at ( xPos, yPos ) with some rectangles whose sides have ratio.
const divSquare = ( xPos, yPos, squareWidth, ratio, thrDiv, thrPrb ) => {

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth + yPos;
  let itr = 0;

  while( squareWidth > thrDiv + 0.1 ){

    itr++;
    if( isOdd( itr ) ){

      const nextWidth = squareWidth * ratio;
      while( xPos + nextWidth < xEndPos + 0.1 ){
        
        colorRect( xPos, yPos, nextWidth, squareWidth );
        if( random( 1 ) < thrPrb ){
          divRect( xPos, yPos, nextWidth, ratio, thrDiv, thrPrb );
        }
        xPos += nextWidth;

      }
      squareWidth = xEndPos - xPos;

    }else{

      const nextHeight = squareWidth / ratio;
      while ( yPos + nextHeight < yEndPos + 0.1 ){

        colorRect( xPos, yPos, squareWidth, nextHeight );
        if( random( 1 ) < thrPrb ){
          divRect( xPos, yPos, squareWidth, ratio, thrDiv, thrPrb );
        }
        yPos += nextHeight;
        
      }
      squareWidth = yEndPos - yPos;

    }

  }

}

// Divide a rectangle with specified ratio whose width is squareWidth at ( xPos, yPos ) with some squares.
const divRect = ( xPos, yPos, squareWidth, ratio, thrDiv, thrPrb ) => {

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth / ratio + yPos;
  let itr = 0;

  while( squareWidth > thrDiv + 0.1 ){

    itr++;
    if( isEven( itr ) ){

      while( xPos + squareWidth < xEndPos + 0.1 ){

        colorRect( xPos, yPos, squareWidth, squareWidth );
        if( random( 1 ) < thrPrb ){
          divSquare( xPos, yPos, squareWidth, ratio, thrDiv, thrPrb );
        }
        xPos += squareWidth;

      }
      squareWidth = xEndPos - xPos;

    }else{

      while ( yPos + squareWidth < yEndPos + 0.1 ){

        colorRect( xPos, yPos, squareWidth, squareWidth );
        if( random( 1 ) < thrPrb ){
          divSquare( xPos, yPos, squareWidth, ratio, thrDiv, thrPrb );
        }
        yPos += squareWidth;
        
      }
      squareWidth = yEndPos - yPos;

    }

  }

}

// Draw colored rect
const colorRect = ( xPos, yPos, width, height ) => {

  let mondrianColor;
  const randomValue = random( 100 );

  if( randomValue < 15 ){
    mondrianColor = color( 0, 100, 100 );
  }else if( randomValue < 30 ){
    mondrianColor = color( 67, 100, 100 );
  }else if( randomValue < 45 ){
    mondrianColor = color( 17, 100, 100 );
  }else if( randomValue < 50 ){
    mondrianColor = color( 0, 100, 0 );
  }else if( randomValue < 70 ){
    mondrianColor = color( 0, 0, 90 );
  }else{
    mondrianColor = color( 0, 0, 100 );
  }

  fill( mondrianColor );
  strokeWeight( 5 );
  rect( xPos, yPos, width, height );

}

// The number is even or not.
const isEven = ( number ) => {
  return ( number % 2 === 0 );
}

// The number is odd or not.
const isOdd = ( number ) => {
  return ( number % 2 === 1 );
}

// Get random integer between min and max
const getRandomInteger = ( min, max ) => {
  return Math.floor( random( min, max ) );
}
