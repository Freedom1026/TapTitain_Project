setInterval(test, 80);
var ClickFlag = false;



function test(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bk,0, -40, 1200, 600);
    Me.draw();
    NowMonster.draw();
    canvas.onclick = FirstThing;
    if(ClickFlag){
        Me.attacked();
        ctx.font = "30px Arial";
        ctx.fillText(NowMonster.attackedAmount, RwdDx*1.2, RwdDy*4);
    };
    NowMonster.hpbar();
}

function FirstThing(){
    console.log(Me.ATK);
    ClickFlag = true;
    NowMonster.hpLose();
    NowMonster.attacked();
    setTimeout(theNext, 300)
}

function theNext(){ 
    ClickFlag = false;
    Me.normal();
}