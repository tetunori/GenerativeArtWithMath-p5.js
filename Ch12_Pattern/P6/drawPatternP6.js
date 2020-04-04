
const drawPatternP6 = ( randomArray ) => {

  for( let index = 0; index < 6; index++ ){

    push();
      rotate( 2 * Math.PI * index / 6 );
      drawTriangle( randomArray );
    pop();

  }

}
