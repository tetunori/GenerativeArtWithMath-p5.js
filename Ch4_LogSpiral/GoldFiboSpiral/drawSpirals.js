
// Draw squares with Fibonacci spiral
const drawFibonacciSpiral = ( width ) => {

  let xPos = 0;
  let yPos = 0;
  const scalar = width / ( 2 * getLatestFibonacciNum() );
  
  const targetArray = gArrayFibonacci;
  targetArray.forEach( ( element, index ) => {

    if( ( index > 0 ) && ( index < targetArray.length - 1 ) ){

      const nextIndex = index + 1;

      // Draw square
      const rectX = scalar * xPos;
      const rectY = scalar * yPos;
      const rectWidth = scalar * getSign( nextIndex ) * element;
      const rectHeight = scalar * getSign( index )  * element;
      rect( rectX, rectY, rectWidth, rectHeight );
      
      // Draw arc
      const arcX = rectX + rectWidth;
      const arcY = rectY + rectHeight;
      const arcWidth = scalar * 2 * element;
      const arcHeight = scalar * 2 * element;
      const arcStart = ( 1 + index ) * Math.PI / 2;
      const arcStop = arcStart + Math.PI / 2;
      arc( arcX, arcY, arcWidth, arcHeight, arcStart, arcStop );

      // Move xPos, yPos
      const shiftValue = getSign( index ) * ( element + targetArray[ nextIndex ] );

      // Shift position
      if( isOdd( index ) ){
        xPos += shiftValue;
      }else{
        yPos += shiftValue;
      }

    }
    
  });

}

// Draw squares with Gold spiral
const drawGoldSpiral = ( width ) => {

  const scalar = width / ( 2 * getLatestFibonacciNum() );
  const PHI = ( 1 + Math.sqrt( 5 ) ) / 2;
  const STEP = -Math.PI / 50;

  const vectorO = createVector( 1, 1 );
  let vectorV = createVector( 0, 1 );

  const targetArray = gArrayFibonacci;
  for( let index = 1; index < targetArray.length - 1; index++ ){

    vectorV.add( getSign( index ) * targetArray[ index ], 
                  getSign( index - 1 ) * targetArray[ index ] );
  
  }

  vectorV.sub( vectorO );
  vectorV.mult( scalar );
  translate( scalar, scalar );

  for( let index = 1; index < ( targetArray.length - 2 ) * 25; index++ ){
    
    const nextVectorV = vectorV.copy();
    nextVectorV.rotate( STEP );
    nextVectorV.mult( Math.pow( PHI, 2 * STEP / Math.PI ) );
    line( vectorV.x, vectorV.y, nextVectorV.x, nextVectorV.y );
    vectorV = nextVectorV;

  }

}

// Return appropriate sign value against index
const getSign = ( index ) => {

  const signArray = [ -1, 1, 1, -1 ];
  return signArray[ index % 4 ];

} 

// Show latest Fibonacci number
const gArrayFibonacci = [ 0, 1, 1 ];
const showLatestFibonacciValue = () => {

  const targetArray = gArrayFibonacci;
  const latestIndex = targetArray.length - 1;

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

// Get latest fibonacci number
const getLatestFibonacciNum = () => {
  return gArrayFibonacci[ gArrayFibonacci.length - 1 ];
}

// The number is odd or not.
const isOdd = ( number ) => {
  return ( number % 2 === 1 );
}

