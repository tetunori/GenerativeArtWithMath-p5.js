
const drawRhomboid = ( vectorArray, colorArray ) => {

  
  for( let i = 0; i < 6; i += 2 ){

    const vertexVectors = [];

    fill( colorArray[ Math.floor( i / 2 ) ] );

    beginShape();

      const zeroVector = createVector( 0, 0 );
      if( gMode < MODE_CONNECT_MIDPOINT ){
        vertex( zeroVector.x, zeroVector.y );
      }
      vertexVectors.push( zeroVector );

      for( let j = -1; j < 2; j++ ){

        const vector = vectorArray[ ( i + j + 6 ) % 6 ];
        if( gMode < MODE_CONNECT_MIDPOINT ){
          vertex( vector.x, vector.y );
        }
        vertexVectors.push( vector );

      }

    endShape( CLOSE );

    if( gMode >= MODE_CONNECT_MIDPOINT ){
      drawRect( vertexVectors, colorArray );
    }

  }

}
