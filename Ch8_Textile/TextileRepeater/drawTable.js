
// Draw table
const drawTable = ( matrix, x, y, color1, color2, scalar ) => {

  let posY = y * scalar;
  for( [ idRow, elementRow ] of matrix.entries() ){

    let posX = x * scalar;
    for( [ idColumn, elementColumn ] of matrix[0].entries() ){

      if( matrix[ idRow ][ idColumn ] === 0 ){
        fill( color2 );
      }else{
        fill( color1 );
      }

      rect( posX, posY, scalar, scalar );
      posX += scalar;

    }

  posY += scalar;

  }

}
