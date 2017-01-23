var HP_DRAW_WIDTH = 400;
var HP_DRAW_HEIGHT = 50;

function MsgHP(x, y, target, fullhp, color) {
    base(this,LSprite,[]);
    this.x = x;
    this.y = y;
    this.target = target;
    this.fullhp = fullhp
    this.IsDie = false;
    this.color = color;
}

MsgHP.prototype.onframe = function () {
    var w;
    if (this.target.hp<=0) {
        w = 0;
    }else{
        w = (this.target.hp/this.fullhp)*HP_DRAW_WIDTH;
    }
    this.graphics.clear("#000");
    this.graphics.drawRect(4,"#fff",[0,0,HP_DRAW_WIDTH,HP_DRAW_HEIGHT]);
    this.graphics.drawRect(2,"#fff",[0,0,w,HP_DRAW_HEIGHT],1,this.color);
};

MsgHP.prototype.Die = function () {
    this.IsDie = true;
    messageLayer.removeChild(this);
};

function MsgText(x, y) {
    base(this,LTextField,[]);
    this.x = x;
    this.y = y;
    this.font = "黑体";
    this.IsDie = false;
}

MsgText.prototype.onframe = function () {
    if (BigLevel == 4) {
        this.text = "YOU WIN!!";
    }else if (BigLevel == 5) {
        this.text = "疯狂模式 : " + CurrentLevel;
    }else {
        this.text = "经典模式 : "+BigLevel+" - "+CurrentLevel;
    }
};

MsgText.prototype.Die = function () {
    this.IsDie = true;
    messageLayer.removeChild(this);
};

function MsgPlainText(x, y, text) {
    base(this,LTextField,[]);
    this.x = x;
    this.y = y;
    this.text = text;
    this.IsDie = false;
}

MsgPlainText.prototype.onframe = function () {

};

MsgPlainText.prototype.Die = function () {
    this.IsDie = true;
    messageLayer.removeChild(this);
};

function MsgButton(x, y, bitmapdata) {
    base(this,LSprite,[]);
    this.x = x;
    this.y = y;
    var data = new LBitmapData(bitmapdata);
    this.bitmap = new LBitmap(data);
    this.addChild(this.bitmap);
}

MsgButton.prototype.onframe = function () {

};
