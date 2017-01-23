var BULLET_SPEED = 10;
var BULLET_RADIUS = 10;
var BULLET_DEFAULT_LIFE = 500;
function Bullet(x,y,vx,vy,speed,life,belong) {
    base(this,LSprite,[]);
    this.x = x;
    this.y = y;
    this.belong = belong;
    this.vectorX = vx;
    this.vectorY = vy;
    this.IsDie = false;
    this.lifeFrames = life;
    this.Speed = speed;

}
Bullet.prototype.onframe = function () {

    this.lifeFrames--;

    if(this.lifeFrames <= 0){
        this.Die();
        return;
    }

    //kill detection
    var ball;
    for (var key in playerLayer.childList) {
        ball = playerLayer.childList[key];
        if((ball.Name != this.belong) && this.hitTestObject(ball)){
            this.Die();
            var ballname = ball.Name;
            if (ballname == 'hero') {
                if (BigLevel==5) {
                    var o = CurrentLevel/10;
                    ball.hp-=o;
                }else{
                    ball.hp--;
                }
                ball.Shock();
                if (ball.hp<=0) {
                    ball.Die();
                }

            }else if(ballname=='boss1' || ballname=='boss2' || ballname=='boss3'
             || ballname=='mboss1' || ballname=='mboss2'){
                 bossCollisionSound.play(0,1);
                if (!ball.IsDivided) {
                    ball.hp--;
                    ball.Shock();
                    if (ball.hp<=0) {
                        ball.Die();
                    }
                }

            }else{
                if (BigLevel == 5) {
                    ball.Die();
                }else{
                    ball.hp--;
                    if (ball.hp<=0) {
                        ball.Die();
                    }
                }

            }

            return;
    	}
    }

    var vx = this.vectorX;
    var vy = this.vectorY;
    if(vx==0 && vy==0){
        return;
    }
    dx = (this.Speed*vx)/(Math.sqrt(vx*vx+vy*vy));
    dy = (this.Speed*vy)/(Math.sqrt(vx*vx+vy*vy));

    this.x += dx;
    this.y += dy;
    this.bitmap.rotate = 90 + Math.atan2(this.vectorY,this.vectorX)*(180/Math.PI);

};
Bullet.prototype.Die = function () {
    this.IsDie = true;
    bulletLayer.removeChild(this);
};

function SingleBullet(x,y,vx,vy,speed,life,belong) {
    base(this,Bullet,[x,y,vx,vy,speed,life,belong]);

    var bitmapdata = new LBitmapData(imgList['singlebullet']);
    this.bitmap = new LBitmap(bitmapdata);
    this.addChild(this.bitmap);
}

function BounceBullet(x,y,vx,vy,speed,life,belong) {
    base(this,Bullet,[x,y,vx,vy,speed,life,belong]);

    var bitmapdata = new LBitmapData(imgList['bouncebullet']);
    this.bitmap = new LBitmap(bitmapdata);
    this.addChild(this.bitmap);
}
BounceBullet.prototype.onframe = function () {

    //撞墙反弹
    var nx = this.x;
    var ny = this.y;
    //撞墙反弹
    if (nx<=0 || (nx+BALL_RADIUS*2>=BACK_WIDTH)){
        if (nx<=0) {
            this.x+=BALL_RADIUS*2;
        }else{
            this.x-=BALL_RADIUS*2;
        }

        this.vectorX = -this.vectorX;
        this.vectorY = this.vectorY*Math.random();
    }
    if (ny<=0 || (ny+BALL_RADIUS*2>=BACK_HEIGHT)) {
        if (ny<=0) {
            this.y+=BALL_RADIUS*2;
        }else{
            this.y-=BALL_RADIUS*2;
        }

        this.vectorY = -this.vectorY;
        this.vectorX = this.vectorX*Math.random();
    }

    this.callParent('onframe',arguments);

};

function TrackingBullet(x,y,vx,vy,speed,life,belong,target) {
    base(this,Bullet,[x,y,vx,vy,speed,life,belong]);

    var bitmapdata = new LBitmapData(imgList['trackbullet']);
    this.bitmap = new LBitmap(bitmapdata);
    this.addChild(this.bitmap);

    this.target = target;

    this.trackNum = 40;
    this.trackCounter = 0;
}
TrackingBullet.prototype.onframe = function () {

    if (this.target.IsDie) {
        this.Die();
        return;
    }
    //Tracking
    this.trackCounter++;
    if (this.trackCounter == this.trackNum) {
        this.trackCounter = 0;
        this.vectorX = this.target.x - this.x;
        this.vectorY = this.target.y - this.y;
    }

    this.callParent('onframe',arguments);
};
