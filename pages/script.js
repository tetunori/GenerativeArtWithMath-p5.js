
jQuery(function($) {
  var $bodyEl = $('body'),
      $sidedrawerEl = $('#sidedrawer');
  
  
  // ==========================================================================
  // Toggle Sidedrawer
  // ==========================================================================
  function showSidedrawer() {
    // show overlay
    var options = {
      onclose: function() {
        $sidedrawerEl
          .removeClass('active')
          .appendTo(document.body);
      }
    };
    
    var $overlayEl = $(mui.overlay('on', options));
    
    // show element
    $sidedrawerEl.appendTo($overlayEl);
    setTimeout(function() {
      $sidedrawerEl.addClass('active');
    }, 20);
  }
  
  
  function hideSidedrawer() {
    $bodyEl.toggleClass('hide-sidedrawer');
  }
  
  
  $('.js-show-sidedrawer').on('click', showSidedrawer);
  $('.js-hide-sidedrawer').on('click', hideSidedrawer);
  
  
  // ==========================================================================
  // Animate menu
  // ==========================================================================
  var $titleEls = $('strong', $sidedrawerEl);
  
  $titleEls
    .filter(filterFunc)
    .next()
    .hide();
  
  function filterFunc( index ){
    return ( CHAPTER_NUM - 1 ) !== index;
  }

  $titleEls.on('click', function() {
    $(this).next().slideToggle(280);
  });
});

window.onload = () => {

  setNavigatorText();
  setContent();
  setSideDrawer();
  
}

const setNavigatorText = () => {
  
  const navigatorChapter1 = document.getElementById( 'navigatorChapter1' );
  navigatorChapter1.innerText = 'Chapter ' + CHAPTER_NUM;
  navigatorChapter1.href = '/pages/' + directoryNameArray[ CHAPTER_NUM ] + '-' + 
                                  codeNameArray[ CHAPTER_NUM ][ 0 ] + '.html'; 
  
  const navigatorChapter2 = document.getElementById( 'navigatorChapter2' );
  navigatorChapter2.innerText = navigatorChapter1.innerText;
  navigatorChapter2.href = navigatorChapter1.href

  const navigatorCodeName = document.getElementById( 'navigatorCodeName' );
  navigatorCodeName.innerText = codeNameArray[ CHAPTER_NUM ][ CODE_INDEX ];
  navigatorCodeName.href = '/pages/' + directoryNameArray[ CHAPTER_NUM ] + '-' + 
                                codeNameArray[ CHAPTER_NUM ][ CODE_INDEX ] + '.html'; 
  
}

const setContent = () => {
  
  const titleName = document.getElementById( 'titleName' );
  titleName.innerText = codeNameArray[ CHAPTER_NUM ][ CODE_INDEX ];

  const canvasFrame = document.getElementById( 'canvasFrame' );
  canvasFrame.src = '/' + directoryNameArray[ CHAPTER_NUM ] + '/' + 
                                  codeNameArray[ CHAPTER_NUM ][ CODE_INDEX ] + '/';

}

const setSideDrawer = () => {

  const sideDrawerContent = document.getElementById( 'sideDrawerContent' );
  const sideDrawerChapters = sideDrawerContent.children[ CHAPTER_NUM - 1 ];
  const sideDrawerCodes = sideDrawerChapters.children[ 1 ];
  const targetCode = sideDrawerCodes.children[ CODE_INDEX ];
  const targetItem = targetCode.children[ 0 ];
  // console.log( targetItem );

  targetItem.className = 'active';
  // console.log( targetItem );

}


const chapt1CodeNameArray =
[
  'DivRect', 
  'DivRectColor', 
  'DivSquare', 
  'DivSquareRecorder', 
  'Numeric', 
  'RectDivRect', 
  'RecurDivSquare', 
  'RecurDivSquareGUI '
]; 

const chapt2CodeNameArray =
[
  'DivRect', 
  'DivRectZoom', 
  'DivSquare', 
  'GoldDivGUI', 
  'Mondrian', 
  'RecurDivSquare'
];

const chapt3CodeNameArray =
[
  'Convergent', 
  'Rect', 
  'RecurDiv', 
  'RecurDivGUI', 
  'Spiral', 
  'Square', 
  'SquareSpiral'
];

const chapt4CodeNameArray =
[
  'GoldFiboSpiral', 
  'LogSpiralZoom', 
  'RecurPolygon', 
  'RecurSquare', 
  'RecurSquareSpiral', 
  'Spiral'
];

const chapt5CodeNameArray =
[
  'FermatSpiral', 
  'FermatSpiral2', 
  'FermatSpiralLine'
]; 

const chapt6CodeNameArray =
[
  'Power', 
  'PowerVar', 
  'Table', 
  'TableVar'
];

const chapt7CodeNameArray =
[
  'CA1dim', 
  'CA2dim', 
  'ElemCA', 
  'ModPascal', 
  'Pascal', 
  'StochCA'
]; 

const chapt8CodeNameArray =
[
  'MatrixCalculator', 
  'TextileGenerator', 
  'TextileRepeater'
]; 

const chapt9CodeNameArray =
[
  'CubicBezier', 
  'DihedralGroup', 
  'FundamentalDomain', 
  'HigherBezier', 
  'QuadBezier', 
  'SymmetricShape'
]; 

const chapt10CodeNameArray =
[
  'HexCA', 
  'HexTiling', 
  'SquareTiling', 
  'TriangleTiling'
];

const chapt11CodeNameArray =
[
  'IH01', 
  'IH01Koch', 
  'IH02', 
  'IH02TV08', 
  'IH02TV08Koch', 
  'IH41', 
  'IH41Koch', 
  'Koch', 
  'TV08'
];

const chapt12CodeNameArray =
[
  'P3', 
  'P31M', 
  'P3M1', 
  'P6', 
  'P6M'
]; 

const chapt13CodeNameArray =
[
  'Fibonacci', 
  'HexRhomb', 
  'Pythagoras', 
  'SquareTriangle '
];

const chapt14CodeNameArray =
[
  'PenroseTiling', 
  'RecurPentagon', 
  'RecurTriangle', 
  'TriangularSpiral '
]; 

const codeNameArray = 
[
  undefined, // Dummy
  chapt1CodeNameArray,
  chapt2CodeNameArray,
  chapt3CodeNameArray,
  chapt4CodeNameArray,
  chapt5CodeNameArray,
  chapt6CodeNameArray,
  chapt7CodeNameArray,
  chapt8CodeNameArray,
  chapt9CodeNameArray,
  chapt10CodeNameArray,
  chapt11CodeNameArray,
  chapt12CodeNameArray,
  chapt13CodeNameArray,
  chapt14CodeNameArray,
];

const directoryNameArray = 
[
  undefined, // Dummy
  'Ch1_Euclid',
  'Ch2_ContinuedFrac',
  'Ch3_Fibonacci',
  'Ch4_LogSpiral',
  'Ch5_FermatSpiral',
  'Ch6_Modular',
  'Ch7_CellAutomata',
  'Ch8_Textile',
  'Ch9_Symmetry',
  'Ch10_Lattice',
  'Ch11_Deformation',
  'Ch12_Pattern',
  'Ch13_Periodic',
  'Ch14_Aperiodic'  
];
