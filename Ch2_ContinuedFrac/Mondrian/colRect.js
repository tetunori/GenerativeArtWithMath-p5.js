
// Draw colored rect
const colorRect = ( xPos, yPos, width, height ) => {

  let mondrianColor;
  const randomValue = random( 100 );

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
  rect( xPos, yPos, width, height );

}
