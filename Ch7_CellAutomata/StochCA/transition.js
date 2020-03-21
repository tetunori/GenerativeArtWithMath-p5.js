
// Transit to next generation values
const transition = ( numA, numB, numC, modulo ) => {

  let retValue = 0;

  if( random( 1 ) < 0.999 ){
    retValue = ( numA + numB + numC ) % modulo;
  }else{
    retValue = ( numA + numC ) % modulo;
  }
  return retValue;

}
