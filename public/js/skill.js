// //RWD係數 -->寬度係數不同
// var SkillDx = 0;
// //y軸位置之後要調整 -->目前依賴怪物位置
// var SkillDy = RwdDy + RwdDw * 1.2 + ChaDh;
// var SkillDw = canvas.width;
// //高度之後要調整 -->目前依賴寬度
// var SkillDh = canvas.width /12;


//-------------技能-------------
//拿jquery去抓技能圖示 顯示技能視窗
    
    //從資料庫取得目前技能等級
    let heroSkillLevel = [1, 0, 0];
 

    $(function(){
            $.get("/home/get_test", function (e) {
                var HeroData = JSON.parse(e);
                heroSkillLevel[0] = HeroData[0].heroLv || 1 ;
                heroSkillLevel[1] = HeroData[0].heroSkLv_A || 0;
                heroSkillLevel[2] = HeroData[0].heroSkLv_B || 0;
            })
        })



    
    //補上條件符合
    function levelUp(skill,skLv){
    heroSkillLevel[skLv]++;
     //傳入參數: 技能名稱
    $(`span.${skill}`).text(`Lv.${heroSkillLevel[skLv]}`);
    if(skLv == 0){
        return;
    }
    $(`div.actSkill span:nth-child(${skLv})`).css("visibility","visible");
    }
    
    
        $('#btn_hero').click(function(){panelgo("div.heroSkill")});
        $('#btn_creature').click(function(){panelgo("div.creatureSkill")})
        
        function panelgo(pn){
            if($(pn).css("visibility") == "visible"){
                $(pn).css("visibility","hidden");
                // $(pn).css("display","none");
                }
                else{
                $(pn).css("visibility","visible")
                // $(pn).css("display","block");
                }
            }
    

//設定技能基礎值

var HSK = class HSK{
    constructor(skname, lv){
        this.skname = skname;
        this.lv = lv;
        this.SKOpenFlag = false;
        //加成係數
        this.times = 1;
        this.LvUp = [10,20,30,40,50];
        this.upSpend = [100,120,150,200,250];
        this.skTime = [30,60,90,90,90];
        this.coolTime = [180,180,600,660,720];
        this.t_A = -1;
        this.t_B = -1;
        this.timeStart = setInterval (this.timeCount , 1000);
    }
    SkOpen(){ //每秒確認....prototype連線
        if(this.LvUp[this.lv] <= Me.LV && this.upSpend[this.lv] <= Me.Coin){
            this.SKOpenFlag = true;
        }else{
            this.SKOpenFlag = flase;
        }
    }

    //click UP_BTN activation function
    Check(){
        if(this.SKOpenFlag){
            this.lv ++;
        }
    }

    //skill content at every level  ---->個別技能的內容
    Content(){
        this.upATK = [1.05,1.06,1.1,1.2,1.4]; 
    }

    //click active rounded_btn
    excute(){ //sk_a 成為參數被呼叫
        this.times = this.upATK[this.lv];
    }

    cancel(){
        this.times = 1;
    }

    //計時功能
    timeCount(){
        this.t_A = this.skTime[this.lv];
        console.log(this.skTime[this.lv]);
        this.t_B = this.coolTime[this.lv];
        if(this.t_A  > 0){
            this.t_A  --;
            if(this.t_A <= 0){
                this.t_B --;
                if(this.t_B <= 0){
                    clearInterval(this.timeStart);
                }
            }
        }
    }
    
}

var testSK = new HSK("test", 3);
testSK.timeCount();


//-------------進階版技能-------------
// skillObject 可以直接改成陣列
// e.g. (skillObject => 陣列[0] ; 呼叫函數變成 陣列[0].SkillContent)
// 再利用迴圈把每一個技能每次都做確認
//需要使用jquery改變按鈕樣式,文字內容



//尚需要加上等級上限在函數中 ...(this.SkillLevel <= this.maxLevel)?  
// var skillObject = {
//     SkillLevel : 0,
//     LevelUpCondition_Hero : [0, 20, 40],
//     LevelUpCondition_Spend : [100, 120, 150],
//     SkillMatch: function(){
//         if(this.LevelUpCondition_Hero[this.SkillLevel] <= Me.LV && this.LevelUpCondition_Spend[this.SkillLevel] <= Me.Coin){
//             this.flag = true;
//         } else {this.flag =false;}
//     },
//     flag: false
// }



// //index btn升級技能
// function SkillLevelUp(){
//     if(skillObject.flag){
//          skillObject.SkillLevel += 1;
//          Me.ATK += 10; //測試
//          //show 主動技能的btn
//         //主動技能實質內容是寫在另外的地方
//         //這邊不是npc的被動技能
//         //Me.coin扣掉 skillObject.LevelUpCondition_Spend  
//     };
// }


// //主動技能 的 技能實質內容
// function skillRealContent(){
    

// }