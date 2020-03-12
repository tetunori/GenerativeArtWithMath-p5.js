
const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  textSize(15);
  controller();
  
}

let numDrawnRect = 0;
let threashold = 160;
let numA = 10;
let numB =  6;
let ratio = numB / numA;

function draw() {

  background( 1, 0, 1 );
  ratio = numB / numA;
  numDrawnRect = 0;

  if( ratio != 1 ){
    divSquare( 0, 0, WIDTH );
  }

  drawControllerCaptions();
  
}

// Divide a square whose length is width at ( xPosition, yPosition ) with some rectangles whose ratio is numA:numB.
const divSquare = ( xPosition, yPosition, wd ) => {

  let squareWidth = wd;
  let xPos = xPosition;
  let yPos = yPosition;
  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth + yPos;
  let itr = 0;

  setColor();
  rect( xPos, yPos, squareWidth, squareWidth );

  while( squareWidth > threashold ){

    itr++;
    if( !isEven( itr ) ){

      while( xPos + squareWidth * ratio < xEndPos + 0.1 ){
        
        divRect( xPos, yPos, squareWidth * ratio );
        xPos += squareWidth * ratio;

      }
      squareWidth = xEndPos - xPos;

    }else{

      while ( yPos + squareWidth / ratio < yEndPos + 0.1 ){

        divRect( xPos, yPos, squareWidth );
        yPos += squareWidth / ratio;
        
      }
      squareWidth = yEndPos - yPos;

    }

  }

}

// Divide a rectangle whose width is 'width' at ( xPosition, yPosition ) with some squares.
const divRect = ( xPosition, yPosition, wd ) => {

  let squareWidth = wd;
  let xPos = xPosition;
  let yPos = yPosition;
  const xEndPos = squareWidth + xPos;
  const yEndPos = squareWidth / ratio + yPos;
  let itr = 0;

  setColor();
  rect( xPos, yPos, squareWidth, squareWidth / ratio );

  while( squareWidth > threashold ){

    itr++;
    if( isEven( itr ) ){

      while( xPos + squareWidth < xEndPos + 0.1 ){

        divSquare( xPos, yPos, squareWidth );
        xPos += squareWidth;

      }
      squareWidth = xEndPos - xPos;

    }else{

      while ( yPos + squareWidth < yEndPos + 0.1 ){

        divSquare( xPos, yPos, squareWidth );
        yPos += squareWidth;
        
      }
      squareWidth = yEndPos - yPos;

    }

  }

}

// The number is even or not.
const isEven = ( number ) => {
  return ( number % 2 === 0 );
}


const rand = [];
const setColor = () => {
  
  if( rand.length <= numDrawnRect ){
    rand.push( random( 100 ) );
  }
  
  fill( color( rand[ numDrawnRect ], 100, 100 ) );
  numDrawnRect++;
  
}

const changeColor = () => {

  rand.forEach( ( element, index ) => {
      rand[ index ] = random( 100 );
  });

}

const captureImage = () => {
  const namePNG = '' + numA + '_' + numB + '.png';
  saveCanvas( namePNG, 'png' );
}

let sliderNumA;
let sliderNumB;
let sliderThreashold;
const controller = () => {

  sliderNumA = createSlider( 1, 40, 10 );
  sliderNumA.position( 10, 10 );

  sliderNumB = createSlider( 1, 40, 10 );
  sliderNumB.position( 10, 50 );

  sliderThreashold = createSlider( 1, 40, 10 );
  sliderThreashold.position( 10, 90 );

  const btChangeColor = createButton('CHANGE COLOR');
  btChangeColor.position( 10, 130 );
  btChangeColor.size( 130, 20 );
  btChangeColor.mousePressed( changeColor );

  const btCaptureImage = createButton('CAPTURE IMAGE');
  btCaptureImage.position( 10, 170 );
  btCaptureImage.size( 130, 20 );
  btCaptureImage.mousePressed( captureImage );

}

const drawControllerCaptions = () => {
  fill( color('rgba( 0, 0, 0, 0.7)') );
  rect( 0, 0, sliderNumA.x * 2 + sliderNumA.width + 125 , 205);
  fill( 255 );
  text('numA: ' + sliderNumA.value(), sliderNumA.x * 2 + sliderNumA.width, 25);
  text('numB: ' + sliderNumB.value(), sliderNumB.x * 2 + sliderNumB.width, 65);
  text('Threashold: ' + sliderThreashold.value(), sliderThreashold.x * 2 + sliderThreashold.width, 105);
}