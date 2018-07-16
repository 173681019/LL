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
        HomeUI:{
            default:null,
            type:cc.Prefab
        },
        homeBtn:{
            default:null,
            type:cc.Button
        },
        CalcuBtn:{
            default:null,
            type:cc.Button
        },
        FindBtn:{
            default:null,
            type:cc.Button
        },
        MineBtn:{
            default:null,
            type:cc.Button
        },
        AddBtn:{
            default:null,
            type:cc.Button
        }
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

    showPage:function(index){

        //
        if(this.currentShowHud){
           this.currentShowHud.destroy();//getComponent('HomeUI').removeMe();
        }
        //
        switch(index)
        {
            case "1":

                this.homeBtn.interactable = false;
                this.currentBtn = this.homeBtn;
                //
                this.currentShowHud = cc.instantiate(this.HomeUI);
            break;


            case "2":
                this.CalcuBtn.interactable = false;
                this.currentBtn = this.CalcuBtn;
            break;


            case "3":
                this.FindBtn.interactable = false;
                this.currentBtn = this.FindBtn;
            break;


            case "4":
                this.MineBtn.interactable = false;
                this.currentBtn = this.MineBtn;
            break;


            case "5":
                this.AddBtn.interactable = false;
                this.currentBtn = this.AddBtn;
            break;
        }

        // 将新增的节点添加到 Canvas 节点下面
        if(this.currentShowHud)
            this.node.addChild(this.currentShowHud);
    },

    pressHomeUI: function (event, index) {
        cc.log(111111);
        if(!event.target)return;


        if( this.currentBtn ) {
           this.currentBtn.interactable = true;
        }

        this.showPage(index);

        //this.homeBtn.interactable = false;
;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.showPage("1");
    },

    start () {

    },

    
    gc: function () {
        cc.sys.garbageCollect();
    }

    // update (dt) {},
});
