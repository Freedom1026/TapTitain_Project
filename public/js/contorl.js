
if(window.innerWidth <= 768 && window.innerWidth > window.innerHeight ){
    //待修改
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px Arial";
    ctx.fillText("螢幕請直放", RwdDx*1.5, RwdDy*1.5 + 16);
}
else{
    
    window.onload = function() {
        $('.hideBlock').css("visibility","visible");
        $('#pbar').css("display","none");
        setInterval(gameControl, 80);
    };
}

var ClickFlag = false;



function gameControl(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //background
    ctx.drawImage(bk,0, 0, 1200, 800);
    //creatures

    
    //coin
    for(var i = 0; i < CoinArray.length; i++){
        CoinArray[i].draw();
        CoinArray[i].updateY();
        if(CoinArray[i].dy < RwdDy*1.4+10){
            Me.Coin += Math.ceil(CoinArray[i].value);
            CoinArray.splice( i, 1);
        }
    }

    C_A.draw();
    C_A.speedControl();
    C_B.draw();
    C_B.speedControl();
    C_C.draw();
    C_C.speedControl();
    NowMonster.hpAutoLose();
    //monster
    NowMonster.draw();
    //skill open or close 參數為css選擇器
    C_A.SkOpen(1);
    fortune.SkOpen(2);
    wild.SkOpen(3);
    //暫時自己畫coin 之後換成圖
    ctx.beginPath();
    ctx.arc(RwdDx * 1.3,RwdDy + 8 ,10,0,2*Math.PI);
    ctx.fillStyle = "#FFA500";
    ctx.fill();
    ctx.font = "20px myfont";
    ctx.fillText(Me.Coin, RwdDx * 1.3 + 15, RwdDy + 16);
    //C_A.attacked();
// console.log(NowMonster);
    NowMonster.hpbar();
    canvas.onclick = FirstThing;
    if(ClickFlag){
        Me.attacked();
        NowMonster.attacked();
        ctx.save();
        ctx.fillStyle = "#AF2770";
        ctx.font = "30px Arial";
        ctx.fillText(NowMonster.attackedAmount, RwdDx*1.2, RwdDy*2);
        ctx.restore();
    };
    Me.draw();

    $('div.bascInfo p:nth-child(2)').text(`點擊攻擊力${Me.ATK}`);
}

function FirstThing(e){
    CoinDelete(e);
    ClickFlag = true;
    NowMonster.hpLose();
    setTimeout(theNext, 300)
}

function theNext(){ 
    ClickFlag = false;
    Me.normal();
}

function CoinDelete(e){
  
    for(let i = 0; i < CoinArray.length ; i++){
        let PosX = e.offsetX - CoinArray[i].dx;
        let PosY = e.offsetY - CoinArray[i].dy;
        let dist = Math.hypot(PosX, PosY);
        if(dist < 50){
            Me.Coin += Math.ceil(CoinArray[i].value);
            CoinArray.splice( i, 1);
        }
    }

}

// function CoinClean(){
//     for(let i = 0; i < CoinArray.length ; i++){
//         CoinArray[i].dy --;
        // if(CoinArray[i].dy < RwdDy*1.4+10){
        //     Me.Coin += Math.ceil(CoinArray[i].value);
        //     CoinArray.splice( i, 1);
        // }
//     }
// }

