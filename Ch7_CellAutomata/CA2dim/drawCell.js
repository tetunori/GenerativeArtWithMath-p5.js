
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
      if( colorParam < 1 ){
        fill( colorParam, colorParam, 100 );
      }else{
        fill( colorParam, colorParam, 90 );
      }
      rect( xPos, yPos, scalar, scalar );
      
      xPos += scalar;

    }
    
    yPos += scalar;

  }

}
