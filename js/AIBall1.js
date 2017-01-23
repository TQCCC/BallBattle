var AIBALL1_HP = 1;

function AIBall1(name,x,y,vx,vy,speed,head_bitmapdata) {
    base(this,Ball,[name,x,y,vx,vy,speed,head_bitmapdata]);

    this.shootRateNum = 60 + Math.floor(Math.random()*60);
    this.shootRateCounter = 0;
    this.shootDelay = 20;

    this.changeVectorNum = 100 + Math.floor(Math.random()*100);
    this.changeVectorCounter = 0;
    this.hp = AIBALL1_HP;
}

AIBall1.prototype.onframe = function () {
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

AIBall1.prototype.shootHero = function () {
    this.vectorX = hero.x - this.x;
    this.vectorY = hero.y - this.y;
    setTimeout(shootDelay(this),this.shootDelay);
};

function shootDelay(self) {
    self.Shoot(hero.x-self.x,hero.y-self.y);
}
