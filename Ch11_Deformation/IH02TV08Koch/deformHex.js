
// deform Hex
const deformHex = () => {

  const vectorArray = [];

  for( let index = 0; index < GON; index++ ){
    
    const vector = p5.Vector.fromAngle( 2 * Math.PI * index / GON );
    vector.mult( SCALAR / Math.sqrt( 3 ) );
    vectorArray.push( vector );
    parameterizeTV08( vectorArray, index );

  }

  beginShape();

    for( let index = 0; index < GON; index++ ){

      if( index < 3 ){
        drawKoch( vectorArray[ index ], vectorArray[ ( index + 1 ) % GON ], 0, true );
      }else{
        drawKoch( vectorArray[ index ], vectorArray[ ( index + 1 ) % GON ], 0, false );
      }

    }

  endShape( CLOSE );

}
