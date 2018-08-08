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

        Day:{
            default:null,
            type:cc.Prefab
        },
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

     onLoad () {
    	var date = new Date()
        var newyear = date.getFullYear();
        var newmonth = date.getMonth();
        var newday = date.getDate();

        // 获取这月有多少天
        var currentDay = this.getMonthsDay(newyear, newmonth);

        // 获取当月第一天星期几
        var firstDay = this.getMonthFirst(newyear, newmonth);
        



        var lastMonth = (newmonth - 1) >= 0 ? (newmonth - 1) : 12;
        
        this.node.getChildByName(`year`).getComponent(cc.Label).string = newyear;
        this.node.getChildByName(`month`).getComponent(cc.Label).string = (newmonth + 1) + " 月";


        var lastDay = this.getMonthsDay(newyear, lastMonth);
        var newlastDay = lastDay;
        for(var i = firstDay; i >= 1; i--) {
            var _node = this.node.getChildByName('days').getChildByName(`button${i}`);
           // _node.getChildByName(`1`).color = new cc.Color(155,155,155);
          	//_node.getChildByName(`1`).getComponent(cc.Label).string = newlastDay--;



            this.addOneDay( cc.p(80*i-330, 60), 0, newlastDay--, false, false )
        }


		var newCurrentDay = 1;
        for (var i = firstDay+1; i <= 7; i++) {
            var _node = this.node.getChildByName('days').getChildByName(`button${i}`);
            var isToday = newCurrentDay == newday;
            this.addOneDay( cc.p(80*i-330, 60), 1, newCurrentDay++, true, isToday )
            //if (newCurrentDay == newday) {
             //   _node.getChildByName(`1`).color = new cc.Color(65,205,225);
           // }
           // _node.getChildByName(`1`).getComponent(cc.Label).string = newCurrentDay++;
        }

        var num = 0;
        var number = 0;



        for(var i = newCurrentDay; i <= currentDay; i++) {
            if ((i - newCurrentDay) % 7 === 0) {
                num++;
                number = 0;
            }

            number++;

            var idx = number + num*7;
            var _node = this.node.getChildByName('days').getChildByName(`button${idx}`);


            this.addOneDay( cc.p(80*number-330, 65 - num * 75 ), 0, i, true, i == newday )

           // if (i == newday) {
              //  _node.getChildByName(`1`).color = new cc.Color(65,205,225);

			
          //  }
           // _node.getChildByName(`1`).getComponent(cc.Label).string = i;
        }


        if (number < 7) {
            var index = 1;


            for (var i = number; i <=6; i++) {
            	//var idx = number + num*7 + 1;
           	 	//var _node = this.node.getChildByName('days').getChildByName(`button${idx}`);
                //_node.getChildByName(`1`).color = new cc.Color(155,155,155);
                //_node.getChildByName(`1`).getComponent(cc.Label).string = index++;

            	number++;
                this.addOneDay( cc.p(80*number-330, -235 ), 0, index++, false )
                
            }
        }




    },
    addOneDay:function(p, type, num, isThisMonth, isToady = false)
    {
    	// 使用给定的模板在场景中生成一个新节点
        var day = cc.instantiate(this.Day);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(day);
        // 为星星设置一个随机位置
        day.setPosition( p );

        day.getComponent("DayButton").SetProperty(type, num, isThisMonth, isToady);

    },

    addImage:function(_path, _parent)
    {
 
		cc.loader.loadRes(_path, cc.SpriteFrame,function(err,spriteFrame){  
  
        //创建一个新的节点，因为cc.Sprite是组件不能直接挂载到节点上，只能添加到为节点的一个组件  
        var node=new cc.Node('myNode')  
        //调用新建的node的addComponent函数，会返回一个sprite的对象  
        const sprite=node.addComponent(cc.Sprite)  
        //给sprite的spriteFrame属性 赋值  
        sprite.spriteFrame=spriteFrame 
        _parent.addChild(node)   })  

    },



    pressOnDay: function (event, index) {
    	
    },

    start () {



    },


    // 获取那年那月有多少天
    getMonthsDay(year, month) {
        var year = year;
        var month = month;
        if (arguments.length == 0) {
            var date = new Date();
            year = date.getFullYear();
            month = data.getMonth();
        }

        if (arguments.length == 1) {
            var date = new Date();
            month = data.getMonth();
        }
        
        var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
            monthDays[1] = 29;
        }
        return monthDays[month];
    },

    // 获取这个月第一天星期几 
    getMonthFirst(year, month) {
        var year = year;
        var month = month;
        if (arguments.length == 0) {
            var date = new Date();
            year = date.getFullYear();
            month = data.getMonth();
        }

        if (arguments.length == 1) {
            var date = new Date();
            month = data.getMonth();
        }
        
        var newDate = new Date(year, month, 1);
        return newDate.getDay();
    },

    // update (dt) {},
});
