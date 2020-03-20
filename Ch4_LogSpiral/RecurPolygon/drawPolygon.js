
const drawPolygon = ( vectors, gon ) => {

  for( let index = 0; index < gon; index++ ){
  
    line( vectors[ index ].x, 
          vectors[ index ].y, 
          vectors[ ( index + 1 ) % gon ].x, 
          vectors[ ( index + 1 ) % gon ].y );

  }

}
