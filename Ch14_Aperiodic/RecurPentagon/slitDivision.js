
const slitDivision = () => {

  nextPent = [];
  background( 'white' );

  push();
    
    translate( WIDTH / 2, HEIGHT / 2 );
    fill( gColor );
    for( element of gListPent ){

      element.drawPent();
      element.divPent( nextPent );

    }

  pop();

  gListPent = nextPent;

}
