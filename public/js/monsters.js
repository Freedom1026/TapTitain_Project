var monstersImg = new Image();
monstersImg.src = "img/testMon.png";

//RWD係數 -->寬度係數不同
var RwdDx = canvas.width/3;
//y軸位置之後要調整 -->目前依賴寬度
var RwdDy = canvas.height/8;
var RwdDw = canvas.width/5;
//高度之後要調整 -->目前依賴寬度
var RwdDh = RwdDw*1.2;
ctx.fillStyle = "#FFA500";
ctx.fillRect(RwdDx, RwdDy, RwdDw, RwdDh)



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
    }

    hpbar(){
        ctx.save();
        ctx.fillStyle ="#FFA500";
        ctx.fillRect(RwdDx*1.2, 20, this.hpbarContent, 20);
        ctx.restore();
    }

    hpLose(){
        this.hpbarContent -= Me.ATK*20/this.hp;
        (this.hpbarContent <= 0)? changeMonster():0;
    }

    attacked(){
        this.sx += 450;
        (this.sx >= 900)? this.sx = 0 : 0;
        return this.sx;
    }

    draw(){
        ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight)
    }

}

var NowMonster = new monstersProperty(monstersImg, 0, 0, 450, 450, RwdDx, RwdDy, RwdDw, RwdDh, 100, 100);



function changeMonster(){
NowMonster = new monstersProperty(monstersImg, 100, 100, 100, 100, RwdDx, RwdDy, RwdDw, RwdDh, 1000, 100); //array[index].img, array[index].sx
console.log("死掉了,換新的" + NowMonster.hp)//用陣列去random
}


// var monsterType = [];
// //dx, dy, dwidth, dheight都要是RWD
// monsterType[0]=new monsterA(monstersImg, 100, 100, 100, 100, 100, 100, 100, 100);
// monsterType[1]=new monsterB(monstersImg, 100, 100, 100, 100, 100, 100, 100, 100);

