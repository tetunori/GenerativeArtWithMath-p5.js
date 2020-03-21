
let gArrayRule = [ 0, 0, 0, 1, 1, 1, 1, 0 ]; // Rule  30
// let gArrayRule = [ 0, 1, 1, 0, 1, 1, 1, 0 ]; // Rule 110

const reloadRule = () => {

  const newRule = new Array(8);
  let ruleInteger = 0;

  for( let index = 0; index < 8; index++ ){

    newRule[ index ] = getRandomInteger( 0, 2 );
    ruleInteger += newRule[ index ] * Math.pow( 2, 7 - index );

  }
  gArrayRule = newRule;
  console.log( 'Rule: ' + ruleInteger );

}

// Transit to next generation values
const transition = ( numA, numB, numC, arrayRule ) => {

  const ruleInteger = numA * Math.pow( 2, 2 ) + 
                        numB * Math.pow( 2, 1 ) + 
                          numC * Math.pow( 2, 0 );

  return arrayRule[ 7 - ruleInteger ];

}

// Get random integer between min and max
const getRandomInteger = ( min, max ) => {
  return Math.floor( random( min, max ) );
}
