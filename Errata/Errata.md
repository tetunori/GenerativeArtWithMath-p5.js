# Errata for 1st version( 2019/05/01 ).

# Chapter 1
## 1-1. P.055
**Figure 1.6** :  
`numA = 12, numB = 17`  
=>  
`numA = 17, numB = 12`  

## 1-2. P.064
The figure of the case `thr = 320` seems to be wrong and a correct figure is like below.   
<img src="./1-2.png" width="300px">

## 1-3. Ch1_Euclid::RecurDivSquare
### divRect.pde::Line 9
To be accurate, this comparison needs to take the round-off error into accont as Line 12 or 18.  
So, change as  
`while (wd > thr){`  
=>  
`while (wd > thr + 0.1){`  
or normalize `wd` before this comparison.

Interestingly, this fix causes the change of Figure 1.10 case `thr = 40`.
I think both images are beautiful so I don't think this issue has to be fixed😉. 

## 1-4. Ch1_Euclid::RecurDivSquareGUI
### divSq.pde::Line 9
Same as 1-3.


