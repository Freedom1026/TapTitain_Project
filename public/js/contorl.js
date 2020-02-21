setInterval(test, 80);
var ClickFlag = false;



function test(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    Me.draw();
    NowMonster.draw();
    canvas.onclick = FirstThing;
    if(ClickFlag){
        Me.attacked();
        ctx.fillText(Me.ATK, RwdDx*1.2, RwdDy);
    };
    //計時功能
    
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