
// Draw 6 triangles generated from a hexagon
const drawHexTriangle = ( gap ) => {

  for( let idReflection = 0; idReflection < 2; idReflection++ ){

    for( let idRotation = 0; idRotation < 3; idRotation++ ){

      push();

        scale( 1, Math.pow( -1, idReflection ) );
        rotate( 2 * Math.PI * idRotation / 3 );

        if( gMode === MODE_HELLO_WORLD ){
          drawTriangle();
        }else{
          drawRecurTriangle( gap );
        }

      pop();

    }

  }

}

// Draw single Hello world triangle
const drawTriangle = () => {

  imageMode( CENTER );
  image( gImage, 0, 0 );

}
