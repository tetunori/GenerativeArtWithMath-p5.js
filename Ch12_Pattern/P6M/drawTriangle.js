
const drawTriangle = ( randomArray ) => {

  const vectorArray = [];
  for( let index = 0; index < 2; index++ ){

    const vector = p5.Vector.fromAngle( index * Math.PI / 6 );
    vector.mult( scalar );
    vectorArray.push( vector );

  }

  const ctrVectorArray = [];
  for( let index = 0; index < 4; index++ ){

    const vector = p5.Vector.mult( vectorArray[ Math.floor( index / 2 ) ], 
                                    randomArray[ index ] );
    ctrVectorArray.push( vector );

  }

  beginShape();

    vertex( 0, 0 );
    vertex( vectorArray[ 0 ].x, vectorArray[ 0 ].y );
    bezierVertex( ctrVectorArray[ 1 ].x, ctrVectorArray[ 1 ].y,
                  ctrVectorArray[ 2 ].x, ctrVectorArray[ 2 ].y,
                  ctrVectorArray[ 3 ].x, ctrVectorArray[ 3 ].y, );

  endShape( CLOSE );

}

// Get random color
const getRandomColor = () => {
  return color( random( 100 ), 100, 100 );
}
