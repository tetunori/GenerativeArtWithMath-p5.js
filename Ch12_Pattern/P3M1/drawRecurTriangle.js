
// Draw trialge recursively
const drawRecurTriangle = ( gap ) => {

  let vectorArray = [];

  for( let index = 0; index < 2; index++ ){

    const vector = p5.Vector.fromAngle( index * Math.PI / 3 );
    vector.mult( scalar / Math.sqrt( 3 ) );
    vectorArray.push( vector );

  }
  vectorArray.push( createVector( 0, 0 ) );

  beginShape( TRIANGLES );

    while( vectorArray[ 0 ].dist( vectorArray[ 1 ] ) > 1 ){

      for( let index = 0; index < 3; index++ ){
        const vector = vectorArray[ index ];
        vertex( vector.x, vector.y );
      }
      vectorArray = getVector( vectorArray, gap );

    }

  endShape();

}

// Get next vector
const getVector = ( vectorArray, gap ) => {

  const nextVector = [];

  for( let index = 0; index < 3; index++ ){

    const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % 3 ], vectorArray[ index ] );
    vector.mult( gap );
    nextVector.push( p5.Vector.add( vectorArray[ index ], vector ) );

  }

  return nextVector;

}
