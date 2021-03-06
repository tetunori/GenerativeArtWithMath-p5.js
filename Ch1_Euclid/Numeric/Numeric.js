
let gNumA = 10;
let gNumB =  6;

const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  setupController( gNumA, gNumB );
    
  // Task 1.1
  // getGCD(  6,  9 ); // (1)
  // getGCD(  6, 15 ); // (2)
  // getGCD( 21, 17 ); // (3)
  // getGCD( 18, 20 ); // (4)
  
}

function draw() {
  
  background( color( 'white' ) );
  
  gNumA = getSliderNumAValue();
  gNumB = getSliderNumBValue();

  drawControllerCaptions();

  getGCD( gNumA, gNumB );

}


// Get Greatest Common Divisor of a and b
const getGCD = ( a, b ) => {

  // Use Euclidean Algorithm

  let dividend = Math.max( a, b );
  let divisor = Math.min( a, b );
  let itr = 0;
  let resultText = '';

  while( 1 ){
    
    itr++;
    const quotient = Math.floor( dividend / divisor );
    const remainder = dividend % divisor;
    const text = itr + ': ' + dividend + ' / ' + divisor + 
                  ' = ' +  quotient + ' ... ' +  remainder + '\n';
    // console.log( text );
    resultText += text;
    
    dividend = divisor;
    divisor = remainder;

    if( remainder <= 0 ){
      break;
    }

  }

  // This is the GCD.
  resultText += 'Greatest Common Devisor of ' + 
                        a + ' and ' + b + ' is ' + dividend + '\n';
  // console.log( resultText );
  showText( resultText );

  return dividend;

}

