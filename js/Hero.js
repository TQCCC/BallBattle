var HERO_FULL_HP = 12;
var HERO_SPEED = 10;
function Hero(name,sx,sy,vx,vy,speed,head_bitmapdata) {
    base(this,Ball,[name,sx,sy,vx,vy,speed,head_bitmapdata]);
    this.hp = HERO_FULL_HP;

    var gundata = new LBitmapData(imgList['herogun']);
    this.gunbitmap = new LBitmap(gundata);
    this.gunbitmap.x = this.bitmap.width/2-this.gunbitmap.width/2;
    this.gunbitmap.y = this.bitmap.height/2-this.gunbitmap.height/2;
    this.addChild(this.gunbitmap);
}

Hero.prototype.onframe = function () {
    this.callParent('onframe',arguments);
};

Hero.prototype.rotateGun = function (tovx, tovy) {
    this.gunbitmap.rotate = 90 + Math.atan2(tovy,tovx)*(180/Math.PI);
};

Hero.prototype.Shock = function () {

    var n = 6;
    var c = 0;
    var data;
    data = new LBitmapData(imgList['hurt']);
    this.bitmap.bitmapData = data;

    var t = setInterval(function () {
        if (c%2 == 0) {
            data = new LBitmapData(imgList['hurt']);
            hero.bitmap.bitmapData = data;
        }else {
            data = new LBitmapData(imgList['hero']);
            hero.bitmap.bitmapData = data;
        }

        c++;

        if (c > n) {
            data = new LBitmapData(imgList['hero']);
            hero.bitmap.bitmapData = data;
            clearInterval(t);
        }
    }, 300);

};

var heroTrackingBulletNumber = 10;
var heroTrackingBulletIndex = 0;
Hero.prototype.Shoot = function (vx, vy) {
    if(!this.IsDie){
        var b = null;
        switch(this.bulletType){
            case "Single":
                b = new SingleBullet(this.x+BALL_RADIUS,this.y+BALL_RADIUS,
                    vx,vy,BULLET_SPEED,BULLET_DEFAULT_LIFE,this.Name);
                break;
            case "Tracking":
                if (!(playerLayer.childList.length==1 && playerLayer.childList[0].Name=='hero')) {
                    if (heroTrackingBulletNumber>0) {
                        heroTrackingBulletNumber--;
                        heroTrackingBulletIndex++;
                        if (heroTrackingBulletIndex>playerLayer.childList.length-1) {
                            heroTrackingBulletIndex = 1;
                        }
                        var target = playerLayer.childList[heroTrackingBulletIndex];
                        b = new TrackingBullet(this.x+BALL_RADIUS,this.y+BALL_RADIUS,
                            vx,vy,BULLET_SPEED,BULLET_DEFAULT_LIFE,this.Name,target);
                        b.trackNum = 1;
                    }else{
                        this.bulletType = 'Single';
                    }

                }

                break;
            case "Bounce":
                b = new BounceBullet(this.x+BALL_RADIUS,this.y+BALL_RADIUS,
                    vx,vy,BULLET_SPEED,BULLET_DEFAULT_LIFE*.3,this.Name);
                break;
            default:
                break;
        }
        if (b) {
            this.bulletList.push(b);
            bulletLayer.addChild(b);
        }

    }
};
