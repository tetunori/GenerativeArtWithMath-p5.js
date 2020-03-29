
const parameterizeIH41 = ( vectorArray, index, randomMatrix ) => {
  
  const controlPointVectors = [];

  for( let indexCP = 0; indexCP < 2; indexCP++ ){

    const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % 4 ], vectorArray[ index ] );
    vector.mult( Math.pow( -1, indexCP ) );
    controlPointVectors.push( vector );

    const cpv = controlPointVectors[ indexCP ];
    if( index < 2 ){
      cpv.rotate( randomMatrix[ index % 2 ][ indexCP % 2 ] * Math.PI / 4 );
    }else{
      cpv.rotate( randomMatrix[ index % 2 ][ ( indexCP + 1 ) % 2 ] * Math.PI / 4 );
    }
    cpv.add( vectorArray[ ( index + indexCP ) % 4 ] );

  }

  return controlPointVectors;

}
