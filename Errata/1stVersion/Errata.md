# Errata for 1st version( 2019/05/01 ).

# Chapter 1
## 1-1. P.055
### 1-1-1. **Figure 1.6** :  
`numA = 12, numB = 17`  
=>  
`numA = 17, numB = 12`  

## 1-2. P.064
The figure of the case `thr = 320` seems to be wrong and a correct figure is like below.   
<img src="./images/1-2.png" width="300px">

## 1-3. Ch1_Euclid::RecurDivSquare
### 1-3-1. divRect.pde::Line 9
To be accurate, this comparison needs to take the round-off error into accont as Line 12 or 18.  
So, change as  
`while (wd > thr){`  
=>  
`while (wd > thr + 0.1){`  
or normalize `wd` before this comparison.

Interestingly, this fix causes the change of Figure 1.10 case `thr = 40`.
I think both images are beautiful so I don't think this issue has to be fixed😉. 

### 1-3-2. mouseClicked.pde::Line 9
`ratio = (float) numA / numB;`  
=>  
`ratio = (float) numB / numA;`

## 1-4. Ch1_Euclid::RecurDivSquareGUI
### 1-4-1. divSq.pde::Line 9
Same as 1-3-1.

## 2-1. Ch2_ContinuedFrac::Mondrian
### 2-1-1. division.pde::Line 5, Line 33
Same as 1-3-1.

## 2-2. Ch2_ContinuedFrac::GoldDivGUI
### 2-2-1. division.pde::Line 5, Line 33
Same as 1-3-1.

### 2-2-2. color.pde::Line 18
If the function name `changeCol()` is correct,  
`rand1[i] = random(1);`  
seems to be unnecessary to me because this causes the replacement of squares/rects in addition to the change of the color.  
If the current behavior is correct, we should change function's name like below.
`changeCol()` 
=>
`reload()` etc..
(I think the former is a better idea because we are in the file "color.pde".)

## 3-1. Ch3_Fibonacci::P.086
### 3-1-1. Fomula in the middle of this page
<img src="./images/3-1-1_before.png" width="200px"><BR>
=>  
<img src="./images/3-1-1_after.png" width="200px">

## 3-2. Ch3_Fibonacci::Rect
### 3-2-1. Rect.pde::Line 1
`int[] fibo = {0,1,1};`  
=>  
`int[] fibo = {0,1,1,2};`  
Beucase we don't have to access to index 0.

## 3-3. Ch3_Fibonacci::P.094
### 3-3-1. Figures in 3.10
All of the figures seem to be wrong.  
The correct figures are the following ones.  
| Case | Figure |
| :-: | :-: |
| num =  5, thr =  1 | <img src="./images/3-3-1-1.png" width="300px"> |
| num =  7, thr =  2 | <img src="./images/3-3-1-2.png" width="300px"> |
| num =  9, thr = 13 | <img src="./images/3-3-1-3.png" width="300px"> |
| num = 11, thr =  4 | <img src="./images/3-3-1-4.png" width="300px"> |

## 5-1. Ch5_FermatSpiral::FermatSpiralLine
### 5-1-1. drawRealCurve.pde::Line 1-7
In `drawLine()`, the result shapes seems to be wrong if the specified `n` is an odd number.  
So we should replace like below: 
```
  for(int i = 0; i <= n / 2; i++){
      ......
    line(v.x, v.y, -v.x, -v.y);
  }
```
=>  
```
  for(int i = 0; i < n; i++){
      ......
    line(v.x, v.y, 0, 0);
  }
```

## 5-2. Ch5_FermatSpiral::P.124, 125
### 5-2-1. Figure 5.8, 5.9, 5.10
The name of the code is wrong.  
`FermatSpiral`  
=>  
`FermatSpiral2`

