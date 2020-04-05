
const drawEdge = ( vectorArray ) => {

  const indLine = [
    [ 0, 6 ], [ 1, 5 ], [ 3, 4 ], [ 7, 8 ] 
  ];

  for( const indArray of indLine ){

    beginShape();

      for( const element of indArray ){

        const vector = vectorArray[ element ];
        vertex( vector.x, vector.y );

      }

    endShape( CLOSE );

  }
  
}
