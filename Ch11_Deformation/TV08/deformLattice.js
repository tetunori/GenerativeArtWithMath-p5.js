
// Deform lattice
const deformLattice = () => {

  gLatticePoints = [];

  for( let idRow = 0; idRow < ROW + 1; idRow ++ ){

    const vectorArray = [];
    for( let idColumn = 0; idColumn < gColumnNum + 1; idColumn++ ){

      const vector = p5.Vector.mult( gBaseVectors[ 0 ], idRow  * SCALAR );
      vector.add( p5.Vector.mult( gBaseVectors[ 1 ], idColumn * SCALAR ) );
      vector.add( gHorizontalParam * SCALAR * idColumn / Math.sqrt( 3 ), 0 );
      vectorArray.push( createVector( vector.x, vector.y % Math.floor( HEIGHT + SCALAR ) ) );
    
    }
    gLatticePoints.push( vectorArray );
  
  }

}
