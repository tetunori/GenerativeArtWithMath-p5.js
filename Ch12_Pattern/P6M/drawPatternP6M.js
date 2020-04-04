
const drawPatternP6M = ( randomArray ) => {

  for( let idReflection = 0; idReflection < 2; idReflection++ ){

    for( let idRotation = 0; idRotation < 6; idRotation++ ){

      push();
        scale( 1, Math.pow( -1, idReflection ) );
        rotate( 2 * Math.PI * idRotation / 6 );
        drawTriangle( randomArray );
      pop();

    }

  }

}
