
const makeLattice = () => {

  const m = Math.ceil( gNum / gBaseVectors[ 1 ].x );

  for( let idRow = 0; idRow <= gNum; idRow++ ){

    const vectorArray = [];
    for( let idColumn = 0; idColumn <= m; idColumn++ ){

      const vector = p5.Vector.mult( gBaseVectors[ 0 ], idRow * scalar );
      vector.add( p5.Vector.mult( gBaseVectors[ 1 ], idColumn * scalar ) );
      vectorArray.push( createVector( vector.x, vector.y % Math.floor( HEIGHT + scalar ) ) );
    
    }
    gLatticePoints.push( vectorArray );
  
  }

  // console.log( gLatticePoints );

}
