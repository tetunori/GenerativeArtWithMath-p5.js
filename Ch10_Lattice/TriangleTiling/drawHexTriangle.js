
// Draw 6 triangles generated from a hexagon
const drawHexTriangle = () => {

    for( let index = 0; index < 6; index++ ){

      push();

        fill( getRandomColor() );

        const vector = p5.Vector.fromAngle( Math.PI * index / 3 + Math.PI / 6 );
        vector.mult( scalar / Math.pow( Math.sqrt( 3 ), 2 ) );
        translate( vector.x, vector.y ) ;
        rotate( Math.PI * index );

        drawTriangle();
        
      pop();

    }


}

// Draw single triangle
const drawTriangle = () => {

  beginShape();

    for( let index = 0; index < 3; index++ ){

      const vector = p5.Vector.fromAngle( 2 * Math.PI * index / 3 + Math.PI / 2 );
      vector.mult( scalar / Math.pow( Math.sqrt( 3 ), 2 ) );
      vertex( vector.x, vector.y );

    }

  endShape( CLOSE );

}

// Get random color
const getRandomColor = () => {
  // return color( random( 100 ), 100, 100 );
  return color( random( 100 ), 40, 100 );
}
