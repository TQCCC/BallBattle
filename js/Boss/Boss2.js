var BOSS2_FULL_HP = 110;

function Boss2(name,x,y,vx,vy,speed,head_bitmapdata) {
    base(this,Ball,[name,x,y,vx,vy,speed,head_bitmapdata]);
    this.hp = BOSS2_FULL_HP;
    this.shootRateNum = 400;
    this.shootRateCounter = 0;
    this.IsDivided = false;
    this.childs = [];
    this.changface = 0;

}

Boss2.prototype.onframe = function () {
    if (!this.IsDivided) {
        this.callParent('onframe',arguments);

        if (this.hitTestObject(hero)) {
            hero.hp-=0.03;
        }

        this.shootRateCounter++;
        if (this.shootRateCounter == this.shootRateNum) {
            if (this.changface == 0) {
                this.changface = 1;
                var data = new LBitmapData(imgList['boss2emoji4']);
                this.bitmap.bitmapData = data;
            }else{
                this.changface = 0;
                var data = new LBitmapData(imgList['boss2emoji1']);
                this.bitmap.bitmapData = data;
            }
            this.shootRateCounter = 0;
            this.Divide();
        }
    }else{
        var alldie = true;
        for(var key in this.childs){
            if (!this.childs[key].IsDie) {
                alldie = false;
            }
        }

        if (alldie) {
            this.IsDivided = false;
        }
    }


};

Boss2.prototype.shootHero = function () {

};

Boss2.prototype.Divide = function () {

    this.IsDivided = true;

    for(var i=0;i<6;i++){
        var vx = Math.floor(Math.random()*30)+Math.floor(Math.random()*-30);
        var vy = Math.floor(Math.random()*30)+Math.floor(Math.random()*-30);
        if (vx == 0&&vy==0) {
            vx = 1;
            vy = 1;
        }
        var ai;
        if (this.hp<BOSS2_FULL_HP/2) {
            ai = new AIBall2('AI',this.x,this.y,vx,vy,6,imgList['boss2emoji3']);
            ai.shootRateNum = 30;

        }else{
            ai = new AIBall2('AI',this.x,this.y,vx,vy,5,imgList['boss1hurt4']);
            ai.shootRateNum = 50;
        }
        ai.bitmap.scaleX = 0.6;
        ai.bitmap.scaleY = 0.6;
        if (i>3) {
            ai.bulletType = "Tracking";
        }
        this.childs.push(ai);
        playerLayer.addChild(ai);
    }
};

var boss2IsShock = false;
Boss2.prototype.Shock = function () {

    if (!boss2IsShock) {
        boss2IsShock = true;

        var data = new LBitmapData(imgList['boss2emoji2']);
        this.bitmap.bitmapData = data;

        var boss2hockTimer;
        var boss2shockcounter = 1;
        var boss2shocknum = 5;

        boss2shockTimer = setInterval(function () {
            boss2shockcounter++;
            if (boss2shockcounter>boss2shocknum) {
                clearInterval(boss2shockTimer);
                boss2IsShock = false;
            }

            switch(boss2shockcounter){
                case 2:
                    data = new LBitmapData(imgList['boss2emoji3']);
                    break;
                case 3:
                    data = new LBitmapData(imgList['boss2emoji5']);
                    break;
                case 4:
                case 5:
                    data = new LBitmapData(imgList['boss2emoji6']);
                    break;
            }
            boss2.bitmap.bitmapData = data;
        }, 400);
    }

};

Boss2.prototype.Die = function () {
    this.callParent('Die',arguments);
    if (this.Name == 'boss2') {
        CurrentLevel = 0;
        BigLevel = 3;
    }
    if (messageLayer.childList[3] && messageLayer.childList[3].target.Name == this.Name) {
        messageLayer.childList[3].Die();
    }
};
