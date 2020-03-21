
// Draw Number on canvas
const drawNumber = ( generation, num, array, width ) => {

  const scalar = width / num;
  let xPos = ( width - array.length * scalar ) * 0.5;
  const yPos = generation * scalar;

  fill( 'black' );
  textSize( scalar * 0.5 );
  
  for( const element of array ){

    text( element, xPos + scalar * 0.5, yPos + scalar * 0.5 );
    xPos += scalar;

  }

}
