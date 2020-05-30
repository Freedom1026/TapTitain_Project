
var chaimg = new Image();
chaimg.src = "img/all2.png";

if(window.innerWidth <= 768){
    //RWD係數 -->寬度係數不同
var ChaDx = canvas.width/10*3.5;
//y軸位置之後要調整 -->目前依賴怪物位置

var ChaDw = canvas.width/12*2;
var ChaDy = canvas.height - ChaDw*1.2;
//高度之後要調整 -->目前依賴寬度
var ChaDh = ChaDw;
}
else{
//RWD係數 -->寬度係數不同
var ChaDx = canvas.width/32 * 15;
//y軸位置之後要調整 -->目前依賴怪物位置

var ChaDw = canvas.width/24*2.5;
var ChaDy = canvas.height - ChaDw*2;
//高度之後要調整 -->目前依賴寬度
var ChaDh = ChaDw;
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
    updatelvup(){
        this.LvUp = (this.lv + 1) * 10;
        return this.LvUp;
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
        this.Coin = 0;
        this.LvUpSpend = this.LV * 100;
        this.diamond = 0;
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
        if(this.LvUpSpend <= Me.Coin){
            this.SKOpenFlag = true;
            $("#btn_01").text("可以升級");
            $("#btn_01").css("color","red");
            return this.SKOpenFlag;
        }else{
            this.SKOpenFlag = false;
            $("#btn_01").text("不能升級");
            $("#btn_01").css("color","rgba(170, 170, 170, 0.637)");
            return this.SKOpenFlag;
        }
    }

    //updateATK 補
    updateATK(){
        this.ATK = this.LV * 20 + 3;
        return this.ATK;
    }

}

class CreatureA extends Cha{
    constructor(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
        super(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        this.name = "monA";
        this.speed = 0;
        this.lv = 0;
        this.ATK = this.lv * 20;
        this.upSpend = this.lv * 20 + 80;
        this.SKOpenFlag = true;
        this.LvUp = (this.lv + 1) * 10;
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
//fixed mark
    SkOpen(skID){ 
        $(`div.creatureSkill tr:nth-child(${skID+1}) td:nth-child(2)`).text(`攻擊力:${this.ATK}`);
        $(`div.creatureSkill tr:nth-child(${skID+2}) td:nth-child(2)`).text(`金錢：${this.upSpend}`);
        $(`div.creatureSkill tr:nth-child(${skID+2}) td:nth-child(3)`).text(`等級：${this.LvUp}`);
        if(this.LvUp <= Me.LV && this.upSpend <= Me.Coin){
            this.SKOpenFlag = true;
            $(`div.creatureSkill tr:nth-child(${skID}) td:nth-child(5) button`).text("可以升級");
            $(`div.creatureSkill tr:nth-child(${skID}) td:nth-child(5)`).css("color","red");
            return this.SKOpenFlag;
        }else{
            this.SKOpenFlag = false;
            $(`div.creatureSkill tr:nth-child(${skID}) td:nth-child(5) button`).text("不能升級");
            $(`div.creatureSkill tr:nth-child(${skID}) td:nth-child(5)`).css("color","rgba(170, 170, 170, 0.637)");
            return this.SKOpenFlag;
        }
    }
    draw(){
        if(this.lv > 0){
            ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight)
        }
        
    }
}
//fixed mark
class CreatureB extends Cha{
    constructor(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
        super(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        this.name = "monB";
        this.speed = 0;
        this.lv = 0;
        this.ATK = this.lv * 30;
        this.upSpend = this.lv * 20 + 120;
        this.SKOpenFlag = true;
        this.LvUp = (this.lv + 1) * 10;
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

    SkOpen(skID){ 
        $(`div.creatureSkill tr:nth-child(${skID+1}) td:nth-child(2)`).text(`攻擊力:${this.ATK}`);
        $(`div.creatureSkill tr:nth-child(${skID+2}) td:nth-child(2)`).text(`金錢：${this.upSpend}`);
        $(`div.creatureSkill tr:nth-child(${skID+2}) td:nth-child(3)`).text(`等級：${this.LvUp}`);
        if(this.LvUp <= Me.LV && this.upSpend <= Me.Coin){
            this.SKOpenFlag = true;
            $(`div.creatureSkill tr:nth-child(${skID}) td:nth-child(5) button`).text("可以升級");
            $(`div.creatureSkill tr:nth-child(${skID}) td:nth-child(5)`).css("color","red");
            return this.SKOpenFlag;
        }else{
            this.SKOpenFlag = false;
            $(`div.creatureSkill tr:nth-child(${skID}) td:nth-child(5) button`).text("不能升級");
            $(`div.creatureSkill tr:nth-child(${skID}) td:nth-child(5)`).css("color","rgba(170, 170, 170, 0.637)");
            return this.SKOpenFlag;
        }
    }
    draw(){
        if(this.lv > 0){
            ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight)
        }
        
    }
}

class CreatureC extends Cha{
    constructor(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
        super(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        this.name = "monC";
        this.speed = 0;
        this.lv = 0;
        this.ATK = this.lv * 40;
        this.upSpend = this.lv * 20 + 160;
        this.SKOpenFlag = true;
        this.LvUp = (this.lv + 1) * 10;
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
        $(`div.creatureSkill tr:nth-child(${skID+1}) td:nth-child(2)`).text(`攻擊力:${this.ATK}`);
        $(`div.creatureSkill tr:nth-child(${skID+2}) td:nth-child(2)`).text(`金錢：${this.upSpend}`);
        $(`div.creatureSkill tr:nth-child(${skID+2}) td:nth-child(3)`).text(`等級：${this.LvUp}`);
        if(this.LvUp <= Me.LV && this.upSpend <= Me.Coin){
            this.SKOpenFlag = true;
            $(`div.creatureSkill tr:nth-child(${skID}) td:nth-child(5) button`).text("可以升級");
            $(`div.creatureSkill tr:nth-child(${skID}) td:nth-child(5)`).css("color","red");
            return this.SKOpenFlag;
        }else{
            this.SKOpenFlag = false;
            $(`div.creatureSkill tr:nth-child(${skID}) td:nth-child(5) button`).text("不能升級");
            $(`div.creatureSkill tr:nth-child(${skID}) td:nth-child(5)`).css("color","rgba(170, 170, 170, 0.637)");
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
var C_A = new CreatureA(chaimg, 0, 225, 225, 225, RwdDx*2, RwdDy, ChaDw, ChaDh);
var C_B = new CreatureB(chaimg, 0, 450, 225, 225, RwdDx*2, RwdDy*1.3, ChaDw, ChaDh);
var C_C = new CreatureC(chaimg, 0, 675, 225, 225, RwdDx*2, RwdDy*1.6, ChaDw, ChaDh);

var chaLevel = [1, 10, 0];
var C_array = [C_A, C_B, C_C];



$(function(){
    $.get("/home/get_Csk", function (e) {
        var Data = JSON.parse(e);
        C_array[0].lv = Data[0].yellow;
        C_array[1].lv = Data[0].purple;
        C_array[2].lv = Data[0].blue;


    }).then(function(){
        //初始化攻擊力調整
            C_array.forEach(function(val, ind){
                val.updateATK();
                let creatureName = C_array[ind].name;
                let lvShow = C_array[ind].lv;
                $(`td.${creatureName}`).text(`Lv.${lvShow}`);
            })
    })
})

function ClevelUp(skill,skID){
        skID -=1;
        if(C_array[skID].SKOpenFlag){
            //扣除金錢function
            Cspend(skID)
            C_array[skID].lv ++;
            C_array[skID].updateATK();
            C_array[skID].updatelvup();
            //傳入參數: 技能名稱
            $(`td.${skill}`).text(`Lv.${C_array[skID].lv}`);

            //缺少攻擊力調整

        }

    }

    function Cspend(skID){
        Me.Coin -= C_array[skID].upSpend;
    }