
const drawPatternP3 = ( randomArray, isLast ) => {

  let startIndex = 0;
  if( isLast ){ startIndex = 2; }

  for( let index = startIndex; index < 3; index++ ){

    push();
      rotate( 2 * Math.PI * index / 3 );
      drawRhomboid( randomArray );
    pop();

  }

}

const drawRhomboid = ( randomArray ) => {

  const vectorArray = [];
  for( let index = 0; index < 2; index++ ){

    const vector = p5.Vector.fromAngle( 2 * Math.PI * index / 3 );
    vector.mult( scalar / Math.sqrt( 3 ) );
    vectorArray.push( vector );

  }

  const ctrVectorArray = [];
  for( let index = 0; index < 4; index++ ){

    const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % 2 ], 
                                    vectorArray[ index % 2 ] );
    vector.rotate( randomArray[ index ] * Math.PI / 3 );
    vector.add( vectorArray[ index % 2 ] );
    ctrVectorArray.push( vector );

  }

  beginShape();

    vertex( vectorArray[ 0 ].x, vectorArray[ 0 ].y );
    bezierVertex( ctrVectorArray[ 0 ].x, ctrVectorArray[ 0 ].y,
                  ctrVectorArray[ 1 ].x, ctrVectorArray[ 1 ].y,
                  vectorArray[ 1 ].x, vectorArray[ 1 ].y, );
    bezierVertex( ctrVectorArray[ 3 ].x, ctrVectorArray[ 3 ].y,
                  ctrVectorArray[ 2 ].x, ctrVectorArray[ 2 ].y,
                  vectorArray[ 0 ].x, vectorArray[ 0 ].y, );

  endShape();


}
