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
                heroSkillLevel[0] = HeroData[0].heroLv;
                heroSkillLevel[1] = HeroData[0].heroSkLv_A;
                heroSkillLevel[2] = HeroData[0].heroSkLv_B;
            }).then(function(){
                    heroSkillLevel.forEach(function(val,ind){
                        let now = ind + 1;
                        $(`div.heroSkill div:nth-child(${now}) span:nth-child(3)`).text(`Lv.${val}`);
                        if(val > 0){
                            $(`div.actSkill span:nth-child(${ind})`).css("visibility","visible");
                        }
                    })
            })
        })



        
        function levelUp(skill,skID){
        //判斷條件 暫時自己重寫
            if(skID != 0 && SkillArray[skID].LvUp[heroSkillLevel[skID]] <= Me.LV){
                console.log("test");
                SkillArray[skID].lv ++;
                heroSkillLevel[skID]++;
                //傳入參數: 技能名稱
                $(`span.${skill}`).text(`Lv.${heroSkillLevel[skID]}`);
                $(`div.actSkill span:nth-child(${skID})`).css("visibility","visible");
            }
            else if(skID == 0){
                //排除第一個主角升級  
                Me.LV++;
                heroSkillLevel[skID]++;
                $(`span.${skill}`).text(`Lv.${heroSkillLevel[skID]}`);
                return;
            }


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
    

//---------------------------------------上面是畫面function 下面是物件funciton



//設定技能基礎值

var HSK = class HSK{
    constructor(skname, lv){
        this.skname = skname;
        this.lv = lv;
        this.SKOpenFlag = false;
        //加成係數
        this.times = 1;
        this.LvUp = [0,10,20,30,40,50];
        this.upSpend = [0,100,120,150,200,250];
        this.skTime = [30,60,90,17,90];
        this.coolTime = [100,160,180,23,720];
        //計時參數
        this.t_A = -1;
        this.t_B = -1;

    }
    SkOpen(){ //每秒確認....prototype連線
        if(this.LvUp[this.lv-1] <= Me.LV && this.upSpend[this.lv-1] <= Me.Coin){
            this.SKOpenFlag = true;
            $("body").css("background-color","red");
        }else{
            this.SKOpenFlag = false;
            $("body").css("background-color","yellow");
        }
    }

    //click active rounded_btn
    execute(){ //sk_a 成為參數被呼叫
        this.times = this.upATK[this.lv];
    }

    cancel(){
        this.times = 1;
    }

    //設定計時時間   
    timeReset(ele){
        if(this.t_B <=0){
            this.t_A = this.skTime[this.lv];
            this.t_B = this.coolTime[this.lv];
            this.timeStart = setInterval (()=>this.timeCount(ele) , 1000);
            //call function of content
            this.execute();
        }
    }


    //計時功能    ---->prototype
    timeCount(ele){
        if(this.t_A <= 0){
            this.cancel();  
            this.t_B -=1;
            $(ele).text(this.t_B);
            $(ele).css("background-color","pink");
            if(this.t_B <= 0){
                clearInterval(this.timeStart);
                return this.t_B;
            }
        }else{
            this.t_A -= 1;
            $(ele).text(this.t_A);
            $(ele).css("background-color","yellow");
        }
    }
    
}


class ActSkill_B extends HSK {
    constructor(skname, lv, SKOpenFlag, times, LvUp, upSpend, skTime, coolTime, t_A, t_B){
        super(skname, lv, SKOpenFlag, times, LvUp, upSpend, skTime, coolTime, t_A, t_B);
        this.upATK = [1.05,1.06,1.1,1.2,1.4];
    }
}




var testSK = new ActSkill_B("test", 1);
var origin = new ActSkill_B("origin", 1);

var SkillArray = [Me,testSK, origin];


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