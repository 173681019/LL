// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    //
    SetProperty:function(type, num, isThisMonth, isToday)
    {
        this.node.getChildByName('1').getComponent(cc.Label).string = num;
        this.node.getChildByName('hasData').active = false;

        this.dayIndex = num;
        this.isThisMonth = isThisMonth;
        //
        if(type == 1)
        {
            this.node.getChildByName('hasData').active = true;
        }

        if(isToday)
        {
            this.node.getChildByName('today').visible = true;
        }
        else
        {
            this.node.getChildByName('today').active = false;
        }
        //
        if(!isThisMonth)
        {
            this.node.getChildByName('1').color = new cc.Color(155,155,155);
        }
    },
    pressMe:function()
    {
        this.MAIN.pressOnDay( this.dayIndex, this.isThisMonth );
    }
    // update (dt) {},
});
