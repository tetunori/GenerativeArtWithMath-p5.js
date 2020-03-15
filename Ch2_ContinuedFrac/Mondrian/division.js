
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
