setInterval(test, 80);
var ClickFlag = false;



function test(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //background
    ctx.drawImage(bk,0, -40, 1200, 600);
    //creatures
    Me.draw();
    C_A.draw();
    C_B.draw();
    C_C.draw();
    //monster
    NowMonster.draw();
    //skill open or close
    origin.SkOpen();
    //暫時自己畫coin 之後換成圖
    ctx.beginPath();
    ctx.arc(RwdDx*1.4,RwdDy*1.4,10,0,2*Math.PI);
    ctx.fillStyle = "#FFA500";
    ctx.fill();
    ctx.font = "20px Arial";
    ctx.fillText(Me.Coin, RwdDx*1.5, RwdDy*1.4+5);
    //C_A.attacked();
    canvas.onclick = FirstThing;
    if(ClickFlag){
        Me.attacked();
        ctx.save();
        ctx.fillStyle = "#AF2770";
        ctx.font = "30px Arial";
        ctx.fillText(NowMonster.attackedAmount, RwdDx*1.2, RwdDy*4);
        ctx.restore();
    };
    NowMonster.hpbar();
}

function FirstThing(){
    ClickFlag = true;
    NowMonster.hpLose();
    NowMonster.attacked();
    setTimeout(theNext, 300)
}

function theNext(){ 
    ClickFlag = false;
    Me.normal();
}