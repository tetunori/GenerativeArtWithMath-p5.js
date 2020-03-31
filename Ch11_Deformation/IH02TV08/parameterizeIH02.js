
const parameterizeIH02 = ( vectorArray, index, randomMatrix ) => {
  
  const controlPointVectors = [];

  for( let indexCP = 0; indexCP < 2; indexCP++ ){

    const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % GON ], vectorArray[ index ] );
    vector.mult( Math.pow( -1, indexCP ) );
    controlPointVectors.push( vector );

    const cpv = controlPointVectors[ indexCP ];
    if( index < 3 ){
      cpv.rotate( randomMatrix[ index ][ indexCP ] * Math.PI / 3 );
    }else if( index !== 4 ){
      cpv.rotate( -1.0 * randomMatrix[ 5 - index ][ indexCP ] * Math.PI / 3 );
    }else{
      cpv.rotate( randomMatrix[ 5 - index ][ ( indexCP + 1 ) % 2 ] * Math.PI / 3 );
    }
    cpv.add( vectorArray[ ( index + indexCP ) % GON ] );

  }

  return controlPointVectors;

}
