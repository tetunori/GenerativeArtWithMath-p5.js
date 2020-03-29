
// Deform Hex
const deformHex = () => {

  const vectorArray = [];
  const GON = 6;

  for( let index = 0; index < GON; index++ ){

    let vector = p5.Vector.fromAngle( 2 * Math.PI * index / GON );
    vector.mult( SCALAR / Math.sqrt( 3 ) );
    vectorArray.push( vector );
    parameterizeTV08( vectorArray, index );
    
  }

  beginShape();

    for( let index = 0; index < GON; index++ ){
      vertex( vectorArray[ index ].x, vectorArray[ index ].y );
    }

  endShape( CLOSE );

}
