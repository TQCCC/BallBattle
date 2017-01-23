var AIBALL2_HP = 2;

function AIBall2(name,x,y,vx,vy,speed,head_bitmapdata) {
    base(this,Ball,[name,x,y,vx,vy,speed,head_bitmapdata]);
    this.shootRateNum = 60 + Math.floor(Math.random()*60);
    this.shootRateCounter = 0;

    this.changeVectorNum = 100 + Math.floor(Math.random()*100);
    this.changeVectorCounter = 0;
    this.hp = AIBALL2_HP;
}

AIBall2.prototype.onframe = function () {
    this.callParent('onframe',arguments);
    this.bitmap.rotate = 90 + Math.atan2(this.vectorY,this.vectorX)*(180/Math.PI);

    if (this.hitTestObject(hero)) {
        hero.hp-=0.008;
    }

    if (!hero.IsDie) {
        this.shootRateCounter++;
        if (this.shootRateCounter == this.shootRateNum) {
            this.shootRateCounter = 0;
            this.shootHero();
        }
    }

    this.changeVectorCounter++;
    if (this.changeVectorCounter == this.changeVectorNum) {
        this.changeVectorCounter = 0;
        var vx = Math.floor(Math.random()*30)+Math.floor(Math.random()*-30);
        var vy = Math.floor(Math.random()*30)+Math.floor(Math.random()*-30);
        this.vectorX = vx;
        this.vectorY = vy;
    }
};

AIBall2.prototype.shootHero = function () {
    this.vectorX = hero.x - this.x;
    this.vectorY = hero.y - this.y;
    this.Shoot(hero.x-this.x,hero.y-this.y);
};

AIBall2.prototype.Die = function () {
    this.callParent('Die',arguments);
    var n = Math.floor(Math.random()*2+1);
    if (n == 2) {
        var dai1 = new AIBall1('AI',this.x,this.y,1,-1,3,imgList['head1']);
        var dai2 = new AIBall1('AI',this.x,this.y,-1,1,3,imgList['head1']);
        playerLayer.addChild(dai1);
        playerLayer.addChild(dai2);
    }

};
