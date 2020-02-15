// //RWD係數 -->寬度係數不同
// var SkillDx = 0;
// //y軸位置之後要調整 -->目前依賴怪物位置
// var SkillDy = RwdDy + RwdDw * 1.2 + ChaDh;
// var SkillDw = canvas.width;
// //高度之後要調整 -->目前依賴寬度
// var SkillDh = canvas.width /12;


//-------------簡單版技能-------------
// var skillFlag = true;

// function flagOfSkill(){    
//     (skillFlag)? skill_1():0;
// }

// function skill_1(){
//     Me.ATK +=10;
//     skillFlag = false;
// }



//-------------進階版技能-------------
// skillObject 可以直接改成陣列
// e.g. (skillObject => 陣列[0] ; 呼叫函數變成 陣列[0].SkillContent)
// 再利用迴圈把每一個技能每次都做確認
//需要使用jquery改變按鈕樣式,文字內容



//尚需要加上等級上限在函數中 ...(this.SkillLevel <= this.maxLevel)?  
var skillObject = {
    SkillLevel : 0,
    LevelUpCondition_Hero : [0, 20, 40],
    LevelUpCondition_Spend : [100, 120, 150],
    SkillMatch: function(){
        if(this.LevelUpCondition_Hero[this.SkillLevel] <= Me.LV && this.LevelUpCondition_Spend[this.SkillLevel] <= Me.Coin){
            this.flag = true;
        } else {this.flag =false;}
    },
    flag: false
}



//index btn升級技能
function SkillLevelUp(){
    if(skillObject.flag){
         skillObject.SkillLevel += 1;
         Me.ATK += 10; //測試
         //show 主動技能的btn
        //主動技能實質內容是寫在另外的地方
        //這邊不是npc的被動技能
        //Me.coin扣掉 skillObject.LevelUpCondition_Spend  
    };
}


//主動技能 的 技能實質內容
function skillRealContent(){
    

}