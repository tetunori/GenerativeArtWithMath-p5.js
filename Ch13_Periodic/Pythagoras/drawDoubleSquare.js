
const drawDoubleSquare = ( vectorArray ) => {

  const indDomain = [
    [ [ 0, 1, 5 ], [ 4, 6, 2, 3 ], [ 3, 7, 8 ] ],
    [ [ 1, 5, 6 ], [ 0, 4, 7, 8 ] ]
  ];

  for( let index = 0; index < 2; index++ ){

    for( const indArray of indDomain[ index ] ){

      push();

        fill( gColorArray[ index ] );
        beginShape();

          noStroke();
          for( const element of indArray ){

            const vector = vectorArray[ element ];
            vertex( vector.x, vector.y );

          }

        endShape( CLOSE );
        
      pop();

    }

  }

}
