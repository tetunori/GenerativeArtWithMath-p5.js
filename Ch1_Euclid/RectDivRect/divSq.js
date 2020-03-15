
// Divide a square whose length is squareWidth at ( xPos, yPos ) with some rectangles whose sides have ratio.
const divSquare = ( xPos, yPos, squareWidth, ratio ) => {

  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth + yPos;
  let itr = 0;

  while( squareWidth > 0.1 ){

    itr++;
    if( isOdd( itr ) ){

      const nextWidth = squareWidth * ratio;
      while( xPos + nextWidth < xEndPos + 0.1 ){
        
        fill( getRandomColor() );
        rect( xPos, yPos, nextWidth, squareWidth );
        xPos += nextWidth;

      }
      squareWidth = xEndPos - xPos;

    }else{

      const nextHeight = squareWidth / ratio;
      while ( yPos + nextHeight < yEndPos + 0.1 ){

        fill( getRandomColor() );
        rect( xPos, yPos, squareWidth, nextHeight );
        yPos += nextHeight;
        
      }
      squareWidth = yEndPos - yPos;

    }

  }

}
