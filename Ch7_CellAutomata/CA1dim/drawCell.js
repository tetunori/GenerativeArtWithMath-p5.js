
// Draw cells on canvas
const drawCell = ( generation, num, array, modulo, width ) => {

  const scalar = width * 0.5 / num;
  let xPos = ( width - array.length * scalar ) * 0.5;
  const yPos = generation * scalar;

  noStroke();
  
  for( const element of array ){

    const colorParam = element * 100 / modulo;
    if( colorParam < 1 ){
      fill( colorParam, colorParam, 100 );
    }else{
      fill( colorParam, colorParam, 90 );
    }
    
    rect( xPos, yPos, scalar, scalar );
    xPos += scalar;

  }

}
