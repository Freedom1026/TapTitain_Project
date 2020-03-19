# TapTitain_Project


Node.js
MVC框架

## 待辦清單
* 利用bcrypt加密密碼
* 隨機道具
* 關卡切換
* 金幣掉落動畫
* 成就系統
-------------------
* Me也寫一個SKOPEN 放到skillArray裡面 迴圈確認文字變更
-------------------
* Cog面板
* 技能解說面板(class內缺description)
* 基本攻擊數字面板
-------------------
* 資料庫設計
* 異生物繪圖
* 異生物技能/升級等面板
* 完整串接前後端
* 儲值頁面要新增CAPTCHA驗證碼
* 怪物數值計算
* 怪物距離boss數量

## 等待修改的bug
* 算不上BUG 但應把HSK中CLASS的function好好重新分配到底下技能(因為技能內容不同)
* resize或refresh時 技能倒數計時會重新!  --->寫進LocalStorage裡面?
* how to get LocalStorage?    --->reset裡面，但尚未完善code
* 0.1 + 0.2 類問題 所以要Math.floor



## 處理完的bug
1. active skill　若技能等級不為0　應直接顯示
2. resize 後 active skill圖示會消失
3. 怪物hp=0時 點擊會出現undefined
4. upATK在act_Btn失效 -->忘記修改monster.hplose參數
5. 怪物重生之後 atkAmount會變回20  -->忘了修改mosnter底下testSK to testSK2
6. 乘以fortune會有bug  --->變數宣告先後問題
* updateATK位置不對  --->Me.lv 和其他已調整

## 思考問題點
* 當技能等級為0，其對應冷卻值應為？   ---> 決定是0
* 對Me.LV console時 會出現 undefined

## 目前進度
* 調整panel