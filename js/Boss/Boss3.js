var BOSS3_FULL_HP = 120;

function Boss3(name,x,y,vx,vy,speed,head_bitmapdata) {
    base(this,Ball,[name,x,y,vx,vy,speed,head_bitmapdata]);
    this.hp = BOSS3_FULL_HP;
    this.shootRateNum = 500;
    this.shootRateCounter = 0;
    this.IsDivided = false;
    this.childs = [];
    this.shockFlag = 0;
}

Boss3.prototype.onframe = function () {
    if (!this.IsDivided) {
        this.callParent('onframe',arguments);

        if (this.hitTestObject(hero)) {
            hero.hp-=0.04;
        }

        this.shootRateCounter++;
        if (this.shootRateCounter == this.shootRateNum) {

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

Boss3.prototype.shootHero = function () {

};

Boss3.prototype.Divide = function () {

    this.IsDivided = true;

    var vx = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
    var vy = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
    if (vx == 0&&vy==0) {
        vx = 1;
        vy = 1;
    }

    boss1 = new Boss1('boss1',this.x,this.y,vx,vy,3,imgList['boss1emoji4']);
    boss1.hp = BOSS1_FULL_HP/2;
    playerLayer.addChild(boss1);
    this.childs.push(boss1);

    vx = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
    vy = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
    if (vx == 0&&vy==0) {
        vx = 1;
        vy = 1;
    }

    boss2 = new Boss2('boss2',this.x,this.y,vx,vy,3,imgList['boss2emoji1']);
    boss2.hp = BOSS2_FULL_HP/3;

    playerLayer.addChild(boss2);
    this.childs.push(boss2);

    if (this.hp<BOSS3_FULL_HP/3) {
        vx = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
        vy = Math.floor(Math.random()*100)+Math.floor(Math.random()*-100);
        if (vx == 0&&vy==0) {
            vx = 1;
            vy = 1;
        }
        var mboss1 = new MiddleBoss1('mboss1',this.x,this.y,vx,vy,1,imgList['boss1emoji2']);
        mboss1.hp = BOSS2_FULL_HP/2;
        playerLayer.addChild(mboss1);
    }

    //bonus
    for(var i=0;i<2;i++){
        var gift;
        if (i==0) {
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

};

Boss3.prototype.Shock = function () {
    if (this.shockFlag>4) {
        this.shockFlag = 0;
    }
    this.shockFlag++;
    var data = null;
    switch(this.shockFlag){
        case 1:
            data = new LBitmapData(imgList['boss3emoji2']);
        break;

        case 2:
            data = new LBitmapData(imgList['boss3emoji3']);
        break;

        case 3:
            data = new LBitmapData(imgList['boss3emoji4']);
        break;
        case 4:
            data = new LBitmapData(imgList['boss3emoji5']);
        break;

        default:
            data = new LBitmapData(imgList['boss3emoji1']);
        break;
    }
    this.bitmap.bitmapData = data;

};

Boss3.prototype.Die = function () {
    this.callParent('Die',arguments);
    CurrentLevel = 0;
    BigLevel = 4;
    messageLayer.childList[3].Die();
};
