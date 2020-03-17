setInterval(test, 30);
var ClickFlag = false;



function test(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //background
    ctx.drawImage(bk,0, -40, 1200, 600);
    //creatures
    Me.draw();
    
    for(var i = 0; i < CoinArray.length; i++){
        CoinArray[i].draw();
    }

    C_A.draw();
    C_A.speedControl();
    C_B.draw();
    C_B.speedControl();
    C_C.draw();
    C_C.speedControl();

    //monster
    NowMonster.draw();
    //skill open or close 參數為css選擇器
    testSK.SkOpen(2);
    origin.SkOpen(3);
    //暫時自己畫coin 之後換成圖
    ctx.beginPath();
    ctx.arc(RwdDx*1.4,RwdDy*1.4+10,10,0,2*Math.PI);
    ctx.fillStyle = "#FFA500";
    ctx.fill();
    ctx.font = "20px Arial";
    ctx.fillText(Me.Coin, RwdDx*1.5, RwdDy*1.4 + 15);
    //C_A.attacked();

    NowMonster.hpbar();
    canvas.onclick = FirstThing;
    if(ClickFlag){
        Me.attacked();
        NowMonster.attacked();
        ctx.save();
        ctx.fillStyle = "#AF2770";
        ctx.font = "30px Arial";
        ctx.fillText(NowMonster.attackedAmount, RwdDx*1.2, RwdDy*4);
        ctx.restore();
    };
    
}

function FirstThing(){
    ClickFlag = true;
    NowMonster.hpLose();
    setTimeout(theNext, 300)
}

function theNext(){ 
    ClickFlag = false;
    Me.normal();
}
