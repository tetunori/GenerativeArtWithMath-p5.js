
// Transit to next generation values
const transition = ( idRow, idColumn, num, array, modulo ) => {

  const next = array[ ( idRow - 1 + num ) % num ][ idColumn ] +   // Up cell
                array[ idRow ][ ( idColumn - 1 + num ) % num ] +  // Left cell
                array[ idRow ][ idColumn ] +                      // Center cell
                array[ idRow ][ ( idColumn + 1 ) % num ] +        // Right cell
                array[ ( idRow + 1 ) % num ][ idColumn ];         // Down cell


  return next % modulo;

}
