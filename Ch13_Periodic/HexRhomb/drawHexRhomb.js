
const drawHexRhomb = ( colorArray ) => {

  const vectorArray = [];
  for( let index = 0; index < 6; index++ ){

      const vector = p5.Vector.fromAngle( Math.PI * index / 3 );
      vector.mult( scalar / Math.sqrt( 3 ) );
      vectorArray.push( vector );

  }

  drawRhomboid( vectorArray, colorArray );

}
