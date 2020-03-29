
const deformSquare = () => {

  const GON = 4;
  const vectorArray = [];

  for( let index = 0; index < GON; index++ ){
    
    const vector = p5.Vector.fromAngle( 2 * Math.PI * ( index + 0.5 ) / 4 );
    vector.mult( scalar / Math.sqrt( 2 ) );
    vectorArray.push( vector );

  }

  beginShape();

    vertex( vectorArray[ 0 ].x, vectorArray[ 0 ].y );

    for( let index = 0; index < GON; index++ ){

      const controlPointVectors = parameterizeIH41( vectorArray, index, randomMatrix );
      const cpv0 = controlPointVectors[ 0 ];
      const cpv1 = controlPointVectors[ 1 ];
      const vector = vectorArray[ ( index + 1 ) % 4 ];
      bezierVertex( cpv0.x, cpv0.y, 
                    cpv1.x, cpv1.y,
                    vector.x, vector.y );

    }

  endShape( CLOSE );

}
