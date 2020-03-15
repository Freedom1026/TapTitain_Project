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
            $.get("/home/get_Hsk", function (e) {
                var HeroData = JSON.parse(e);
                
                SkillArray[0].LV =(heroSkillLevel[0] = HeroData[0].heroLv);
                SkillArray[1].lv =(heroSkillLevel[1] = HeroData[0].heroSkLv_A);
                SkillArray[2].lv =(heroSkillLevel[2] = HeroData[0].heroSkLv_B);


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
            if(skID != 0 && SkillArray[skID].SKOpenFlag){
                SkillArray[skID].lv ++;
                //傳入參數: 技能名稱
                $(`span.${skill}`).text(`Lv.${SkillArray[skID].lv}`);
                $(`div.actSkill span:nth-child(${skID})`).css("visibility","visible");

                //扣除金錢function
                spend(skID)
            }
            else if(skID == 0){
                //排除第一個主角升級  
                Me.LV++;
                heroSkillLevel[skID]++;
                $(`span.${skill}`).text(`Lv.${heroSkillLevel[skID]}`);
                return;
            }
        }
    
        function spend(skID){
            Me.Coin -= SkillArray[skID].upSpend[SkillArray[skID].lv];
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
        this.LvUp = [0,10,20,30,40,50,60,70,80,90,100];
        this.upSpend = [0,100,120,150,200,250,300,400];
        this.skTime = [0,30,60,90,17,90,90,100]; 
        this.coolTime = [0, 100,150,160,180,720,800];
        //計時參數
        this.t_A = -1;
        this.t_B = -1;

    }
    SkOpen(skID){ //每秒確認....prototype連線
        if(this.LvUp[this.lv] <= Me.LV && this.upSpend[this.lv] <= Me.Coin){
            this.SKOpenFlag = true;
            $(`div.heroSkill div:nth-child(${skID}) button`).text("可以升級");
            $(`div.heroSkill div:nth-child(${skID}) button`).css("color","red");
            return this.SKOpenFlag;
        }else{
            this.SKOpenFlag = false;
            $(`div.heroSkill div:nth-child(${skID}) button`).text("不能升級");
            $(`div.heroSkill div:nth-child(${skID}) button`).css("color","rgba(170, 170, 170, 0.637)");
            return this.SKOpenFlag;
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
                $(ele).text("蠻");
                
                $(ele).css("background-color","red");
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
        this.upATK = [1,1.05,1.06,1.1,1.2,1.4,1.5,1.6];
    }
}

class ActSkill_C extends HSK {
    constructor(skname, lv, SKOpenFlag, times, LvUp, upSpend, skTime, coolTime, t_A, t_B){
        super(skname, lv, SKOpenFlag, times, LvUp, upSpend, skTime, coolTime, t_A, t_B);
        this.upATK = [1,1.05,1.06,1.1,1.2,1.4,1.5,1.6];
    }
}


var testSK = new ActSkill_C("test", 0);
var origin = new ActSkill_B("origin", 0);

var SkillArray = [Me,testSK, origin];


