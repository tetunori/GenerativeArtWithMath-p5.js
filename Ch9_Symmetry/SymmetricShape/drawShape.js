
const drawShape = () => {

  // Initialize control point array
  controlPoints = [];

  // fill( color( random(100), 100, 100 ) );
  fill( color( random(100), 40, 100 ) );
  stroke( 'black' );
  strokeWeight( 1 );

  push();

    translate( WIDTH / 2, HEIGHT / 2 );

    for( let idReflection = 0; idReflection < 2; idReflection++ ){

      for( let idRotation = 0; idRotation < gGon; idRotation++ ){

        push();

          // Consider reflection
          scale( 1, Math.pow( -1, idReflection )  );

          // Consider rotation
          rotate( idRotation * 2 * Math.PI / gGon );

          // Draw Curve
          drawCurve();

        pop();

      }

    }

  pop();

}

const drawCurve = () => {

  const vectors = [];

  for( let index = 0; index < 2; index++ ){
    
    let newVector = p5.Vector.fromAngle( index * Math.PI / gGon );
    newVector.mult( WIDTH / 2 );
    vectors.push( newVector );

  }

  for( let index = 0; index < 4; index++ ){

    const newVector = p5.Vector.mult( vectors[ Math.floor( index / 2 ) ], random( 1 ) );
    controlPoints.push( newVector );

  }

  beginShape();
    vertex( 0, 0 );
    vertex( controlPoints[ 0 ].x, controlPoints[ 0 ].y );
    bezierVertex(  
          controlPoints[ 1 ].x, controlPoints[ 1 ].y,
          controlPoints[ 2 ].x, controlPoints[ 2 ].y,
          controlPoints[ 3 ].x, controlPoints[ 3 ].y );
  endShape( CLOSE );

}
