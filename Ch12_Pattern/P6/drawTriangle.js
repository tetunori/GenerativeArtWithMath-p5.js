
const drawTriangle = ( randomArray ) => {

  const vectorArray = [];
  vectorArray.push( createVector( 0, 0 ) );

  const vector = p5.Vector.fromAngle( Math.PI / 6 );
  vector.mult( scalar / 2 );
  vectorArray.push( vector );

  const ctrVectorArray = [];
  for( let index = 0; index < 2; index++ ){

    const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % 2 ], 
                                    vectorArray[ index ] );
    vector.rotate( randomArray[ index ] * Math.PI / 3 );
    vector.add( vectorArray[ index ] );
    ctrVectorArray.push( vector );

  }

  beginShape();

    noFill();
    strokeWeight( 3 );

    vertex( vectorArray[ 0 ].x, vectorArray[ 0 ].y );
    bezierVertex( ctrVectorArray[ 0 ].x, ctrVectorArray[ 0 ].y,
                  ctrVectorArray[ 1 ].x, ctrVectorArray[ 1 ].y,
                  vectorArray[ 1 ].x, vectorArray[ 1 ].y, );

  endShape();

}
