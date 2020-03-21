
// Draw cells on canvas
const drawCell = ( generation, num, array, modulo, width ) => {

  const scalar = width * 0.5 / num;
  let xPos = ( width - array.length * scalar ) * 0.5;
  const yPos = generation * scalar;

  noStroke();
  
  for( const element of array ){

    fill( 0, 0, 100 * ( 1 - element ) );
    rect( xPos, yPos, scalar, scalar );
    xPos += scalar;

  }

}
