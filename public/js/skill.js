// //RWD係數 -->寬度係數不同
// var SkillDx = 0;
// //y軸位置之後要調整 -->目前依賴怪物位置
// var SkillDy = RwdDy + RwdDw * 1.2 + ChaDh;
// var SkillDw = canvas.width;
// //高度之後要調整 -->目前依賴寬度
// var SkillDh = canvas.width /12;




//-------------技能-------------
//拿jquery去抓技能圖示 顯示技能視窗
    


//設定技能基礎值
//fiexed marks
var HSK = class HSK{
    constructor(skname, lv){
        this.skname = skname;
        this.lv = lv;
        this.SKOpenFlag = false;
        //加成係數
        this.times = 1;
        //計時參數
        this.t_A = -1;
        this.t_B = -1;

    }

    // SkOpen(skID){ //每秒確認

    
    // }

    //設定計時時間
    //fiexed mark
    timeReset(ele, rA, rB){
        this.updatelvup();
        if(this.t_B <=0){
            this.t_A = rA | this.skTime;
            this.t_B = rB | this.coolTime;
            this.timeStart = setInterval (()=>this.timeCount(ele) , 1000);
            //call function of content
        }
    }

    //計時功能    ---->prototype
    timeCount(ele){
        this.execute();
        if(this.t_A <= 0){
            this.cancel();
            this.t_B -=1;
            if(this.t_B < 10){
                $(ele).text(`0${this.t_B}`);
            }else{
                $(ele).text(this.t_B);
            }
            $(ele).css("color","red");
            if(this.t_B <= 0){
                $(ele).html("&ensp;&ensp;");
                clearInterval(this.timeStart);
                return this.t_B;
            }
        }else{
            
            this.t_A -= 1;
            if(this.t_A < 10){
                $(ele).text(`0${this.t_A}`);
            }else{
                $(ele).text(this.t_A);
            }
            $(ele).css("color","white");
        }
    }
    updatelvup(){
        this.LvUp = (this.lv + 1) * 10;
        this.skTime = this.lv * 30; 
        this.coolTime = this. lv* 50;
        return this.LvUp;
    }
}

//fixed marks
class ActSkill_B extends HSK {
    constructor(skname, lv, SKOpenFlag, times, t_A, t_B){
        super(skname, lv, SKOpenFlag, times, t_A, t_B);
        this.Plus = this.lv /2 + 1.5;
        this.moneyPlus = 1;
        this.cname = "財富之力";
        this.imgwhere = '../img/icon/fortune.png';
        this.description = "時間內金幣掉落增加";
        this.LvUp = (this.lv + 1) * 10;
        this.upSpend = this.lv * 20 + 80;
        this.skTime = this.lv * 30; 
        this.coolTime = this. lv* 50;
    }

    SkOpen(skID){ //每秒確認

        if(this.LvUp <= Me.LV && this.upSpend <= Me.Coin){
            this.SKOpenFlag = true;
            $("#btn_02").text("可以升級");
            $("#btn_02").css("color","red");
            return this.SKOpenFlag;
        }else{
            this.SKOpenFlag = false;
            $("#btn_02").text("不能升級");
            $("#btn_02").css("color","rgba(170, 170, 170, 0.637)");
            return this.SKOpenFlag;
        }
    }

    execute(){ //sk_a 成為參數被呼叫
        this.Plus = this.lv /2 + 1.5;
        this.moneyPlus = this.Plus;
    }

    cancel(){
        this.moneyPlus = 1;
    }

}

//fixed mark
class ActSkill_C extends HSK {
    constructor(skname, lv, SKOpenFlag, times, t_A, t_B){
        super(skname, lv, SKOpenFlag, times, t_A, t_B);
        this.upATK = this.lv  * 0.01 + 1;
        this.cname = "蠻荒之力";
        this.imgwhere = '../img/icon/wild.png';
        this.description = "時間內攻擊力增加";
        this.LvUp = (this.lv + 1) * 10;
        this.upSpend = this.lv * 20 + 80;
        this.skTime = this.lv * 30; 
        this.coolTime = this. lv* 50;
    }
//fixed mark
    SkOpen(skID){ //每秒確認

        if(this.LvUp <= Me.LV && this.upSpend <= Me.Coin){
            this.SKOpenFlag = true;
            $("#btn_03").text("可以升級");
            $("#btn_03").css("color","red");
            return this.SKOpenFlag;
        }else{
            this.SKOpenFlag = false;
            $("#btn_03").text("不能升級");
            $("#btn_03").css("color","rgba(170, 170, 170, 0.637)");
            return this.SKOpenFlag;
        }
    }


    execute(){ 
        this.upATK = this.lv  * 0.01 + 1;
        NowMonster.attackedAmount = Math.floor(Me.ATK * wild.times);
        this.times = this.upATK;
    }

    cancel(){
        NowMonster.attackedAmount = Math.floor(Me.ATK * wild.times);
        this.times = 1;
    }

}



var fortune = new ActSkill_B("fortune", 0);
var wild = new ActSkill_C("wild", 0);
var SkillArray = [Me, fortune, wild];

$(window).on('beforeunload',function(){
    //localstorage
    localStorage.setItem('fortuneA', fortune.t_A);
    localStorage.setItem('fortuneB', fortune.t_B);
    localStorage.setItem('wildA', wild.t_A);
    localStorage.setItem('wildB', wild.t_B);

    var newItem ={
        lv : Me.LV,
        stage : atStage,
        coin : Me.Coin,
        diamond: Me.diamond,
        sk_A : fortune.lv,
        sk_B : wild.lv,
        yellow : C_A.lv,
        purple : C_B.lv,
        blue : C_C.lv
    };

    $.ajax({
        type: "put",
        url: "/member/record",
        data: newItem
    })

})

//--------------------------------------- 下面是畫面function 上面是物件funciton (初始化設定)


$(function(){
    $.get("/home/get_Hsk", function (e) {
        var HeroData = JSON.parse(e);
        console.log(HeroData);
        Me.Coin = HeroData[0].coin;
        atStage = HeroData[0].stage;
        Me.diamond = HeroData[0].diamond;
        $('#damount').text(Me.diamond);
        $('div.stage span:nth-child(1)').html(`&ensp;&ensp;${atStage - 1}`);
        $('div.stage span:nth-child(2)').html(`&ensp;&ensp;${atStage}`);
        $('div.stage span:nth-child(3)').html(`&ensp;&ensp;${atStage + 1}`);
        initMonster();
        SkillArray[0].LV = HeroData[0].lv;
        SkillArray[1].lv = HeroData[0].sk_A;
        SkillArray[2].lv = HeroData[0].sk_B;

    }).then(function(){
            SkillArray.forEach(function(val,ind){
                if(ind != 0){
                    Me.updateATK();
                    $(`span.${val.skname}`).text(`Lv.${val.lv}`);
                    if(val.lv > 0){
                        $(`div.actSkill span:nth-child(${ind})`).css("visibility","visible");
                    }
                }
                else{
                    Me.updateATK();
                    $('span.origin').text(`Lv.${val.LV}`);
                }
            })
    })

    //localstorage
    if(localStorage.getItem('fortuneA')){
        let theRestAA = localStorage.getItem('fortuneA');
        let theRestAB = localStorage.getItem('fortuneB');
        fortune.timeReset('#actBTN_A', theRestAA, theRestAB);
    }
    
    if(localStorage.getItem('wildB')){
        let theRestBA = localStorage.getItem('wildA');
        let theRestBB = localStorage.getItem('wildB');
        wild.timeReset('#actBTN_B', theRestBA, theRestBB);
    }

   
})




function levelUp(skill,skID){
    if(skID != 0 && SkillArray[skID].SKOpenFlag){
        //扣除金錢function
        spend(skID)
        SkillArray[skID].lv ++;
        SkillArray[skID].updatelvup();
        //傳入參數: 技能名稱
        $(`span.${skill}`).text(`Lv.${SkillArray[skID].lv}`);
        $(`div.actSkill span:nth-child(${skID})`).css("visibility","visible");

        //ajax
        var newItem ={
            lv : Me.LV,
            stage : atStage,
            coin : Me.Coin,
            diamond: Me.diamond,
            sk_A : fortune.lv,
            sk_B : wild.lv,
            yellow : C_A.lv,
            purple : C_B.lv,
            blue : C_C.lv
        };
        $.ajax({
            type: "put",
            url: "/member/record",
            data: newItem
        })
    }
    else if(skID == 0 && SkillArray[0].SKOpenFlag){
        //主角升級  
        SkillArray[0].LV++;
        Me.updateATK();
        $(`span.${skill}`).text(`Lv.${SkillArray[0].LV}`);
        mespand();

        //ajax
        var newItem ={
            lv : Me.LV,
            stage : atStage,
            coin : Me.Coin,
            diamond: Me.diamond,
            sk_A : fortune.lv,
            sk_B : wild.lv,
            yellow : C_A.lv,
            purple : C_B.lv,
            blue : C_C.lv
        };
        $.ajax({
            type: "put",
            url: "/member/record",
            data: newItem
        })
    }
}

function mespand(){
    Me.Coin -= Me.LvUpSpend;
}

function spend(skID){
    Me.Coin -= SkillArray[skID].upSpend;
}

const pnArray = ["div.heroSkill","div.creatureSkill","div.diamond"]

$('#btn_hero').click(function(){panelgo(0,this)});
$('#btn_creature').click(function(){panelgo(1,this)})
$('#btn_buy').click(function(){panelgo(2,this)})

function panelgo(pnID,btn){
    
    if($(pnArray[pnID]).css("visibility") == "visible"){
        $(pnArray[pnID]).css("visibility","hidden");
        btn.style.backgroundColor = "white";  
        }
        else{
        $(pnArray[pnID]).css("visibility","visible")
        btn.style.backgroundColor = "brown";
        // $(pn).css("display","block");
        }
    }
//fixed mark
function showDetail(skid){
    SkillArray[skid].updatelvup();
    let name = SkillArray[skid].cname;
    let img = SkillArray[skid].imgwhere;
    let lv = SkillArray[skid].lv;
    let des = SkillArray[skid].description;
    let sktime = SkillArray[skid].skTime;
    let coolTime = SkillArray[skid].coolTime;
    console.log(sktime);
    $("div.HSkillDetail").css("display","block");
    $("div.description").html(`<p>技能名稱：${name}</p>
    <p><span><img src="${img}" style="width: 4vh;"></span>　　　<span>Lv.${lv}</span></p>
    <p>${des}</p>
    <p>技能持續時間：${sktime}</p><p>技能冷卻時間：${coolTime}</p>`)
}

function closeDetail(){
    $("div.HSkillDetail").css("display","none");
}