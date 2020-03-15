
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
