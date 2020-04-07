
const initialize = () => {

  background( 'white' );

  gColorArray = [];
  gColorArray.push( getRandomColor() );
  gColorArray.push( getRandomColor() );

  gListT = [];
  gListF = [];

  if( gModeInit === INIT_MODE_TRIANGLE ){
    initializeTriangle( 1200 );
  }else{
    initializeDecagon( 250 );
  }

  divide();

}

const initializeTriangle = ( scalar ) => {

  const vectorArray = [];
  let vector = p5.Vector.fromAngle( 3 * Math.PI / 2 );
  vector.mult( scalar );
  vectorArray.push( vector );

  vector = p5.Vector.fromAngle( 7 * Math.PI / 10 );
  vector.mult( scalar );
  vectorArray.push( vector );  

  vector = p5.Vector.fromAngle( 3 * Math.PI / 10 );
  vector.mult( scalar );
  vectorArray.push( vector );

  gListT.push( new Tri( vectorArray ) );

}

const initializeDecagon = ( scalar ) => {

  for( let index = 0; index < 10; index++ ){

    const vector0 = createVector( 0, 0 );

    const vector1 = p5.Vector.fromAngle( index * Math.PI / 5 );
    vector1.mult( scalar );

    const vector2 = p5.Vector.fromAngle( ( index + 1 ) * Math.PI / 5 );
    vector2.mult( scalar );

    if( ( index % 2 ) === 0 ){
      gListT.push( new Tri( [ vector0, vector1, vector2 ] ) );
    }else{
      gListT.push( new Tri( [ vector0, vector2, vector1 ] ) );
    }

  }

}

// Get random color
const getRandomColor = () => {
  return color( random( 100 ), 100, 100 );
}
