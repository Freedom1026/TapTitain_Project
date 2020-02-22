
var chaimg = new Image();
chaimg.src = "img/all.png";


//RWD係數 -->寬度係數不同
var ChaDx = canvas.width/12*5.2;
//y軸位置之後要調整 -->目前依賴怪物位置
var ChaDy = RwdDy + RwdDw * 1.2;
var ChaDw = canvas.width/24*3;
//高度之後要調整 -->目前依賴寬度
var ChaDh = ChaDw;
ctx.fillStyle = "#03fcd7";
ctx.fillRect(ChaDx, ChaDy, ChaDw, ChaDh)





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

    }    
    normal(){
        this.sx = 0;
        return this.sx;
    }
    attacked(){
        this.sx += 200;
        (this.sx > 400)? this.sx = 200 : this.sx=400;
        return this.sx;
    }

    draw(){
        ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight)
    }

}


//此處的Me 之後要加上--我的等級參數/金幣參數/破關關卡參數 利用get傳入
var Me = new mainCha(chaimg, 0, 0, 200, 200, ChaDx, ChaDy, ChaDw, ChaDh);
var Hero_1 = new mainCha(chaimg, 0, 0, 200, 200, 109, 300, ChaDw, ChaDh);


//之後再來加入的npc紀錄，要記錄Me已經召喚的npc　以及其等級 利用get傳入

//index=>英雄等級提升
function meLevelUp(){
    Me.LV ++;
}

