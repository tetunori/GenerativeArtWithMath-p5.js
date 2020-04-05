
const drawSqTriangle = ( colorArray, gap ) => {

  const vectorArray = [];
  for( let index = 0; index < 4; index++ ){

      const vector = p5.Vector.fromAngle( Math.PI * ( index + 0.5 ) / 2 );
      vector.mult( 0.5 * scalar / Math.sqrt( 2 ) );
      vectorArray.push( vector );

  }

  for( let idReflection = 0; idReflection < 2; idReflection++ ){

    for( let idReflection2 = 0; idReflection2 < 2; idReflection2++ ){

        push();
          scale( Math.pow( -1, idReflection ), Math.pow( -1, idReflection2 ) );
          translate( scalar / 4, scalar / 4 );

          if( gMode === MODE_SQUARE_TRIANGLE ){
            drawTriangle( vectorArray, colorArray, gap );
          }else{
            drawPentagon( vectorArray, colorArray, gap );
          }
        pop();

    }

  }

}
