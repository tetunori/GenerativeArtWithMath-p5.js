
// Draw line
const drawLine = ( vectors ) => {

  if( vectors.length > 1 ){

    for( let index = 0; index < vectors.length - 1; index++ ){

      strokeWeight( 1 );
      const currentElement = vectors[ index ];
      const nextElement    = vectors[ index + 1 ];
      line( currentElement.x, currentElement.y, nextElement.x, nextElement.y );
      
    }

  }else{

    stroke( 'black' );
    strokeWeight( 8 );
    point( vectors[ 0 ].x, vectors[ 0 ].y );

  }

}
