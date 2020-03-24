
var chaimg = new Image();
chaimg.src = "img/all2.png";
var creatures = new Image();
creatures.src = "img/testMon.png"

if(window.innerWidth <= 768){
    //RWD係數 -->寬度係數不同
var ChaDx = canvas.width/10*3.5;
//y軸位置之後要調整 -->目前依賴怪物位置
//依賴人物大小，因此寫在下方

var ChaDw = canvas.width/12*1.5;
//高度之後要調整 -->目前依賴寬度
var ChaDh = ChaDw;
ctx.fillStyle = "#03fcd7";
ctx.fillRect(ChaDx, ChaDy, ChaDw, ChaDh)
}
else{
//RWD係數 -->寬度係數不同
var ChaDx = canvas.width/32 * 15;
//y軸位置之後要調整 -->目前依賴怪物位置
var ChaDy = RwdDy + RwdDw * 1.4;
var ChaDw = canvas.width/24*2;
var ChaDy = canvas.height - ChaDw*2;
//高度之後要調整 -->目前依賴寬度
var ChaDh = ChaDw;
ctx.fillStyle = "#03fcd7";
ctx.fillRect(ChaDx, ChaDy, ChaDw, ChaDh)

}




var Cha = class Cha {
    constructor(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
        this.image = image;
        this.sx = sx;
        this.sy = sy;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.dx = dx;
        this.dy = dy;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
    }
    draw(){
        ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight)
    }
}

class mainCha extends Cha {
    constructor(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
        super(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        //攻擊力 -必須修改成和等級成等比
        this.ATK = 20;
        //等級 可以直接載入
        this.LV = 1;
        //金幣 可以直接載入
        this.Coin = 8000;
        this.LvUpSpend = [0,10,15,20,21,25,70]
    }    
    normal(){
        this.sx = 0;
        return this.sx;
    }
    attacked(){
        this.sx += 450;
        if(this.sx > 1200){
            this.sx = 0;
        }
        return this.sx;
    }

    //SkOpen 補
    SkOpen (skID){

    }

    //updateATK 補
    updateATK(){
        this.ATK = this.LV * 2 + 20;
        return this.ATK;
    }

}

class CreatureA extends Cha{
    constructor(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
        super(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        this.speed = 0;
        this.lv = 0;
        this.ATK = this.lv * 20;
        this.upSpend = [0,100,120,150,200,250,300,400];
        this.SKOpenFlag = true;
        this.LvUp = [0,10,20,30,40,50,60,70,80,90,100];
    }
    attacked(){
        this.sx += 225;
        (this.sx >= 900)? this.sx = 0 : 0;
        return this.sx;
    }

    updateATK(){
        this.ATK = this.lv * 2;
        return this.ATK;
    }

    speedControl(){
        this.speed ++;
        //         80*5=400ms                this.normal沒寫
        (this.speed % 5 == 0)? this.attacked():0;
        NowMonster.hpAutoLose();
    }

    SkOpen(skID){ //每秒確認....prototype連線
        if(this.LvUp[this.lv] <= Me.LV && this.upSpend[this.lv] <= Me.Coin){
            this.SKOpenFlag = true;
            $(`div.creatureSkill tr:nth-child(${skID * 2}) td:nth-child(3)`).text("可以升級");
            $(`div.creatureSkill tr:nth-child(${skID * 2}) td:nth-child(3)`).css("color","red");
            return this.SKOpenFlag;
        }else{
            this.SKOpenFlag = false;
            $(`div.creatureSkill tr:nth-child(${skID * 2}) td:nth-child(3)`).text("不能升級");
            $(`div.creatureSkill tr:nth-child(${skID * 2}) td:nth-child(3)`).css("color","rgba(170, 170, 170, 0.637)");
            return this.SKOpenFlag;
        }
    }
    draw(){
        if(this.lv > 0){
            ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight)
        }
        
    }
}



//此處的Me 之後要加上--我的等級參數/金幣參數/破關關卡參數 利用get傳入
var Me = new mainCha(chaimg, 0, 0, 225, 225, ChaDx, ChaDy, ChaDw, ChaDh);



//之後再來加入的npc紀錄，要記錄Me已經召喚的npc　以及其等級 利用get傳入
var C_A = new CreatureA(chaimg, 0, 225, 225, 225, ChaDx*3/2, RwdDy, ChaDw, ChaDh);
var C_B = new CreatureA(chaimg, 0, 450, 225, 225, ChaDx*3/2, RwdDy*2, ChaDw, ChaDh);
var C_C = new CreatureA(chaimg, 0, 900, 225, 225, ChaDx*3/2, RwdDy*3, ChaDw, ChaDh);

var chaLevel = [1, 10, 0];
var C_array = [C_A, C_B, C_C];
console.log(C_A)

$(function(){
    $.get("/home/get_Csk", function (e) {
        var Data = JSON.parse(e);
        
        
        C_array[0].lv = Data[0].A;
        C_array[1].lv = Data[0].B;
        C_array[2].lv = Data[0].C;


    }).then(function(){
            C_array[0].updateATK();
            chaLevel.forEach(function(val,ind){
                let now = ind + 1;
                let lvShow = C_array[ind].lv;
                $(`div.creatureSkill tr:nth-child(${now * 2}) td:nth-child(3)`).text(`Lv.${lvShow}`);
            }
            
            )
    })
})

function ClevelUp(skill,skID){
        skID -=1;
        if(C_array[skID].SKOpenFlag){
            C_array[skID].lv ++;
            C_array[0].updateATK();
            //傳入參數: 技能名稱
            $(`td.${skill}`).text(`Lv.${C_array[skID].lv}`);

            //扣除金錢function
            Cspend(skID)
        }

    }

    function Cspend(skID){
        Me.Coin -= C_array[skID].upSpend[C_array[skID].lv];
    }