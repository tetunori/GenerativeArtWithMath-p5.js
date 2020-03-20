
const drawSquare = ( width ) => {

  let xPos = 0;
  let yPos = 0;
  const scalar = width / getNextFibonacci( false );

  background( 'white' );

  const targetArray = gArrayFibonacci;
  targetArray.forEach( ( element, index ) => {

    if( index > 0 ){

      // Change the colors in order
      fill( ( 10 * index ) % 100, 100, 100 );

      // Draw rect
      rect( scalar * xPos, scalar * yPos,
              scalar * element, scalar * element );

      // Move xPos, yPos
      if( isOdd( index ) ){
        xPos += element;
        yPos -= targetArray[ index - 1 ];
      }else{
        xPos -= targetArray[ index - 1 ];
        yPos += element;
      }

    }
    
  });

}

const gArrayFibonacci = [ 0, 1 ];
const showLatestFibonacciValue = () => {

  const targetArray = gArrayFibonacci;
  const latestIndex = targetArray.length - 1;

  // Show latest Fibonacci number
  let text = 'Fibonacci: ' + targetArray[ latestIndex ];

  if( targetArray.length > 2 ){
    // Show f(n+1)/f(n)
    text += ', f(' + ( latestIndex ) + ')/f(' + ( latestIndex - 1 ) + '): ' +
       ( targetArray[ latestIndex ] / targetArray[ latestIndex - 1 ] ).toFixed( 10 );
  }

  // Show it!
  console.log( text );

}

// Get Next Fibonacci Number 
//   We can also register the number in the array optionally with the flag isRegister
const getNextFibonacci = ( isRegister ) => {

  const targetArray = gArrayFibonacci;
  const latestIndex = targetArray.length - 1;

  const nextFibonacciNum = targetArray[ latestIndex - 1 ] + targetArray[ latestIndex ];
  if( isRegister ){
    targetArray.push( nextFibonacciNum );
  }

  return nextFibonacciNum;

}

// The number is odd or not.
const isOdd = ( number ) => {
  return ( number % 2 === 1 );
}

