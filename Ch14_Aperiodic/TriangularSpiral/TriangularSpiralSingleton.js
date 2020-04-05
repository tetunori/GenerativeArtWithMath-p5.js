
let gRadianEnd = 7 * Math.PI / 5;

const WIDTH = 500;
const HEIGHT = 500;

let gTriInstance;

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( mouseClicked );
  background( 'silver' );

  initialize( 200 );
  goldenDivision();

}

function draw() {}

function mouseClicked() {
  goldenDivision();
}

const initialize = ( scalar ) => {

  const vectorArray = [];
  let vector = p5.Vector.fromAngle( 3 * Math.PI / 2 );
  vector.mult( scalar );
  vectorArray.push( vector );

  vector = p5.Vector.fromAngle( 7 * Math.PI / 10 );
  vector.mult( scalar );
  vectorArray.push( vector );  

  vector = p5.Vector.fromAngle( 3 * Math.PI / 10 );
  vector.mult( scalar );
  vectorArray.push( vector );

  gTriInstance = new Tri( vectorArray );

}

const goldenDivision = () => {

  push();
    
    translate( WIDTH / 2, HEIGHT / 2 );
    gTriInstance.drawTriangle()
    gTriInstance.updateThinS();
    gRadianEnd = gTriInstance.drawArc( gRadianEnd );

  pop();

}

class Tri {

  constructor( vectorArray ) {
    
    this.PHI = ( 1 + Math.sqrt( 5 ) ) / 2;
    this.v_ = vectorArray;
    
  }

  updateThinS() {
    
    const v_ = this.v_;
    const vector3 = p5.Vector.sub( v_[ 0 ], v_[ 2 ] );
    vector3.mult( 2 - this.PHI );
    vector3.add( v_[ 2 ] );
    v_[ 0 ] = v_[ 1 ];
    v_[ 1 ] = v_[ 2 ];
    v_[ 2 ] = vector3;

  }

  drawTriangle() {

    const v_ = this.v_;
    triangle( v_[ 0 ].x, v_[ 0 ].y, 
              v_[ 1 ].x, v_[ 1 ].y, 
              v_[ 2 ].x, v_[ 2 ].y );
    
  }

  drawArc( radianEnd ) {

    const v_ = this.v_;
    const diameter = 2 * p5.Vector.dist( v_[ 0 ], v_[ 2 ] );
    const radianStart = radianEnd - 3 * Math.PI / 5;
    noFill();
    
    arc( v_[ 2 ].x, v_[ 2 ].y, 
            diameter, diameter, radianStart, radianEnd );

    return radianStart;

  }

}
