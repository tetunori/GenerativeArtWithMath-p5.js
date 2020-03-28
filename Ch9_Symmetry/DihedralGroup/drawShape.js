
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

    // Draw Gon Number
    drawGonNumber();
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
    rotate( gRotationParameter * 2 * Math.PI / gGon );

    // Draw Image
    image( gImage, 0, 0 );

  pop();

}

// Draw Dihedral
const drawDihedral = ( scalar ) => {

  noFill();
  beginShape();

    for( let idVertex = 0; idVertex < gGon; idVertex++ ){

      const vector = p5.Vector.fromAngle( 2 * Math.PI * idVertex / gGon );
      vector.mult( scalar );
      vertex( vector.x, vector.y );

    }

  endShape( CLOSE );

}

// Draw Numbers
const drawNumbers = ( scalar ) => {

  fill( color( 'white' ) );
  textSize( 20 );

  for( let idVertex = 0; idVertex < gGon; idVertex++ ){

    // Calcurate position
    const indexNumber = ( gReflectionParameter * idVertex - gRotationParameter + 2 * gGon ) % gGon;
    const vector = p5.Vector.fromAngle( 2 * Math.PI * idVertex / gGon );
    vector.mult( scalar );
    
    // Draw text
    text( indexNumber, vector.x, vector.y );

  }

}
