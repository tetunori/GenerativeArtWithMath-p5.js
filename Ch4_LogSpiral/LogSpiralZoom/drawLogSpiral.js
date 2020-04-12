
const drawLogSpiral = ( width, height ) => {

  let theta = 0;
  const scalar = Math.pow( 10, getPointerX() / width ) * height / 2;
  const step = 2 * Math.PI * 0.01;

  translate( width / 2, height / 2 );

  for( let index = 0; index < 2000; index++ ){
    
    const lineX1 = scalar * rad( theta ) * Math.cos( theta );
    const lineY1 = scalar * rad( theta ) * Math.sin( theta );
    const lineX2 = scalar * rad( theta + step ) * Math.cos( theta + step );
    const lineY2 = scalar * rad( theta + step ) * Math.sin( theta + step );
    line( lineX1, lineY1, lineX2, lineY2 );

    theta -= step;

  }

}

const getPointerX = () => {

  if( touches[0] ){
    return touches[0].x;
  }else{
    return mouseX;
  }

}

// Calcurate radian
const rad = ( angle ) => { return Math.pow( 1.1, angle ); }
