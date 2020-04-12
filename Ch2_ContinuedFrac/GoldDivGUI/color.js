
const gRandomColorArray = [];

// Change all colors in the array
const changeColor = () => {

  gRandomColorArray.forEach( ( element, index ) => {
    gRandomColorArray[ index ] = random( 100 );
  });

}

// Draw colored rect
const drawColorRect = ( xPos, yPos, width, height, count ) => {

  if ( gRandomColorArray.length <= count ){
    gRandomColorArray.push( random( 100 ) );
  }

  if( isEnableMondrian() ){
    setMondrianColor( gRandomColorArray[ count ] );
  }else{    
    // fill( color( gRandomColorArray[ count ], 100, 100 ) );
    fill( color( gRandomColorArray[ count ], 40, 100 ) );
    strokeWeight( 1 );
  }

  rect( xPos, yPos, width, height );
  
}

// Set color from Mondrian color palette 
const setMondrianColor = ( randomValue ) => {

  let mondrianColor;

  if( randomValue < 15 ){
    mondrianColor = color( 0, 100, 100 );
  }else if( randomValue < 30 ){
    mondrianColor = color( 67, 100, 100 );
  }else if( randomValue < 45 ){
    mondrianColor = color( 17, 100, 100 );
  }else if( randomValue < 50 ){
    mondrianColor = color( 0, 100, 0 );
  }else if( randomValue < 70 ){
    mondrianColor = color( 0, 0, 90 );
  }else{
    mondrianColor = color( 0, 0, 100 );
  }

  fill( mondrianColor );
  strokeWeight( 5 );

}
