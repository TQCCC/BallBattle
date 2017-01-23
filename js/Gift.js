function Gift(x, y, bitmapdata) {
    base(this,LSprite,[]);
    this.x = x;
    this.y = y;
    this.IsDie = false;
    this.bitmapdata = new LBitmapData(bitmapdata);
    this.bitmap = new LBitmap(this.bitmapdata);

    var ra = Math.random()*90+Math.random()*-90;
    this.bitmap.rotate = ra;
    this.scaleX = 1.5;
    this.scaleY = 1.5;

    this.addChild(this.bitmap);
}

Gift.prototype.onframe = function () {

};

Gift.prototype.Die = function () {
    this.IsDie = true;
    giftLayer.removeChild(this);
};


//HPGift
function GiftHP(x, y, bitmapdata) {
    base(this,Gift,[x,y,bitmapdata]);
}
GiftHP.prototype.onframe = function () {
    if (this.hitTestObject(hero)) {
        if (hero.hp<HERO_FULL_HP) {
            hero.hp+=2.5;
            if (hero.hp>HERO_FULL_HP) {
                hero.hp = HERO_FULL_HP;
            }
            this.Die();
        }
    }
};

//BulletGift
function GiftBullet(x, y, bitmapdata, bullettype) {
    base(this,Gift,[x,y,bitmapdata]);
    this.bulletType = bullettype;
}
GiftBullet.prototype.onframe = function () {
    if (this.hitTestObject(hero)) {
        if (heroTrackingBulletNumber>0) {
            heroTrackingBulletNumber+=10;
        }else{
            heroTrackingBulletNumber = 10;
        }
        hero.bulletType = this.bulletType;
        this.Die();
    }
};
