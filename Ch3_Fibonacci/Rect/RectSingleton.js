
const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  showLatestFibonacciValue();
  noLoop();

}

function draw() {
  
  // Traslate effect will never be reset in this code
  translate( WIDTH / 2, HEIGHT / 2 );

  // Initial drawing
  drawRect( WIDTH ); 
  
}

function mouseClicked() {
  
  // Generate next Fibonacci number
  getNextFibonacci( true );

  // Then draw spiral square
  drawRect( WIDTH );

  // Show some values on console
  showLatestFibonacciValue();

}

// Draw rects with spiral
const drawRect = ( width ) => {

  let xPos = 0;
  let yPos = 0;
  const scalar = width / ( 2 * getLatestFibonacciNum() );

  background( 'white' );

  const targetArray = gArrayFibonacci;
  targetArray.forEach( ( element, index ) => {

    if( ( index > 0 ) && ( index < targetArray.length - 1 ) ){

      const previousIndex = index - 1;
      const nextIndex = index + 1;

      // Change the colors in order
      // fill( ( 10 * index ) % 100, 100, 100 );
      fill( ( 10 * index ) % 100, 40, 100 );

      // Draw rect
      rect( scalar * xPos, scalar * yPos,
              scalar * getSign( nextIndex ) * targetArray[ previousIndex ],
                scalar * getSign( index )  * element );

      // Shift position
      if( isOdd( index ) ){
        xPos += getSign( index ) * ( element + targetArray[ previousIndex ] );
      }else{
        yPos += getSign( index ) * ( element + targetArray[ nextIndex ] );
      }

    }
    
  });

}

// Return appropriate sign value against index
const getSign = ( index ) => {

  const signArray = [ -1, 1, 1, -1 ];
  return signArray[ index % 4 ];

} 

// Show latest Fibonacci number
const gArrayFibonacci = [ 0, 1, 1, 2 ];
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

