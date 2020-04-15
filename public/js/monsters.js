var monstersImg = new Image();
monstersImg.src = "img/testMon4.png";
var coinPic = new Image();
coinPic.src = "img/coin.png";

//目前破關進度
var atStage;

if(window.innerWidth <= 768){
//RWD係數 -->寬度係數不同
var RwdDx = canvas.width/3;
//y軸位置之後要調整 -->目前依賴寬度
var RwdDy = canvas.height/3;
var RwdDw = canvas.width/5*2;
//高度之後要調整 -->目前依賴寬度
var RwdDh = RwdDw;

}

else{
//RWD係數 -->寬度係數不同
var RwdDx = canvas.width/8 * 3;
//y軸位置之後要調整 -->目前依賴寬度
var RwdDy = canvas.height/8 * 1.8;
var RwdDw = canvas.width/4;
//高度之後要調整 -->目前依賴寬度
var RwdDh = RwdDw;

}


var monstersProperty = class monstersProperty {
    constructor(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, attackedAmount){
        this.image = image;
        this.sx = sx;
        this.sy = sy;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.dx = dx;
        this.dy = dy;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
        this.hp = Math.floor(17.5 * Math.pow(1.39, Math.min(atStage, 115)) * Math.pow(1.13, Math.max(atStage-115, 0)));
        this.money = this.hp * 0.08 + 0.02 * Math.min(atStage, 150);
        this.hpbarContent = 150;
        this.attackedAmount = attackedAmount || 0;
    }

    hpbar(){
        ctx.save();
        ctx.fillStyle ="#FFA500";
        if(this.hpbarContent > 0){
            if(window.innerWidth <= 768){
                ctx.fillRect(RwdDx, RwdDy/1.5, this.hpbarContent, 15);
            }
            else{ctx.fillRect(RwdDx*1.1, RwdDy/1.2, this.hpbarContent, 15);
//            else{ctx.fillRect(RwdDx*1.1, RwdDy/1.5, 3, 15);
            }
        }
        ctx.restore();
    }

    hpLose(){
        //time係數 依賴技能名稱會不好維護
        this.attackedAmount = Math.floor(Me.ATK * wild.times);
        this.hpbarContent -= this.attackedAmount*20/this.hp;
        if(this.hpbarContent <= 0){
            changeMonster();
            return this.attackedAmount, this.hpbarContent;
        }
        
    }

    hpAutoLose(){
        this.hpbarContent -= C_A.ATK/this.hp;
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

function initMonster(){
    this.NowMonster = new monstersProperty(monstersImg, 0, 0, 220, 220, RwdDx, RwdDy, RwdDw, RwdDh);
    //0 0 225 225
}


var CoinArray = [];


function changeMonster(){
    //哪個怪物
    let r = Math.floor(Math.random()*30)*225;
    //現在攻擊數字
    let atked = NowMonster.attackedAmount;
    //coin number
    let coinNum = Math.floor(Math.random()*5)+1;
    //each coin
    let coinObt = NowMonster.money * fortune.moneyPlus / coinNum;
    for(let i = 0; i < coinNum; i++){
        CoinArray.push(new CoinObj(coinObt));
    }

    for(var i = 0; i < CoinArray.length; i++){
        CoinArray[i].deleteSelf();
    }

    NowMonster = new monstersProperty(monstersImg, 0, r, 220, 220, RwdDx, RwdDy, RwdDw, RwdDh, atked); //array[index].img, array[index].sx

    //關卡切換 打倒怪物計數+1
    atStage += 1 ;
    let rk = Math.ceil(Math.random()*8);
    bk.src =`./img/stage/stage${rk}.jpg`;
    $('div.stage span:nth-child(2)').css("background-image",`url(./img/stage/stage${rk}.jpg)`);

    if(atStage < 10){
    $('div.stage span:nth-child(1)').html(`&ensp;&ensp;${atStage - 1}`);
    $('div.stage span:nth-child(2)').html(`&ensp;&ensp;${atStage}`);
    $('div.stage span:nth-child(3)').html(`&ensp;&ensp;${atStage + 1}`);
    }
    else if(atStage > 9 &&atStage <100){
        $('div.stage span:nth-child(1)').html(`&ensp;&ensp;${atStage - 1}`);
        $('div.stage span:nth-child(2)').html(`&ensp;${atStage}`);
        $('div.stage span:nth-child(3)').html(`&ensp;&ensp;${atStage + 1}`);
    }
    else{
        
        $('div.stage span:nth-child(2)').html(atStage);
        $('div.stage span:nth-child(3)').html(`&ensp;&ensp;${atStage + 1}`);
    }

}

var CoinObj = class CoinObj {
    constructor(v){
        this.dx = Math.floor(Math.random() * canvas.width);
        this.dy = ChaDy;
        this.value = v;
        this.start = false;
    }
    draw(){
        ctx.drawImage(coinPic, this.dx, this.dy, 50, 50);
    }

    updateY(){
        if(this.start == true){
            this.dy --;
        }
    }

    deleteSelf(){
        console.log("i")
        setTimeout(() => {
            this.start = true;
        }, 3000);
    }
}
