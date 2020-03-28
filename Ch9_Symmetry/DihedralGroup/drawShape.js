
// Draw Shapes including wireframe, number and image.
const drawShape = ( scalar ) => {

  background( 'silver' );
  push();

    translate( WIDTH / 2, HEIGHT / 2 );

    // Draw Image
    drawImage();
    
    // Draw Dihedral wireframe
    drawDihedral( scalar );

    // Draw numbers near the vertex
    drawNumbers( scalar );

  pop();

}

// Draw Image
const drawImage = () => {

  push();

    // Center the rotation point
    imageMode( CENTER );

    // Consider reflection
    scale( 1, gReflectionParameter );

    // Consider rotation
    rotate( gRotationParameter * 2 * Math.PI / GON );

    // Draw Image
    image( gImage, 0, 0 );

  pop();

}

// Draw Dihedral
const drawDihedral = ( scalar ) => {

  noFill();
  beginShape();

    for( let idVertex = 0; idVertex < GON; idVertex++ ){

      const vector = p5.Vector.fromAngle( 2 * Math.PI * idVertex / GON );
      vector.mult( scalar );
      vertex( vector.x, vector.y );

    }

  endShape( CLOSE );

}

// Draw Numbers
const drawNumbers = ( scalar ) => {

  fill( color( 'white' ) );
  textSize( 20 );

  for( let idVertex = 0; idVertex < GON; idVertex++ ){

    // Calcurate position
    const indexNumber = ( gReflectionParameter * idVertex - gRotationParameter + 2 * GON ) % GON;
    const vector = p5.Vector.fromAngle( 2 * Math.PI * idVertex / GON );
    vector.mult( scalar );
    
    // Draw text
    text( indexNumber, vector.x, vector.y );

  }

}
