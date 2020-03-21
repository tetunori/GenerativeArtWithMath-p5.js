
let gModeTransition = -1;

// Transit to next generation values
const transition = ( numA, numB, numC, modulo ) => {

  let retValue = 0;

  switch( gModeTransition ){
    default:
    case 0:
      retValue = ( numA + numB + numC ) % modulo;
      break;
    case 1:
      retValue = ( numA + numC ) % modulo;
      break;
    case 2:
      retValue = ( numA + numB ) % modulo;
      break;
    case 3:
      retValue = ( numA + numB + numC + 1 ) % modulo;
      break;
    case 4:
      retValue = ( numB + numC ) % modulo;
      break;
  }

  return retValue;

}

const toggleTransition = () => {

  gModeTransition++;
  if( gModeTransition > 4 ){
    gModeTransition = 0;
  }

  switch( gModeTransition ){
    default:
    case 0:
      console.log( 'Transition: d = a + b + c' );
      break;
    case 1:
      console.log( 'Transition: d = a + c' );
      break;
    case 2:
      console.log( 'Transition: d = a + b' );
      break;
    case 3:
      console.log( 'Transition: d = a + b + c + 1' );
      break;
    case 4:
      console.log( 'Transition: d = b + c' );
      break;
  }

}
