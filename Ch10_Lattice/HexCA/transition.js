
// get next value
const transition = ( idRow, idColumn ) => {

  let nextValue;

  nextValue = 
      gStateMatrix[ idRow ][ idColumn ]                        // Center cell
    + gStateMatrix[ ( idRow - 1 + gNum ) % gNum ][ idColumn ]  // Upper cell
    + gStateMatrix[ ( idRow - 1 + gNum ) % gNum ][ ( idColumn + 1 ) % gNum ]  // Upper-right cell
    + gStateMatrix[ idRow ][ ( idColumn + 1) % gNum ]          // Lower-right cell
    + gStateMatrix[ ( idRow + 1 ) % gNum ][ idColumn ]         // Lower cell
    + gStateMatrix[ ( idRow + 1 ) % gNum ][ ( idColumn - 1 + gNum ) % gNum ] // Lower-left cell
    + gStateMatrix[ idRow ][ ( idColumn - 1 + gNum ) % gNum ]; // Upper-right cell

  nextValue %= gModulo;
  return nextValue;

}
