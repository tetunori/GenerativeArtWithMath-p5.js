
const drawRect = ( vertexVectors, colorArray ) => {

  fill( colorArray[ 1 ] );

  beginShape();

    for( let index = 0; index < 4; index++ ){

      const vector = vertexVectors[ index ].copy(); 
      vector.add( vertexVectors[ ( index + 1 ) % 4 ] );
      vector.mult( 0.5 );
      vertex( vector.x, vector.y );

    }

  endShape( CLOSE );

}
