
const drawSquare = ( vectors ) => {

  for( let index = 0; index < vectors.length; index++ ){
    
    line( vectors[ index ].x, 
          vectors[ index ].y, 
          vectors[ ( index + 1 ) % 4 ].x, 
          vectors[ ( index + 1 ) % 4 ].y );

  }

}
