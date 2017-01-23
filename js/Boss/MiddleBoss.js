function MiddleBoss1(name,x,y,vx,vy,speed,head_bitmapdata) {
    base(this,Boss1,[name,x,y,vx,vy,speed,head_bitmapdata]);
    this.IsDie = false;
    this.shockFlag = 0;
}

MiddleBoss1.prototype.Shock = function () {
    if (this.shockFlag == 0) {
        this.shockFlag = 1;
        var data = new LBitmapData(imgList['boss1hurt2']);
        this.bitmap.bitmapData = data;
    }else{
        this.shockFlag = 0;
        var data = new LBitmapData(imgList['boss1hurt4']);
        this.bitmap.bitmapData = data;
    }
};

MiddleBoss1.prototype.makeFace = function () {

};

function MiddleBoss2(name,x,y,vx,vy,speed,head_bitmapdata) {
    base(this,Boss2,[name,x,y,vx,vy,speed,head_bitmapdata]);
    this.shockFlag = 0;
}

MiddleBoss2.prototype.Shock = function () {
    if (this.shockFlag>3) {
        this.shockFlag = 0;
    }
    this.shockFlag++;
    var data = null;
    switch(this.shockFlag){
        case 1:
            data = new LBitmapData(imgList['boss2emoji2']);
        break;

        case 2:
            data = new LBitmapData(imgList['boss2emoji3']);
        break;

        case 3:
            data = new LBitmapData(imgList['boss2emoji4']);
        break;

        default:
            data = new LBitmapData(imgList['boss2emoji1']);
        break;
    }
    this.bitmap.bitmapData = data;

};
