
let gArrayFibonacci = undefined;
const generateFibonacci = ( maxIndex ) => {

  const array = [ 0, 1 ];

  for( let index = 1; index < maxIndex; index++ ){
    array.push( array[ index - 1 ] + array[ index ] )
  }

  gArrayFibonacci = array.reverse();
  // console.log( gArrayFibonacci );

}
