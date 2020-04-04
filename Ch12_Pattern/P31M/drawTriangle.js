
const drawTriangle = ( randomArray, color1, color2 ) => {

  const vector = p5.Vector.fromAngle( -Math.PI / 6 );
  vector.mult( scalar / 3 );
  translate( vector.x, vector.y );

  for( let index = 0; index < 3; index++ ){

    push();
      fill( color1 );
      rotate( 2 * Math.PI * index / 3 );
      drawLine( randomArray );
    pop();
  }

  for( let index = 0; index < 3; index++ ){

    push();
      fill( color2 );
      rotate( 2 * Math.PI * index / 3 );
      drawCurve( randomArray );
    pop();
  }

}
