
if( screen.width <= 400 && screen.width > screen.height ){
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
    C_B.SkOpen(4);
    C_C.SkOpen(7);
    Me.SkOpen(1);
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
        ctx.fillStyle = "#000000";
        ctx.font = "bolder 40px Arial";
        ctx.fillText(NowMonster.attackedAmount, RwdDx*1.23, RwdDy*2);
        ctx.restore();
        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.font = "40px Arial";
        ctx.fillText(NowMonster.attackedAmount, RwdDx*1.23+2, RwdDy*2-2);
        ctx.restore();

    };
    Me.draw();
    let temp = Math.floor(NowMonster.hp * NowMonster.hpbarContent);
    let temp2 = C_A.ATK + C_B.ATK + C_C.ATK;
    $('div.bascInfo p:nth-child(1)').text(`怪物生命值${temp}`);
    $('div.bascInfo p:nth-child(2)').text(`點擊攻擊力${Me.ATK}`);
    $('div.bascInfo p:nth-child(3)').text(`機器人輸出傷害總和${temp2}`);
}

function FirstThing(e){
    CoinDelete(e);
    if(flagAD){
        audioEffect.play();
    }
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


function getmoney(){
    let herespend = 20;
    if(Me.diamond >= herespend){
        Me.Coin += 1000;
        Me.diamond -= herespend;
        diaUpdate();
    }
    else{
        alert("寶藏不足，請儲值")
    }

}

function coldtime(){
    let herespend = 30;
    if(Me.diamond >= herespend){
        fortune.t_A = -1;
        fortune.t_B = -1;
        wild.t_A = -1;
        wild.t_B = -1;
        Me.diamond -= herespend;
        diaUpdate();
    }
    else{
        alert("寶藏不足，請儲值")
    }

}

function killnow(){
    let herespend = 40;
    if(Me.diamond >= herespend){
    changeMonster();
    Me.diamond -= herespend;
    diaUpdate()
}
    else{
        alert("寶藏不足，請儲值")
    }
}



function diaUpdate(){
    $('#damount').text(Me.diamond);
    var newItem ={
        lv : Me.LV,
        stage : atStage,
        coin : Me.Coin,
        diamond: Me.diamond,
        sk_A : fortune.lv,
        sk_B : wild.lv,
        yellow : C_A.lv,
        purple : C_B.lv,
        blue : C_C.lv
    };
    $.ajax({
        type: "put",
        url: "/member/record",
        data: newItem
    })
}


// 音效

var flagBG = false;
var flagAD = false;
		function bgPlay(bbk){
			console.log(bbk);
			if(flagBG == false){
                flagBG = true;
                console.log(this.src);
                bbk.src="../img/icon/bgmusic.png";
				BGmusic.play();
			}
			else if(flagBG == true){
                flagBG = false;
                bbk.src="../img/icon/bgmusic-off.png";
				BGmusic.pause();
			}
		}
		function collisionClick(bbk){
			console.log(bbk);
			if(flagAD == false){
                flagAD = true;
                bbk.src='../img/icon/audio.png';
                // bbk.setAttribute("src", "url('../img/icon/bgmusic.png')");
			}
			else if(flagAD == true){
                flagAD = false;
                bbk.src='../img/icon/audio-off.png';
			}
		}