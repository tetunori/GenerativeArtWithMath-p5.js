
const WIDTH = 500;
const HEGITH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  showLatestFibonacciValue();
  noLoop();
  
}

function draw() { drawSpiral(); }

function mouseClicked() {
  
  // Generate next Fibonacci number
  getNextFibonacci( true );

  // Then draw spiral square
  drawSpiral();

  // Show some values on console
  showLatestFibonacciValue();

}

const drawSpiral = () => {

  const SGN = [ -1, 1, 1, -1 ];
  let xPos = 0;
  let yPos = 0;
  const scalar = WIDTH / ( 2 * getLatestFibonacciNum() );

  background( 'white' );

  // Move to the center of the window
  translate( WIDTH / 2, HEGITH / 2 );

  const targetArray = gArrayFibonacci;
  targetArray.forEach( ( element, index ) => {

    if( ( index > 0 ) && ( index < targetArray.length - 1 ) ){

      // Change the colors in order
      fill( ( 10 * index ) % 100, 100, 100 );

      // Draw rect
      rect( scalar * xPos, scalar * yPos,
              scalar * SGN[(index+1) % 4] * element, scalar * SGN[index % 4] * element );

      // Move xPos, yPos
      if( isOdd( index ) ){
        xPos += SGN[index % 4] * (element + targetArray[index + 1]);
      }else{
        yPos += SGN[index % 4] * (element + targetArray[index + 1]);
      }

    }
    
  });

}

const gArrayFibonacci = [ 0, 1, 1 ];
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

// Get latest fibonacci number
const getLatestFibonacciNum = () => {
  return gArrayFibonacci[ gArrayFibonacci.length - 1 ];
}

// The number is odd or not.
const isOdd = ( number ) => {
  return ( number % 2 === 1 );
}

