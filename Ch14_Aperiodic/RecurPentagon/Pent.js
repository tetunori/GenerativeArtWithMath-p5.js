
class Pent {

  constructor( v0, v1 ) {
    
    this.PHI = ( 1 + Math.sqrt( 5 ) ) / 2;
    this.v_ = [];
    const v_ = this.v_;
    v_.push( v0 );
    for( let index = 1; index < 6; index++ ){

      v_.push( p5.Vector.sub( v1, v0 ) );
      v_[ index ].rotate( 2 * index * Math.PI / 5 );
      v_[ index ].add( v0 );

    }
    
  }

  divPent( nextList ) {
    
    const v_ = this.v_;
    let vector = p5.Vector.sub( v_[ 1 ], v_[ 0 ] );
    vector.mult( this.PHI / ( 2 * this.PHI + 1 ) );
    vector.rotate( Math.PI / 5 );
    vector.add( v_[ 0 ] );
    
    nextList.push( new Pent( v_[ 0 ], vector ) );

    for( let index = 1; index < 6; index++ ){

      vector = p5.Vector.sub( v_[ index ], v_[ 0 ] );
      vector.mult( ( this.PHI + 1 ) / ( 2 * this.PHI + 1 ) );
      vector.add( v_[ 0 ] );

      nextList.push( new Pent( vector, v_[ index ] ) );

    }

  }

  drawPent() {

    const v_ = this.v_;
    
    beginShape();

      for( let index = 1; index < 6; index++ ){
        
        const vector = v_[ index ];
        vertex( vector.x, vector.y );

      }

    endShape( CLOSE );
    
  }

}
