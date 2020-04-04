
const drawPatternP31M = ( randomArray, color1, color2 ) => {

  for( let idReflection = 0; idReflection < 2; idReflection++ ){

    for( let idRotation = 0; idRotation < 3; idRotation++ ){

        push();
          scale( 1, Math.pow( -1, idReflection ) );
          rotate( 2 * Math.PI * idRotation / 3 );
          drawTriangle( randomArray, color1, color2 );
        pop();
    }

  }

}
