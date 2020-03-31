
const parameterizeTV08 = ( vector, index ) => {

  if( ( index % 3 ) === 0 ){
    vector[ index ].mult( 1 + gHorizontalParam );
  }

  if( ( index > 1 ) && ( index < 5 ) ){
    vector[ index ].add( 0, -0.5 * gVerticalParam * SCALAR / Math.sqrt( 3 ) );
  }else{
    vector[ index ].add( 0, 0.5 * gVerticalParam * SCALAR / Math.sqrt( 3 ) );
  }

  return vector[ index ];

}
