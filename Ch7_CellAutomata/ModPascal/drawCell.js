
// Draw cells on canvas
const drawCell = ( generation, num, array, modulo, width ) => {

  const scalar = width / num;
  let xPos = ( width - array.length * scalar ) * 0.5;
  const yPos = generation * scalar;

  noStroke();
  
  for( const element of array ){

    const colorParam = element * 100 / modulo;
    fill( colorParam, colorParam, 100 );
    rect( xPos, yPos, scalar, scalar );
    xPos += scalar;

  }

}
