
const makeLattice = () => {

  for( let idRow = 0; idRow < gNum; idRow ++ ){

    const vectorArray = [];
    for( let idColumn = 0; idColumn < gNum; idColumn++ ){

      const vector = p5.Vector.mult( gBaseVectors[ 0 ], idRow  * gScalar );
      vector.add( p5.Vector.mult( gBaseVectors[ 1 ], idColumn * gScalar ) );
      vectorArray.push( createVector( vector.x, vector.y % HEIGHT ) );
    
    }
    gLatticePoints.push( vectorArray );
  
  }

  // console.log( gLatticePoints );

}
