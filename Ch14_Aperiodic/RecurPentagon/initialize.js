
const initialize = ( scalar ) => {

  gColor = getRandomColor();

  const vector0 = createVector( 0, 0 );
  const vector1 = createVector( scalar, 0 );
  gListPent.push( new Pent( vector0, vector1 ) );

}

// Get random color
const getRandomColor = () => {
  return color( random( 100 ), 100, 100 );
}
