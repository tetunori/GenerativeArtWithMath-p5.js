
// Get Greatest Common Divisor of a and b
const getGCD = ( a, b ) => {

  // Use Euclidean Algorithm

  let dividend = Math.max( a, b );
  let divisor = Math.min( a, b );
  let itr = 0;

  while( 1 ){
    
    itr++;
    const quotient = Math.floor( dividend / divisor );
    const remainder = dividend % divisor;
    console.log( itr + ': ' + dividend + ' / ' + divisor + 
                    ' = ' +  quotient + ' ... ' +  remainder );
    
    dividend = divisor;
    divisor = remainder;

    if( remainder <= 0 ){
      break;
    }

  }

  // This is the GCD.
  console.log( 'Greatest Common Devisor of ' + 
               a + ' and ' + b + ' is ' + dividend );
  return dividend;

}

getGCD( 10, 6 );


// Task 1.1
getGCD(  6,  9 ); // (1)
getGCD(  6, 15 ); // (2)
getGCD( 21, 17 ); // (3)
getGCD( 18, 20 ); // (4)
