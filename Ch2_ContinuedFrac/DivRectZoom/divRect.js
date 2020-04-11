
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
