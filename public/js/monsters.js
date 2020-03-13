var monstersImg = new Image();
monstersImg.src = "img/testMon2.png";


if(window.innerWidth <= 768){
//RWD係數 -->寬度係數不同
var RwdDx = canvas.width/3;
//y軸位置之後要調整 -->目前依賴寬度
var RwdDy = canvas.height/8;
var RwdDw = canvas.width/5*2;
//高度之後要調整 -->目前依賴寬度
var RwdDh = RwdDw*1.2;
ctx.fillStyle = "#FFA500";
ctx.fillRect(RwdDx, RwdDy, RwdDw, RwdDh)
}

else{
//RWD係數 -->寬度係數不同
var RwdDx = canvas.width/3;
//y軸位置之後要調整 -->目前依賴寬度
var RwdDy = canvas.height/8;
var RwdDw = canvas.width/4;
//高度之後要調整 -->目前依賴寬度
var RwdDh = RwdDw;
ctx.fillStyle = "#FFA500";
ctx.fillRect(RwdDx, RwdDy, RwdDw, RwdDh)
}


var monstersProperty = class monstersProperty {
    constructor(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, hp, money){
        this.image = image;
        this.sx = sx;
        this.sy = sy;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.dx = dx;
        this.dy = dy;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
        this.hp = hp;
        this.money = money;
        this.hpbarContent = 150;
        this.attackedAmount = 0;
    }

    hpbar(){
        ctx.save();
        ctx.fillStyle ="#FFA500";
        if(this.hpbarContent > 0){
            ctx.fillRect(RwdDx*1.2, RwdDy, this.hpbarContent, 15);
        }
        ctx.restore();
    }

    hpLose(){
        //time係數 依賴技能名稱會不好維護
        this.attackedAmount =  Me.ATK * origin.times;
        this.hpbarContent -= this.attackedAmount*20/this.hp;
        if(this.hpbarContent <= 0){
            changeMonster();
            return this.attackedAmount, this.hpbarContent;
        }
        
    }

    hpAutoLose(){
        this.hpbarContent -= C_A.ATK*20/this.hp;
        if(this.hpbarContent <= 0){
            changeMonster();
            return this.attackedAmount, this.hpbarContent;
    }
    }

    attacked(){
        this.sx += 225;
        (this.sx >= 900)? this.sx = 0 : 0;
        return this.sx;
    }

    draw(){
        ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);
    }

}

var NowMonster = new monstersProperty(monstersImg, 0, 0, 225, 225, RwdDx, RwdDy, RwdDw, RwdDh, 10, 100);
//0 0 225 225



function changeMonster(){
let r = Math.floor(Math.random()*18)*225;
NowMonster = new monstersProperty(monstersImg, 0, r, 225, 225, RwdDx, RwdDy, RwdDw, RwdDh, 10, 100); //array[index].img, array[index].sx
//times係數依賴技能名稱 會不好維護
NowMonster.attackedAmount = Me.ATK * origin.times;
console.log(NowMonster.attackedAmount);
//關卡切換 打倒怪物計數+1
}

