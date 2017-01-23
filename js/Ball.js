var BALL_RADIUS = 10;

function Ball(name,sx,sy,vx,vy,speed,head_bitmapdata) {
    base(this,LSprite,[]);

    this.Name = name;
    this.x = sx;
    this.y = sy;
    this.vectorX = vx;
    this.vectorY = vy;
    this.Speed = speed;

    this.IsDie = false;
    this.bulletType = "Single";
    this.bulletList = [];

    this.bitmapdata_head = new LBitmapData(head_bitmapdata);
    this.bitmap = new LBitmap(this.bitmapdata_head);
    this.addChild(this.bitmap);

}

Ball.prototype.onframe = function () {

    var nx = this.x;
    var ny = this.y;
    //撞墙反弹
    if (nx<=0 || (nx+BALL_RADIUS*2>=BACK_WIDTH)){
        if (nx<=0) {
            this.x+=BALL_RADIUS*.5;
        }else{
            this.x-=BALL_RADIUS*.5;
        }

        this.vectorX = -this.vectorX;
        this.vectorY = this.vectorY*Math.random()*50;
    }
    if (ny<=0 || (ny+BALL_RADIUS*2>=BACK_HEIGHT)) {
        if (ny<=0) {
            this.y+=BALL_RADIUS*.5;
        }else{
            this.y-=BALL_RADIUS*.5;
        }

        this.vectorY = -this.vectorY;
        this.vectorX = this.vectorX*Math.random()*50;
    }

    if(this.bulletList.length != 0){
        var blist = this.bulletList;
        for(var i=0;i<blist.length;i++){
            if(blist[i].IsDie){
                this.bulletList.splice(i,1);
            }else {
                blist[i].onframe();
            }
        }
    }

    var vx = this.vectorX;
    var vy = this.vectorY;

    if(vx==0 && vy==0){
        return;
    }

    var dx = (this.Speed*vx)/(Math.sqrt(vx*vx+vy*vy));
    var dy = (this.Speed*vy)/(Math.sqrt(vx*vx+vy*vy));

    this.x+=dx;
    this.y+=dy;

    if (this.Name == 'hero') {
        this.bitmap.rotate = 90 + Math.atan2(this.vectorY,this.vectorX)*(180/Math.PI);
        // this.gunbitmap.rotate = 90 + Math.atan2(this.vectorY,this.vectorX)*(180/Math.PI);
    }
};

Ball.prototype.setDirection = function (dx, dy) {
    this.vectorX = dx;
    this.vectorY = dy;
};

Ball.prototype.Die = function () {
    ballDieSound.play(0,1);

    this.IsDie = true;
    playerLayer.removeChild(this);

    for(var key in this.bulletList){
        bulletLayer.removeChild(this.bulletList[key]);
        this.bulletList[key] = null;
    }

    var dieoffset = 100;
    var pieces = [];
    for(var i=0;i<9;i++){

        var rx = this.x + Math.random()*-dieoffset + Math.random()*dieoffset;
        var ry = this.y + Math.random()*-dieoffset + Math.random()*dieoffset;

        var color="#000000";

        pieces[i] = new LSprite();
        pieces[i].x = rx;
        pieces[i].y = ry;
        pieces[i].graphics.drawArc(1,color,[0,0,BALL_RADIUS*.6,0,360*Math.PI/180],true,color);
        pieces[i].addBodyCircle(BALL_RADIUS*.6,0,0,1,0.5,1,1);
        bulletLayer.addChild(pieces[i]);

        var rvy = Math.random()*-10+Math.random()*10;
        var rvx = Math.random()*-10+Math.random()*10;
        var vec = new LGlobal.box2d.b2Vec2(rvx,rvy);
	    pieces[i].box2dBody.ApplyForce(vec, pieces[i].box2dBody.GetWorldCenter());
    }

    setTimeout(function () {
        for(var i=0;i<pieces.length;i++){
            bulletLayer.removeChild(pieces[i]);
            pieces[i] = null;
        }
    },500);
};

Ball.prototype.setSpeed = function (new_speed) {
    this.Speed = new_speed;
};

Ball.prototype.Shoot = function (vx, vy) {
    if(!this.IsDie){
        var b;
        switch(this.bulletType){
            case "Single":
                b = new SingleBullet(this.x+BALL_RADIUS,this.y+BALL_RADIUS,
                    vx,vy,BULLET_SPEED,BULLET_DEFAULT_LIFE,this.Name);
                this.bulletList.push(b);
                break;
            case "Tracking":
                b = new TrackingBullet(this.x+BALL_RADIUS,this.y+BALL_RADIUS,
                    vx,vy,BULLET_SPEED*.6,BULLET_DEFAULT_LIFE,this.Name,hero);
                this.bulletList.push(b);
                break;
            case "Bounce":
                b = new BounceBullet(this.x+BALL_RADIUS,this.y+BALL_RADIUS,
                    vx,vy,BULLET_SPEED,BULLET_DEFAULT_LIFE*.3,this.Name);
                this.bulletList.push(b);
                break;
            default:
                break;
        }
        if (b) {
            bulletLayer.addChild(b);
        }

    }
};
