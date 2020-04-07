
const pentDivision = () => {

  let nextT = [];
  let nextF = [];

  push();
    
    translate( WIDTH / 2, HEIGHT / 2 );

    for( triInstance of gListT ){

      triInstance.drawPentT( gColorArray[ 0 ], gColorArray[ 1 ] );
      triInstance.divThinS( nextT, nextF );

    }

    for( triInstance of gListF ){

      triInstance.drawPentF( gColorArray[ 0 ], gColorArray[ 1 ] );
      triInstance.divFatL( nextT, nextF );

    }

    gListT = nextT;
    gListF = nextF;

  pop();

  clipCanvas();

}

const rhombDivision = () => {

  let nextT = [];
  let nextF = [];

  push();
    
    translate( WIDTH / 2, HEIGHT / 2 );

    fill( gColorArray[ 0 ] );
    for( triInstance of gListT ){

      triInstance.drawRhomb();
      triInstance.divThinS( nextT, nextF );

    }

    fill( gColorArray[ 1 ] );
    for( triInstance of gListF ){

      triInstance.drawRhomb();
      triInstance.divFatL( nextT, nextF );

    }

    gListT = nextT;
    gListF = nextF;

  pop();

  clipCanvas();

}

const kiteDartDivision = () => {

  let nextT = [];
  let nextF = [];

  push();
    
    translate( WIDTH / 2, HEIGHT / 2 );

    fill( gColorArray[ 0 ] );
    for( triInstance of gListT ){

      triInstance.drawKiteDart();
      triInstance.divThinL( nextT, nextF );

    }

    fill( gColorArray[ 1 ] );
    for( triInstance of gListF ){

      triInstance.drawKiteDart();
      triInstance.divFatS( nextT, nextF );

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
