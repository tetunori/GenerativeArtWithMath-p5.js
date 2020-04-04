
const drawLine = ( randomArray ) => {

  const vectorArray = [];
  for( let index = 0; index < 2; index++ ){

    const vector = p5.Vector.fromAngle( Math.PI / 6 );
    vector.mult( scalar / 3 );
    
    const directionVector = createVector( -scalar / Math.sqrt( 3 ), 0 );
    directionVector.mult( Math.abs( randomArray[ index ] ) );
    vector.add( directionVector );
    vectorArray.push( vector );

  }

  beginShape();

    vertex( 0, 0 );
    vertex( vectorArray[ 0 ].x, vectorArray[ 0 ].y );
    vertex( vectorArray[ 1 ].x, vectorArray[ 1 ].y );

  endShape( CLOSE );

}
