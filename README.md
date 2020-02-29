# TapTitain_Project


Node.js
MVC框架

## 待辦清單
* 利用bcrypt加密密碼
* 隨機道具
* 關卡切換
* 技能實作
* 金幣掉落動畫
* 成就系統
-------------------
* 技能升級btn未完成
-------------------
* Cog面板
* 調整active skill畫面位置
* 資料庫設計
* 異生物繪圖
* 完整串接前後端
* 儲值頁面要新增CAPTCHA驗證碼
* 怪物數值計算
* 怪物距離boss數量

## 等待修改的bug


## 處理完的bug
1. active skill　若技能等級不為0　應直接顯示
2. resize 後 active skill圖示會消失
3. 怪物hp=0時 點擊會出現undefined
4. upATK在act_Btn失效 -->忘記修改monster.hplose參數
5. 怪物重生之後 atkAmount會變回20  -->忘了修改mosnter底下testSK to testSK2

## 思考問題點
* 當技能等級為0，其對應冷卻值應為？
* 對Me.LV console時 會出現 undefined

## 目前進度
* skill目前可以倒數計時
* 現有金幣顯示
* skill現在可以顯示可升級的技能