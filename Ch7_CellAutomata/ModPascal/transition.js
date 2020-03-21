
// Transit to next generation values
const transition = ( index, array, modulo ) => {
  return ( array[ index + 1 ] + array[ index ] ) % modulo;
}
