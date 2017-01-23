var BOSS1_FULL_HP = 100;

function Boss1(name,x,y,vx,vy,speed,head_bitmapdata) {
    base(this,Ball,[name,x,y,vx,vy,speed,head_bitmapdata]);

    this.hp = BOSS1_FULL_HP;
    this.shootRateNum = 300;
    this.shootRateCounter = 0;
    this.childs = [];
    this.IsDivided = false;

}

var boss1IsShock = false;
Boss1.prototype.Shock = function () {

    if (!boss1IsShock) {
        boss1IsShock = true;
        var data = new LBitmapData(imgList['boss1hurt1']);
        this.bitmap.bitmapData = data;

        var boss1shockTimer;
        var boss1shockcounter = 1;
        var boss1shocknum = 5;

        boss1shockTimer = setInterval(function () {
            boss1shockcounter++;
            if (boss1shockcounter>boss1shocknum) {
                clearInterval(boss1shockTimer);
                boss1IsShock = false;
            }

            switch(boss1shockcounter){
                case 2:
                    data = new LBitmapData(imgList['boss1hurt2']);
                    break;
                case 3:
                    data = new LBitmapData(imgList['boss1hurt3']);
                    break;
                case 4:
                case 5:
                    data = new LBitmapData(imgList['boss1hurt4']);
                    break;
            }
            boss1.bitmap.bitmapData = data;

        }, 400);

    }

};

var IsMakingFace = false;
Boss1.prototype.makeFace = function () {
    IsMakingFace = true;

    var data = new LBitmapData(imgList['boss1emoji5']);
    this.bitmap.bitmapData = data;

    var makeFaceTimer;
    var makefacenum = 6;
    var makefacecounter = 0;

    makeFaceTimer = setInterval(function () {
        makefacecounter++;

        if (makefacecounter == 4) {
            data = new LBitmapData(imgList['boss1emoji6']);
            boss1.bitmap.bitmapData = data;
        }

        if (makefacecounter > makefacenum) {
            data = new LBitmapData(imgList['boss1emoji4']);
            boss1.bitmap.bitmapData = data;
            clearInterval(makeFaceTimer);
            IsMakingFace = false;
        }
    }, 300);

};

Boss1.prototype.shootHero = function () {
    this.bulletType = 'Single';
    this.Shoot(0,-1);
    this.Shoot(1,-1);
    this.Shoot(1,0);
    this.Shoot(1,1);
    this.Shoot(0,1);
    this.Shoot(-1,1);
    this.Shoot(-1,0);
    this.Shoot(-1,-1);
    this.bulletType = 'Tracking';
    this.Shoot(0,1);
    this.Shoot(-1,1);
    this.Shoot(-1,0);
    this.Shoot(-1,-1);
};

Boss1.prototype.Divide = function () {
    this.IsDivided = true;
    for(var key in this.bulletList){
        this.bulletList[key].Die();
    }
    for(var i=0;i<5;i++){
        var vx = Math.floor(Math.random()*30)+Math.floor(Math.random()*-30);
        var vy = Math.floor(Math.random()*30)+Math.floor(Math.random()*-30);
        if (vx == 0&&vy==0) {
            vx = 1;
            vy = 1;
        }
        var ai;
        ai = new AIBall2('AI',this.x,this.y,vx,vy,5,imgList['boss1emoji2']);
        ai.shootRateNum = 30;
        ai.scaleX = .6;
        ai.scaleY = .6;
        this.childs.push(ai);
        playerLayer.addChild(ai);
    }

};


Boss1.prototype.onframe = function () {
    if (!this.IsDivided) {
        this.callParent('onframe',arguments);

        if (this.hp<BOSS1_FULL_HP/3) {
            this.Divide();
        }

        if (this.hitTestObject(hero)) {
            hero.hp-=0.03;
        }

        this.shootRateCounter++;
        if (this.shootRateCounter == this.shootRateNum) {
            this.shootRateCounter = 0;
            this.shootHero();
        }

        var dis = Math.sqrt((this.x+this.bitmap.width/2-hero.x)*(this.x+this.bitmap.width/2-hero.x)
        + (this.y+this.bitmap.height/2-hero.y)*(this.y+this.bitmap.height/2-hero.y));
        if (dis<600) {
            this.vectorX = hero.x - this.x;
            this.vectorY = hero.y - this.y;
            this.setSpeed(6);
            if (!boss1IsShock && !IsMakingFace) {
                this.makeFace();
            }
        }

    }else{
        var alldie = true;
        for(var key in this.childs){
            if (!this.childs[key].IsDie) {
                alldie = false;
            }
        }

        if (alldie) {
            this.Die();
        }
    }


};

Boss1.prototype.Die = function () {
    this.callParent('Die',arguments);
    if (this.Name == 'boss1') {
        CurrentLevel = 0;
        BigLevel = 2;
    }
    if (messageLayer.childList[3] && messageLayer.childList[3].target.Name == this.Name) {
        messageLayer.childList[3].Die();
    }
};
