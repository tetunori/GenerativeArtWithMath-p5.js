
let gColorCount = 0;
const initColorCount = () => { gColorCount = 0; }

const gRandomColorArray = [];

// Set Color for each count
const setColor = () => {
  
  // If new element found, add a random color. 
  if( gRandomColorArray.length <= gColorCount ){
    gRandomColorArray.push( random( 100 ) );
  }
  
  fill( color( gRandomColorArray[ gColorCount ], 100, 100 ) );
  gColorCount++;
  
}

// Change all colors in the array
const changeColor = () => {

  gRandomColorArray.forEach( ( element, index ) => {
    gRandomColorArray[ index ] = random( 100 );
  });

}
