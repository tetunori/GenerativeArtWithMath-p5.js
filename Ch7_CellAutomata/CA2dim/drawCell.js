
// Draw cells on canvas
const drawCell = ( num, array, modulo, height ) => {

  const scalar = height / num;
  let yPos = 0;
  let xPos = 0;
  
  for( let idRow = 0; idRow < num; idRow++ ){

    xPos = 0;
    for( let idColumn = 0; idColumn < num; idColumn++ ){

      noStroke();
      const colorParam = array[ idRow ][ idColumn ] * 100 / modulo;
      fill( colorParam, colorParam, 100 );
      rect( xPos, yPos, scalar, scalar );
      
      xPos += scalar;

    }
    
    yPos += scalar;

  }

}
