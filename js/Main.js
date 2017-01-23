var imgList = {};
var ballDieSound = new LSound();
ballDieSound.load("./sound/balldie.wav");
var bossCollisionSound = new LSound();
bossCollisionSound.load("./sound/bosscollision.wav");

var imgData = new Array(
    {name:"gameover",path:"images/gameover.png"},
    {name:"gamewin",path:"images/gamewin.png"},
    {name:"pausebutton",path:"images/pausebutton.png"},
    {name:"continue",path:"images/continue.png"},

    {name:"background1",path:"images/background2.jpg"},
    {name:"background2",path:"images/background9.jpg"},
    {name:"background3",path:"images/background1.jpg"},
    {name:"backgroundcrazy1",path:"images/background6.jpg"},
    {name:"backgroundcrazy2",path:"images/background7.jpg"},
    {name:"backgroundcrazy3",path:"images/background8.jpg"},
    {name:"backgroundcrazy4",path:"images/background9.jpg"},

    {name:"hero",path:"images/hero.png"},
    {name:"herogun",path:"images/herogun.png"},

    {name:"hurt",path:"images/hurt.png"},
    {name:"head1",path:"images/head1.png"},
    {name:"head2",path:"images/head2.png"},
    {name:"monster1",path:"images/monster1.png"},
    {name:"monster2",path:"images/monster2.png"},
    {name:"monster3",path:"images/monster3.png"},

    {name:"gifthp",path:"images/gifthp.png"},
    {name:"gifttracking",path:"images/gifttracking.png"},

    {name:"singlebullet",path:"images/singlebullet.png"},
    {name:"bouncebullet",path:"images/bouncebullet.png"},
    {name:"trackbullet",path:"images/trackbullet.png"},

    {name:"boss1emoji1",path:"images/boss/boss1emoji1.png"},
    {name:"boss1emoji2",path:"images/boss/boss1emoji2.png"},
    {name:"boss1emoji3",path:"images/boss/boss1emoji3.png"},
    {name:"boss1emoji4",path:"images/boss/boss1emoji4.png"},
    {name:"boss1emoji5",path:"images/boss/boss1emoji5.png"},
    {name:"boss1emoji6",path:"images/boss/boss1emoji6.png"},
    {name:"boss1hurt1",path:"images/boss/boss1hurt1.png"},
    {name:"boss1hurt2",path:"images/boss/boss1hurt2.png"},
    {name:"boss1hurt3",path:"images/boss/boss1hurt3.png"},
    {name:"boss1hurt4",path:"images/boss/boss1hurt4.png"},

    {name:"boss2emoji1",path:"images/boss/boss2emoji1.png"},
    {name:"boss2emoji2",path:"images/boss/boss2emoji2.png"},
    {name:"boss2emoji3",path:"images/boss/boss2emoji3.png"},
    {name:"boss2emoji4",path:"images/boss/boss2emoji4.png"},
    {name:"boss2emoji5",path:"images/boss/boss2emoji5.png"},
    {name:"boss2emoji6",path:"images/boss/boss2emoji6.png"},

    {name:"boss3emoji1",path:"images/boss/boss3emoji1.png"},
    {name:"boss3emoji2",path:"images/boss/boss3emoji2.png"},
    {name:"boss3emoji3",path:"images/boss/boss3emoji3.png"},
    {name:"boss3emoji4",path:"images/boss/boss3emoji4.png"},
    {name:"boss3emoji5",path:"images/boss/boss3emoji5.png"}
);

var backLayer,loadingLayer,gameoverLayer;
var backgroundLayer;
var messageLayer;

var playerLayer,bulletLayer,giftLayer;
var hero;

var levelText;
var hpRect;
var pauseButton;

var boss1;
var boss2;
var boss3;

var IsGameOver = false;
var IsEnterNextLevel = false;
var BigLevel = 1;
var CurrentLevel = 0;

var IsPause = false;

function main() {

    LGlobal.box2d =  new LBox2d([0,0]);
    // LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    LSystem.screen(LStage.FULL_SCREEN);

    backLayer = new LSprite();
    backLayer.graphics.drawRect(1,'#fff',[0,0,BACK_WIDTH,BACK_HEIGHT],1,"#000");
    addChild(backLayer);

    loadingLayer = new LoadingSample5(50);
    backLayer.addChild(loadingLayer);
    LLoadManage.load(
        imgData,
        function (progress) {
            loadingLayer.setProgress(progress);
        },
        gameInit
    );

}

function gameInit(result) {
    imgList = result;
    backLayer.removeChild(loadingLayer);
    loadingLayer = null;

    //background
    backgroundLayer = new LSprite();
    backLayer.addChild(backgroundLayer);
    var bgdata = new LBitmapData(imgList["background1"]);
    var backgroundBitmap = new LBitmap(bgdata);
    //Make background be center
    backgroundBitmap.scaleX = BACK_WIDTH/backgroundBitmap.width;
    backgroundBitmap.scaleY = BACK_HEIGHT/backgroundBitmap.height;
    backgroundLayer.addChild(backgroundBitmap);

    //Init layers.
    giftLayer = new LSprite();
    backLayer.addChild(giftLayer);

    playerLayer = new LSprite();
    backLayer.addChild(playerLayer);

    bulletLayer = new LSprite();
    backLayer.addChild(bulletLayer);

    messageLayer = new LSprite();
    backLayer.addChild(messageLayer);

    //Init players
    hero = new Hero('hero',100,100,0,0,HERO_SPEED,imgList['hero']);
    playerLayer.addChild(hero);

    hpRect = new MsgHP(0,0,hero,HERO_FULL_HP,"#8B0000");
    messageLayer.addChild(hpRect);

    levelText = new MsgText(HP_DRAW_WIDTH+20,0);
    levelText.size = 40;
    levelText.weight = "bolder";
    levelText.color = "#000";
    messageLayer.addChild(levelText);

    pauseButton = new MsgButton(20,STAGE_HEIGHT-90,imgList['pausebutton']);
    pauseButton.addEventListener(LMouseEvent.MOUSE_UP,gamePause);
    messageLayer.addChild(pauseButton);

    // NextLevel();

    //Initial events.
    LGlobal.stage.addEventListener(LKeyboardEvent.KEY_DOWN,onkeydown);
    LGlobal.stage.addEventListener(LKeyboardEvent.KEY_UP,onkeyup);
    backLayer.addEventListener(LMouseEvent.MOUSE_UP,mouseup);
    backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
    backLayer.addEventListener(LMouseEvent.MOUSE_MOVE,mousemove);

    backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);

}

function gamePause() {
    if (IsGameOver) {
        return;
    }
    if (!IsPause) {
        IsPause = true;
        document.getElementById('bgm').pause();
        var data = new LBitmapData(imgList['continue']);
        pauseButton.bitmap.bitmapData = data;

        if (gameoverLayer) {
            gameoverLayer.removeAllChild();
        }
        gameoverLayer = new LSprite();
        //make it center
        gameoverLayer.x = STAGE_WIDTH/2 - backLayer.x;
        gameoverLayer.y = STAGE_HEIGHT/2 - backLayer.y;
        backLayer.addChild(gameoverLayer);
        var show = new LTextField();
        show.x = -show.width*1.2;
        show.y = -show.height*6;
        show.size = 150;
        show.weight = "bolder";
        show.color = "#FFD700";
        show.font = "黑体";
        show.text = "PAUSE";
        gameoverLayer.addChild(show);

        var btnRetry = new LButtonSample2("RETRY");
        btnRetry.x = -btnRetry.width*.5;
        btnRetry.y = btnRetry.height*2;
        btnRetry.scaleX = 1.3;
        btnRetry.scaleY = 1.3;
        btnRetry.addEventListener(LMouseEvent.MOUSE_UP,gameRetry);
        gameoverLayer.addChild(btnRetry);

        var btnMainmenu = new LButtonSample2("MAINMENU");
        btnMainmenu.x = -btnMainmenu.width*.5;
        btnMainmenu.y = btnMainmenu.height*3.5;
        btnMainmenu.scaleX = 1.3;
        btnMainmenu.scaleY = 1.3;
        btnMainmenu.addEventListener(LMouseEvent.MOUSE_UP,gameMenu);
        gameoverLayer.addChild(btnMainmenu);

    }else{
        IsPause = false;
        document.getElementById('bgm').play();
        var data = new LBitmapData(imgList['pausebutton']);
        pauseButton.bitmap.bitmapData = data;

        if (gameoverLayer) {
            gameoverLayer.removeAllChild();
            backLayer.removeChild(gameoverLayer);
            gameoverLayer = null;
        }
    }
}

var KEY = {LEFT:65,RIGHT:68,UP:87,DOWN:83,SPEEDUP:32};
var IsRight = false;
var IsLeft = false;
var IsUp = false;
var IsDown = false;
var IsSpeedUp = false;
function onkeydown(event) {
    switch(event.keyCode){
        case KEY.UP:
            IsUp = true;
            break;
        case KEY.DOWN:
            IsDown = true;
            break;
        case KEY.LEFT:
            IsLeft = true;
            break;
        case KEY.RIGHT:
            IsRight = true;
            break;
        case KEY.SPEEDUP:
            IsSpeedUp = true;
            break;
        case 27:    //ESC
            gamePause();
            break;
    }

}

function onkeyup(event) {

    switch(event.keyCode){
        case KEY.UP:
            IsUp = false;
            break;
        case KEY.DOWN:
            IsDown = false;
            break;
        case KEY.LEFT:
            IsLeft = false;
            break;
        case KEY.RIGHT:
            IsRight = false;
            break;
        case KEY.SPEEDUP:
            IsSpeedUp = false;
            break;
    }

}

function mouseup(event) {
    IsMouseDown = false;
    heroShootCounter = 0;

    var ox = messageLayer.childList[2].x;
    var oy = messageLayer.childList[2].y;
    var ow = messageLayer.childList[2].bitmap.width;
    var oh = messageLayer.childList[2].bitmap.height;
    //no shoot when click the pause button.
    if(event.offsetY<oy||event.offsetY>oy+oh||event.offsetX<ox||event.offsetX>ox+ow){
        hero.Shoot(mouseX-hero.x,mouseY-hero.y);
    }
}

var IsMouseDown = false;
var heroShootNumber = 10;
var heroShootCounter =  0;
var mouseX = 0;
var mouseY = 0;
function mousedown(event) {
    mouseX = event.offsetX - backLayer.x;
    mouseY = event.offsetY - backLayer.y;

    var ox = messageLayer.childList[2].x;
    var oy = messageLayer.childList[2].y;
    var ow = messageLayer.childList[2].bitmap.width;
    var oh = messageLayer.childList[2].bitmap.height;
    //no shoot when click the pause button.
    if(event.offsetY<oy||event.offsetY>oy+oh||event.offsetX<ox||event.offsetX>ox+ow){
        if (!(IsGameOver||IsPause)) {
            IsMouseDown = true;
        }
    }
}

function mousemove(event) {
    mouseX = event.offsetX - backLayer.x;
    mouseY = event.offsetY - backLayer.y;

    hero.rotateGun(mouseX-hero.x,mouseY-hero.y);
}

function onframe() {

    // camera move
    backLayer.x = LGlobal.width*0.5 - hero.x;
    if (backLayer.x>0) {
        backLayer.x=0;
    }else if (backLayer.x<LGlobal.width - BACK_WIDTH) {
        backLayer.x = LGlobal.width - BACK_WIDTH;
    }

    backLayer.y = LGlobal.height*0.5 - hero.y;
    if (backLayer.y>0) {
        backLayer.y=0;
    }else if (backLayer.y<LGlobal.height - BACK_HEIGHT) {
        backLayer.y = LGlobal.height - BACK_HEIGHT;
    }

    if (hero.IsDie && !IsGameOver) {
        gameOver();
        return;
    }

    if (playerLayer.childList.length == 1 && playerLayer.childList[0].Name == 'hero' && !IsGameOver) {
        if (!IsEnterNextLevel) {
            IsEnterNextLevel = true;
            setTimeout(function () {
                NextLevel();
                IsEnterNextLevel = false;
            }, 3000);
        }
    }

    if (!IsPause) {

        showMessage();
        heroControl();

        var ball;
        for(var key in playerLayer.childList){
            ball = playerLayer.childList[key];
            if (!ball.IsDie) {
                ball.onframe();
            }
        }

        var gift;
        for(var key in giftLayer.childList){
            gift = giftLayer.childList[key];
            if (!gift.IsDie) {
                gift.onframe();
            }
        }


    }

}

function heroControl() {
    if (IsMouseDown) {
        if (heroShootCounter == heroShootNumber) {
            hero.Shoot(mouseX-hero.x,mouseY-hero.y);
            heroShootCounter = 0;
        }
        heroShootCounter++;
    }
    var vx = 0;
    var vy = 0;
    var speed = HERO_SPEED;
    if (IsUp) {
        vy = -10;
    }
    if (IsDown) {
        vy = 10;
    }
    if (IsLeft) {
        vx = -10;
    }
    if (IsRight) {
        vx = 10;
    }
    if(IsSpeedUp){
        speed = HERO_SPEED+4;
    }
    hero.vectorX = vx;
    hero.vectorY = vy;
    hero.setSpeed(speed);
}

function showMessage() {
    messageLayer.x = -backLayer.x;
    messageLayer.y = -backLayer.y;

    for(var key in messageLayer.childList){
        var msg = messageLayer.childList[key];
        if (!msg.IsDie) {
            msg.onframe();
        }
    }

}

function gameOver() {
    IsGameOver = true;

    document.getElementById('gameover').currentTime = 0;
    document.getElementById('gameover').play();
    document.getElementById('bgm').pause();
    document.getElementById('gamewin').pause();

    gameoverLayer = new LSprite();

    var data = new LBitmapData(imgList['gameover']);
    var overbitmap = new LBitmap(data);
    //make it center
    gameoverLayer.x = STAGE_WIDTH/2 - backLayer.x;
    gameoverLayer.y = STAGE_HEIGHT/2 - backLayer.y;
    overbitmap.x = -overbitmap.width*.5;
    overbitmap.y = -overbitmap.height*.5;

    backLayer.addChild(gameoverLayer);
    gameoverLayer.addChild(overbitmap);

    var t = setInterval(function () {
        gameoverLayer.scaleX+=0.05;
        gameoverLayer.scaleY+=0.05;

        if (gameoverLayer.scaleX>=1.7) {

            if (BigLevel==5) {
                var show = new LTextField();
            	show.size = 70;
            	show.weight = "bolder";
            	show.color = "#000";
                show.font = "黑体";
                show.setWordWrap(true);
                show.text = "GAME OVER \n LEVEL:" + CurrentLevel;
                show.width = 400;
                show.x = -show.width*.4;
                show.y = -50;
                gameoverLayer.addChild(show);
                show.wind();
                setTimeout(function () {
                    gameoverLayer.removeChild(overbitmap);

                    //connect to server
                    var showServerLayer = new LSprite();
                    showServerLayer.graphics.drawRect(1,'#fff',[0,0,280,350],1,"#000");
                    showServerLayer.alpha = .8;
                    showServerLayer.x = -350;
                    showServerLayer.y = -180;
                    gameoverLayer.addChild(showServerLayer);

                    var showRank = new LTextField();
                    showRank.width = 600;
                    showRank.x = 0;
                    showRank.y = 0;
                    showRank.color = "#fff";
                    showRank.size = 10;
                    showRank.font = "宋体";
                    showRank.text = "正在读取排名...\n连接服务器中...";
                    showRank.setWordWrap(true);
                    get_rank(showRank);
                    showServerLayer.addChild(showRank);

                    var txtName = new LTextField();
                    txtName.setType(LTextFieldType.INPUT);
                    txtName.text = "YOURNAME";
                    txtName.x = -txtName.width*.4;
                    txtName.y = -txtName.height*7;

                    var btnYes = new LButtonSample2("确定");
                    btnYes.x = -btnYes.width*.5-40;
                    btnYes.y = -80;
                    btnYes.addEventListener(LMouseEvent.MOUSE_UP,function (e) {
                        if (txtName.text == "") {
                            alert("请填写昵称");
                            return;
                        }
                        if (txtName.text.length>14) {
                            alert("昵称长度请小于14字符！");
                            return;
                        }
                        showRank.text += "排名数据上传中...";
                        add_rank(txtName.text,CurrentLevel,showRank);
                        gameoverLayer.removeChild(btnYes);
                        gameoverLayer.removeChild(btnNo);
                        gameoverLayer.removeChild(txtName);

                    });
                    var btnNo = new LButtonSample2("取消");
                    btnNo.x = -btnNo.width*.5+40;
                    btnNo.y = -80;
                    btnNo.addEventListener(LMouseEvent.MOUSE_UP,function (e) {
                        gameoverLayer.removeChild(btnYes);
                        gameoverLayer.removeChild(btnNo);
                        gameoverLayer.removeChild(txtName);
                    });

                    gameoverLayer.addChild(btnYes);
                    gameoverLayer.addChild(btnNo);
                    gameoverLayer.addChild(txtName);

                }, 1000);


            }

            var btnRetry = new LButtonSample2("RETRY");
            btnRetry.x = -btnRetry.width*.5;
            btnRetry.y = btnRetry.height*2;
            btnRetry.addEventListener(LMouseEvent.MOUSE_UP,gameRetry);
            gameoverLayer.addChild(btnRetry);

            var btnMainmenu = new LButtonSample2("MAINMENU");
            btnMainmenu.x = -btnMainmenu.width*.5;
            btnMainmenu.y = btnMainmenu.height*3.5;
            btnMainmenu.addEventListener(LMouseEvent.MOUSE_UP,gameMenu);
            gameoverLayer.addChild(btnMainmenu);

            clearInterval(t);
        }
    }, 30);
}

function gameMenu() {
    window.location.reload();
}

function gameRetry() {
    IsGameOver = false;

    if (IsPause) {
        IsPause = false;
        var data = new LBitmapData(imgList['pausebutton']);
        pauseButton.bitmap.bitmapData = data;
    }

    document.getElementById('bgm').currentTime = 0;
    document.getElementById('bgm').play();
    document.getElementById('gameover').pause();
    document.getElementById('gamewin').pause();

    bulletLayer.removeAllChild();
    playerLayer.removeAllChild();
    giftLayer.removeAllChild();

    if (gameoverLayer) {
        gameoverLayer.removeAllChild();
        backLayer.removeChild(gameoverLayer);
        gameoverLayer = null;
    }

    hero = new Hero('hero',100,100,0,5,HERO_SPEED,imgList['hero']);
    playerLayer.addChild(hero);

    hpRect.target = hero;
    for(var key in messageLayer.childList){
        if (key>2) {
            if (messageLayer.childList[key]) {
                messageLayer.childList[key].Die();
            }
        }
    }

    if (BigLevel != 5) {
        BigLevel = 1;
    }
    CurrentLevel = 0;

    // NextLevel();
}
