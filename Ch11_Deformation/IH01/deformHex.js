
const deformHex = () => {

  const vectorArray = [];

  for( let index = 0; index < GON; index++ ){
    
    const vector = p5.Vector.fromAngle( 2 * Math.PI * index / GON );
    vector.mult( scalar / Math.sqrt( 3 ) );
    vectorArray.push( vector );

  }

  beginShape();

    vertex( vectorArray[ 0 ].x, vectorArray[ 0 ].y );

    for( let index = 0; index < GON; index++ ){

      const controlPointVectors = parameterizeIH01( vectorArray, index, randomMatrix );
      const cpv0 = controlPointVectors[ 0 ];
      const cpv1 = controlPointVectors[ 1 ];
      const vector = vectorArray[ ( index + 1 ) % GON ];
      bezierVertex( cpv0.x, cpv0.y, 
                    cpv1.x, cpv1.y,
                    vector.x, vector.y );

    }

  endShape( CLOSE );

}
