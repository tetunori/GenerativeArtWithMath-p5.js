
const triangularDivision = () => {

  let nextT = [];
  let nextF = [];

  push();
    
    translate( WIDTH / 2, HEIGHT / 2 );

    fill( gColorArray[ 0 ] );
    for( triInstance of gListT ){

      triInstance.drawTriangle();
      if( ( gModeDivision === DIV_MODE_TSFL ) || 
            ( gModeDivision === DIV_MODE_TSFS ) ){
        triInstance.divThinS( nextT, nextF );
      }else{
        triInstance.divThinL( nextT, nextF );
      }

    }

    fill( gColorArray[ 1 ] );
    for( triInstance of gListF ){

      triInstance.drawTriangle();
      if( ( gModeDivision === DIV_MODE_TSFL ) || 
            ( gModeDivision === DIV_MODE_TLFL ) ){
        triInstance.divFatL( nextT, nextF );
      }else{
        triInstance.divFatS( nextT, nextF );
      }

    }

    gListT = nextT;
    gListF = nextF;

  pop();

  clipCanvas();

}

const clipCanvas = () => {

  push();
    noStroke();
    rect( WIDTH, 0, WIDTH + WIDTH_EXT, HEIGHT );
  pop();

}
