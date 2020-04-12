
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

  if( CHAPTER_NUM !== 0 ){

    setNavigatorText();
    setContent();
    setSideDrawer();
    setSourceIcons();
    
  }

  // For getting file names
  // directoryNameArray.forEach( ( element, index ) => {

  //   if( element !== undefined ){

  //     for( const code of codeNameArray[ index ] ){
  //       console.log( '' + element + '-' + code );
  //     }

  //   }

  // });

}

const setNavigatorText = () => {
  
  const navigatorChapter1 = document.getElementById( 'navigatorChapter1' );
  navigatorChapter1.innerText = 'Chapter ' + CHAPTER_NUM;
  navigatorChapter1.href = './' + directoryNameArray[ CHAPTER_NUM ] + '-' + 
                                  codeNameArray[ CHAPTER_NUM ][ 0 ] + '.html'; 
  
  const navigatorChapter2 = document.getElementById( 'navigatorChapter2' );
  navigatorChapter2.innerText = navigatorChapter1.innerText;
  navigatorChapter2.href = navigatorChapter1.href

  const navigatorCodeName = document.getElementById( 'navigatorCodeName' );
  navigatorCodeName.innerText = codeNameArray[ CHAPTER_NUM ][ CODE_INDEX ];
  navigatorCodeName.href = './' + directoryNameArray[ CHAPTER_NUM ] + '-' + 
                                codeNameArray[ CHAPTER_NUM ][ CODE_INDEX ] + '.html'; 
  
}

const setContent = () => {
  
  const titleName = document.getElementById( 'titleName' );
  titleName.innerText = codeNameArray[ CHAPTER_NUM ][ CODE_INDEX ];

  const canvasFrame = document.getElementById( 'canvasFrame' );
  canvasFrame.src = '../' + directoryNameArray[ CHAPTER_NUM ] + '/' + 
                                  codeNameArray[ CHAPTER_NUM ][ CODE_INDEX ] + '/index.html';

  const chapterDesc = document.getElementById( 'chapterDesc' );
  chapterDesc.innerText = chapterDesciptionArray[ CHAPTER_NUM ];

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

const setSourceIcons = () => {

  const githubURL = 'https://github.com/tetunori/GenerativeArtWithMath-p5.js/tree/master/' + directoryNameArray[ CHAPTER_NUM ] + '/' + codeNameArray[ CHAPTER_NUM ][ CODE_INDEX ];
  const githubIcon = '<a href="' + githubURL + '" target="_blank"><img class="icons" src="./images/githubIcon.png" width="30px"></a>';

  const openProecessingURL = openProcessingURLArray[ CHAPTER_NUM ][ CODE_INDEX ];
  const openProcessingIcon = '<a href="' + openProecessingURL + '" target="_blank"><img class="icons" src="./images/openProcessingIcon.png" width="34px" target="_blank"></a>';
  
  const srcIconsElement = document.getElementById( 'srcIcons' );
  srcIconsElement.insertAdjacentHTML( 'afterbegin', githubIcon + openProcessingIcon );

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
  'RecurDivSquareGUI'
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
  'SquareTriangle'
];

const chapt14CodeNameArray =
[
  'PenroseTiling', 
  'RecurPentagon', 
  'RecurTriangle', 
  'TriangularSpiral'
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

const BASE_OPURL = 'https://www.openprocessing.org/sketch/';

const chapt1OpenProcessingURLArray =
[
  BASE_OPURL + '872029', 
  BASE_OPURL + '872030', 
  BASE_OPURL + '872031', 
  BASE_OPURL + '872032', 
  BASE_OPURL + '872033', 
  BASE_OPURL + '872034', 
  BASE_OPURL + '872035', 
  BASE_OPURL + '872036'
]; 

const chapt2OpenProcessingURLArray =
[
  BASE_OPURL + '872044', 
  BASE_OPURL + '872045', 
  BASE_OPURL + '872046', 
  BASE_OPURL + '872047', 
  BASE_OPURL + '872048', 
  BASE_OPURL + '872049'
];

const chapt3OpenProcessingURLArray =
[
  BASE_OPURL + '872061', 
  BASE_OPURL + '872062', 
  BASE_OPURL + '872063', 
  BASE_OPURL + '872064', 
  BASE_OPURL + '872065', 
  BASE_OPURL + '872066', 
  BASE_OPURL + '872067'
];

const chapt4OpenProcessingURLArray =
[
  BASE_OPURL + '872097', 
  BASE_OPURL + '872098', 
  BASE_OPURL + '872099', 
  BASE_OPURL + '872101', 
  BASE_OPURL + '872100', 
  BASE_OPURL + '872102'
];

const chapt5OpenProcessingURLArray =
[
  BASE_OPURL + '860187', 
  BASE_OPURL + '872113', 
  BASE_OPURL + '872114'
]; 

const chapt6OpenProcessingURLArray =
[
  BASE_OPURL + '872119', 
  BASE_OPURL + '872120', 
  BASE_OPURL + '872121', 
  BASE_OPURL + '872122'
];

const chapt7OpenProcessingURLArray =
[
  BASE_OPURL + '872131', 
  BASE_OPURL + '860358', 
  BASE_OPURL + '872132', 
  BASE_OPURL + '872133', 
  BASE_OPURL + '872134', 
  BASE_OPURL + '872136'
]; 

const chapt8OpenProcessingURLArray =
[
  BASE_OPURL + '872196', 
  BASE_OPURL + '872197', 
  BASE_OPURL + '862401'
]; 

const chapt9OpenProcessingURLArray =
[
  BASE_OPURL + '872205', 
  BASE_OPURL + '872206', 
  BASE_OPURL + '872207', 
  BASE_OPURL + '863917', 
  BASE_OPURL + '872209', 
  BASE_OPURL + '872210'
]; 

const chapt10OpenProcessingURLArray =
[
  BASE_OPURL + '864198', 
  BASE_OPURL + '864196', 
  BASE_OPURL + '872267', 
  BASE_OPURL + '872269'
];

const chapt11OpenProcessingURLArray =
[
  BASE_OPURL + '864665', 
  BASE_OPURL + '872285', 
  BASE_OPURL + '864676', 
  BASE_OPURL + '864770', 
  BASE_OPURL + '865467', 
  BASE_OPURL + '864285', 
  BASE_OPURL + '872286', 
  BASE_OPURL + '865476', 
  BASE_OPURL + '864273'
];

const chapt12OpenProcessingURLArray =
[
  BASE_OPURL + '872291', 
  BASE_OPURL + '872293',
  BASE_OPURL + '872292', 
  BASE_OPURL + '872294', 
  BASE_OPURL + '868162'
]; 

const chapt13OpenProcessingURLArray =
[
  BASE_OPURL + '872317', 
  BASE_OPURL + '868416', 
  BASE_OPURL + '872318', 
  BASE_OPURL + '868382'
];

const chapt14OpenProcessingURLArray =
[
  BASE_OPURL + '869692', 
  BASE_OPURL + '870527', 
  BASE_OPURL + '869134', 
  BASE_OPURL + '868513'
]; 

const openProcessingURLArray = 
[
  undefined, // Dummy
  chapt1OpenProcessingURLArray,
  chapt2OpenProcessingURLArray,
  chapt3OpenProcessingURLArray,
  chapt4OpenProcessingURLArray,
  chapt5OpenProcessingURLArray,
  chapt6OpenProcessingURLArray,
  chapt7OpenProcessingURLArray,
  chapt8OpenProcessingURLArray,
  chapt9OpenProcessingURLArray,
  chapt10OpenProcessingURLArray,
  chapt11OpenProcessingURLArray,
  chapt12OpenProcessingURLArray,
  chapt13OpenProcessingURLArray,
  chapt14OpenProcessingURLArray,
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

const chapterDesciptionArray = 
[
  undefined, // Dummy
  'Euclidean Algorithm | ユークリッドの互除法',
  'Continued Fraction | 連分数',
  'Fibonacci Sequence | フィボナッチ数列',
  'Logarithmic Spiral | 対数らせん',
  "Fermat's Spiral | フェルマーらせん",
  'Modular Arithmetic | 合同な数',
  'Cellular Automaton | セルオートマトン',
  'Pattern Generated from Matrix | 行列の織りなす模様',
  'Symmetry of Regular Polygon | 正多角形の対称性',
  'Tiling with Regular Polygon | 正多角形によるタイリング',
  'Transformation of Regular Tiling | 正則タイリングの変形',
  'Patterns with Periodicity and Symmetry | 周期性と対称性を持つ模様',
  'Periodic Tiling | 周期タイリング',
  'Semi-Periodic Tiling | 準周期タイリング'
];

