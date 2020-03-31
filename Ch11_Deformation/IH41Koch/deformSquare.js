
const deformSquare = () => {

  const GON = 4;
  const vectorArray = [];

  for( let index = 0; index < GON; index++ ){
    
    const vector = p5.Vector.fromAngle( 2 * Math.PI * ( index + 0.5 ) / 4 );
    vector.mult( scalar / Math.sqrt( 2 ) );
    vectorArray.push( vector );

  }

  beginShape();

    for( let index = 0; index < GON; index++ ){

      if( index < 2 ){
        drawKoch( vectorArray[ index ], vectorArray[ ( index + 1 ) % 4 ], 0, true );
      }else{
        drawKoch( vectorArray[ index ], vectorArray[ ( index + 1 ) % 4 ], 0, false );
      }

    }

  endShape( CLOSE );

}
