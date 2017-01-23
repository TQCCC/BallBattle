function NextLevel() {
    if (IsGameOver) {
        return;
    }

    for(var key in bulletLayer.childList){
        var b = bulletLayer.childList[key];
        if (b.bulletType) {
            b.Die();
        }
    }
    giftLayer.removeAllChild();

    CurrentLevel++;

    switch(BigLevel){
        case 1:
        {
            backgroundLayer.removeAllChild();
            var bgdata = new LBitmapData(imgList["background1"]);
            var backgroundBitmap = new LBitmap(bgdata);
            //Make background be center
            backgroundBitmap.scaleX = BACK_WIDTH/backgroundBitmap.width;
            backgroundBitmap.scaleY = BACK_HEIGHT/backgroundBitmap.height;
            backgroundLayer.addChild(backgroundBitmap);

            var aibulletType = "Single";

            if (CurrentLevel>2) {
                aibulletType = "Tracking";
            }

            if (CurrentLevel>5) {   //boss1

                var vx = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
                var vy = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
                if (vx == 0&&vy==0) {
                    vx = 1;
                    vy = 1;
                }
                var rx = Math.random()*BACK_WIDTH;
                var ry = Math.random()*BACK_HEIGHT;
                boss1 = new Boss1('boss1',rx,ry,vx,vy,3,imgList['boss1emoji4']);
                playerLayer.addChild(boss1);

                var boss1Hp = new MsgHP(window.innerWidth - HP_DRAW_WIDTH,0,boss1,BOSS1_FULL_HP,"#4B0082");
                messageLayer.addChild(boss1Hp);

            }else{
                var n = CurrentLevel*3+Math.floor(Math.random()*3+5);
                for(var i=0;i<n;i++){
                    var vx = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
                    var vy = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
                    if (vx == 0&&vy==0) {
                        vx = 1;
                        vy = 1;
                    }
                    var rx = Math.random()*BACK_WIDTH;
                    var ry = Math.random()*BACK_HEIGHT;

                    var randomnum = Math.floor(Math.random()*2+1);
                    var ai = new AIBall1('AI',rx,ry,vx,vy,3,imgList['head'+randomnum]);

                    if (i>=(n/2)) {
                        ai.bulletType = aibulletType;
                    }
                    playerLayer.addChild(ai);

                }
            }

            //gift
            var n = Math.floor(Math.random()*2+1);
            for(var i=0;i<n;i++){
                var gift;
                if (i>n/2) {
                    var rx = Math.random()*(BACK_WIDTH*.8);
                    var ry = Math.random()*(BACK_HEIGHT*.8);
                    gift = new GiftBullet(rx,ry,imgList['gifttracking'],"Tracking");
                }else{
                    var rx = Math.random()*(BACK_WIDTH*.8);
                    var ry = Math.random()*(BACK_HEIGHT*.8);
                    gift = new GiftHP(rx,ry,imgList['gifthp']);
                }

                giftLayer.addChild(gift);
            }


        }
        break;

        case 2:
        {
            backgroundLayer.removeAllChild();
            var bgdata = new LBitmapData(imgList["background2"]);
            var backgroundBitmap = new LBitmap(bgdata);
            //Make background be center
            backgroundBitmap.scaleX = BACK_WIDTH/backgroundBitmap.width;
            backgroundBitmap.scaleY = BACK_HEIGHT/backgroundBitmap.height;
            backgroundLayer.addChild(backgroundBitmap);

            var aibulletType = "Tracking";

            if (CurrentLevel>6) {   //boss2
                var vx = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
                var vy = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
                if (vx == 0&&vy==0) {
                    vx = 1;
                    vy = 1;
                }
                var rx = Math.random()*BACK_WIDTH;
                var ry = Math.random()*BACK_HEIGHT;
                boss2 = new Boss2('boss2',rx,ry,vx,vy,5,imgList['boss2emoji1']);

                playerLayer.addChild(boss2);

                var boss2Hp = new MsgHP(window.innerWidth - HP_DRAW_WIDTH,0,boss2,BOSS2_FULL_HP,"#4B0082");
                messageLayer.addChild(boss2Hp);
            }else{
                var n = CurrentLevel*2+Math.floor(Math.random()*4+3);
                for(var i=0;i<n;i++){
                    var vx = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
                    var vy = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
                    if (vx == 0&&vy==0) {
                        vx = 1;
                        vy = 1;
                    }
                    var rx = Math.random()*BACK_WIDTH;
                    var ry = Math.random()*BACK_HEIGHT;

                    var randomnum = Math.floor(Math.random()*3+1);
                    var ai = new AIBall2('AI',rx,ry,vx,vy,4,imgList['monster'+randomnum]);

                    if (i>=(n/2)) {
                        ai.bulletType = aibulletType;
                    }

                    playerLayer.addChild(ai);

                }
            }

            //gift
            var n = Math.floor(Math.random()*2+1);
            for(var i=0;i<n;i++){
                var gift;
                if (i>n/2) {
                    var rx = Math.random()*(BACK_WIDTH*.8);
                    var ry = Math.random()*(BACK_HEIGHT*.8);
                    gift = new GiftBullet(rx,ry,imgList['gifttracking'],"Tracking");
                }else{
                    var rx = Math.random()*(BACK_WIDTH*.8);
                    var ry = Math.random()*(BACK_HEIGHT*.8);
                    gift = new GiftHP(rx,ry,imgList['gifthp']);
                }

                giftLayer.addChild(gift);
            }

        }
        break;

        case 3:
        {
            backgroundLayer.removeAllChild();
            var bgdata = new LBitmapData(imgList["background3"]);
            var backgroundBitmap = new LBitmap(bgdata);
            //Make background be center
            backgroundBitmap.scaleX = BACK_WIDTH/backgroundBitmap.width;
            backgroundBitmap.scaleY = BACK_HEIGHT/backgroundBitmap.height;
            backgroundLayer.addChild(backgroundBitmap);

            var vx = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
            var vy = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
            if (vx == 0&&vy==0) {
                vx = 1;
                vy = 1;
            }
            var rx = Math.random()*BACK_WIDTH;
            var ry = Math.random()*BACK_HEIGHT;
            boss3 = new Boss3('boss3',rx,ry,vx,vy,3,imgList['boss3emoji1']);

            playerLayer.addChild(boss3);

            var boss3Hp = new MsgHP(window.innerWidth - HP_DRAW_WIDTH,0,boss3,BOSS3_FULL_HP,"#4B0082");
            messageLayer.addChild(boss3Hp);


            //gift
            var n = Math.floor(Math.random()*3+2);
            for(var i=0;i<n;i++){
                var gift;
                if (i>n/2) {
                    var rx = Math.random()*(BACK_WIDTH*.8);
                    var ry = Math.random()*(BACK_HEIGHT*.8);
                    gift = new GiftBullet(rx,ry,imgList['gifttracking'],"Tracking");
                }else{
                    var rx = Math.random()*(BACK_WIDTH*.8);
                    var ry = Math.random()*(BACK_HEIGHT*.8);
                    gift = new GiftHP(rx,ry,imgList['gifthp']);
                }

                giftLayer.addChild(gift);
            }
        }
        break;
        case 4:
        {
            Win();
        }
        break;
        case 5:     //Crazy
        {
            backgroundLayer.removeAllChild();
            var randomnum = Math.floor(Math.random()*4+1);
            var bgdata = new LBitmapData(imgList["backgroundcrazy"+randomnum]);
            var backgroundBitmap = new LBitmap(bgdata);
            //Make background be center
            backgroundBitmap.scaleX = BACK_WIDTH/backgroundBitmap.width;
            backgroundBitmap.scaleY = BACK_HEIGHT/backgroundBitmap.height;
            backgroundLayer.addChild(backgroundBitmap);

            var aibulletType = "Tracking";

            if (CurrentLevel%6==0) {    //boss
                var n = 2;
                for(var i=0;i<n;i++){
                    var vx = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
                    var vy = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
                    if (vx == 0&&vy == 0) {
                        vx = 1;
                        vy = 1;
                    }
                    var rx = Math.random()*BACK_WIDTH;
                    var ry = Math.random()*BACK_HEIGHT;
                    if ((i+1)>n/2) {
                        var mboss2 = new MiddleBoss2('mboss2',rx,ry,vx,vy,4,imgList['boss2emoji1']);
                        mboss2.hp = BOSS2_FULL_HP/2;
                        mboss2.shootRateNum = 900;
                        playerLayer.addChild(mboss2);
                    }else{
                        var mboss1 = new MiddleBoss1('mboss1',rx,ry,vx,vy,1,imgList['boss1emoji2']);
                        mboss1.hp = BOSS2_FULL_HP/2;
                        playerLayer.addChild(mboss1);
                    }

                }
            }else{

                var ns = CurrentLevel%6;
                var n = ns + Math.floor(Math.random()*4+5);
                for(var i=0;i<n;i++){
                    var vx = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
                    var vy = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
                    if (vx == 0&&vy == 0) {
                        vx = 1;
                        vy = 1;
                    }
                    var rx = Math.random()*BACK_WIDTH;
                    var ry = Math.random()*BACK_HEIGHT;

                    if (CurrentLevel>5) {
                        var rn = Math.floor(Math.random()*3+1);
                        if (rn == 2) {
                            var randomnum = Math.floor(Math.random()*2+1);
                            var ai = new AIBall1('AI',rx,ry,vx,vy,4,imgList['head'+randomnum]);
                        }else{
                            var randomnum = Math.floor(Math.random()*3+1);
                            var ai = new AIBall2('AI',rx,ry,vx,vy,2,imgList['monster'+randomnum]);
                        }

                    }else{
                        var randomnum = Math.floor(Math.random()*2+1);
                        var ai = new AIBall1('AI',rx,ry,vx,vy,3,imgList['head'+randomnum]);
                    }

                    if (i>=(n/2)) {
                        ai.bulletType = aibulletType;
                    }
                    playerLayer.addChild(ai);
                }
            }

            var n = Math.floor(Math.random()*4+2);
            for(var i=0;i<n;i++){
                var gift;
                if (i>n/2) {
                    var rx = Math.random()*(BACK_WIDTH*.8);
                    var ry = Math.random()*(BACK_HEIGHT*.8);
                    gift = new GiftBullet(rx,ry,imgList['gifttracking'],"Tracking");
                }else{
                    var rx = Math.random()*(BACK_WIDTH*.8);
                    var ry = Math.random()*(BACK_HEIGHT*.8);
                    gift = new GiftHP(rx,ry,imgList['gifthp']);
                }

                giftLayer.addChild(gift);
            }
        }
        break;
        default:
        break;
    }


}

function Win() {
    IsGameOver = true;
    document.getElementById('gamewin').currentTime = 0;
    document.getElementById('gamewin').play();
    document.getElementById('gameover').pause();
    document.getElementById('bgm').pause();

    gameoverLayer = new LSprite();

    var data = new LBitmapData(imgList['gamewin']);
    var overbitmap = new LBitmap(data);
    //make it center
    gameoverLayer.x = STAGE_WIDTH/2 - backLayer.x;
    gameoverLayer.y = STAGE_HEIGHT/2 - backLayer.y;
    overbitmap.x = -overbitmap.width*.5;
    overbitmap.y = -overbitmap.height;

    backLayer.addChild(gameoverLayer);
    gameoverLayer.addChild(overbitmap);

    var btnRetry = new LButtonSample2("RETRY");
    btnRetry.x = -btnRetry.width*.5;
    btnRetry.y = btnRetry.height*2;
    btnRetry.scaleX = 1.3;
    btnRetry.scaleY = 1.3;
    btnRetry.addEventListener(LMouseEvent.MOUSE_UP,gameRetry2);
    gameoverLayer.addChild(btnRetry);

    var btnMainmenu = new LButtonSample2("MAINMENU");
    btnMainmenu.x = -btnMainmenu.width*.5;
    btnMainmenu.y = btnMainmenu.height*3.5;
    btnMainmenu.scaleX = 1.3;
    btnMainmenu.scaleY = 1.3;
    btnMainmenu.addEventListener(LMouseEvent.MOUSE_UP,gameMenu);
    gameoverLayer.addChild(btnMainmenu);

    //show sth.
    showSthTimer = setInterval(function () {
        showSth();
    }, 100);

}

function gameRetry2() {
    clearInterval(showSthTimer);
    gameRetry();
}

var showSthTimer;
function showSth() {
    var dieoffset = 100;
    var pieces = [];
    var sx = Math.random()*BACK_WIDTH;
    var sy = Math.random()*BACK_HEIGHT;
    for(var i=0;i<7;i++){

        var rx = sx + Math.random()*-dieoffset + Math.random()*dieoffset;
        var ry = sy + Math.random()*-dieoffset + Math.random()*dieoffset;
        var r = Math.floor(Math.random()*255);
        var g = Math.floor(Math.random()*255);
        var b = Math.floor(Math.random()*255);

        var color="rgb("+r+","+g+","+b+")";

        pieces[i] = new LSprite();
        pieces[i].x = rx;
        pieces[i].y = ry;
        pieces[i].graphics.drawArc(1,color,[0,0,BALL_RADIUS,0,360*Math.PI/180],true,color);
        pieces[i].addBodyCircle(BALL_RADIUS,0,0,1,0.5,1,1);
        bulletLayer.addChild(pieces[i]);

        var rvy = (Math.random()*-100+50)+(Math.random()*100-50);
        var rvx = (Math.random()*-100+50)+(Math.random()*100-50);
        var vec = new LGlobal.box2d.b2Vec2(rvx,rvy);
        pieces[i].box2dBody.ApplyForce(vec, pieces[i].box2dBody.GetWorldCenter());
    }

    setTimeout(function () {
        for(var i=0;i<pieces.length;i++){
            bulletLayer.removeChild(pieces[i]);
            pieces[i] = null;
        }
    },1500);

}
