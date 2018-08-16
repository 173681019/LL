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
        DaysArr:{//定义一个数组
            default:[],
            type:[cc.Prefab]
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









    },
    //
    showDefaultData()
    {
        var date = new Date()
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth();
        var newday = date.getDate();

        this.initBoard(this.currentYear, this.currentMonth, newday);
    },
    //
    showBg:function(show)
    {
        this.node.getChildByName(`bg`).active = false;
    },

    removeCurrent:function()
    {
    	cc.log("this.DaysArr:", this.DaysArr);
    	var len = this.DaysArr.length;
    	for(var i = len-1; i >=0; i--)
    	{
    		this.DaysArr[i].destroy();
    	}
    	this.DaysArr = [];
    //	this.node.getChildByName("days").removeAll();
    },

    pressPrevOrNextMonth:function(event, prev)
    {
    	this.removeCurrent();
    	if(prev==1){
    		this.currentMonth--;
    	}else{
    		this.currentMonth++;
    	}

    	var date = new Date()
    	if(this.currentMonth == date.getMonth())
    	{
    		this.initBoard(this.currentYear, this.currentMonth, date.getDate());
    	}
    	else
    	{
    		this.initBoard(this.currentYear, this.currentMonth, 999);
    	}
    },


    initBoard:function( NOW_YEAR, NOW_MONTH, NOW_DAY )
    {
        console.log("NOW_YE_MONTH:", NOW_YEAR+"_"+NOW_MONTH);
        //
        var _data = window[NOW_YEAR+"_"+NOW_MONTH];

       
    	// 获取这月有多少天
        var currentDay = this.getMonthsDay( NOW_YEAR, NOW_MONTH );

        // 获取当月第一天星期几
        var firstDay = this.getMonthFirst( NOW_YEAR, NOW_MONTH );
        



        var lastMonth = (NOW_MONTH - 1) >= 0 ? (NOW_MONTH - 1) : 12;
        
        this.node.getChildByName(`year`).getComponent(cc.Label).string = NOW_YEAR;
        this.node.getChildByName(`month`).getComponent(cc.Label).string = (NOW_MONTH + 1) + " 月";


        var lastDay = this.getMonthsDay(NOW_YEAR, lastMonth);
        var newlastDay = lastDay;
        for(var i = firstDay; i >= 1; i--) {
            var _node = this.node.getChildByName('days').getChildByName(`button${i}`);
           // _node.getChildByName(`1`).color = new cc.Color(155,155,155);
          	//_node.getChildByName(`1`).getComponent(cc.Label).string = newlastDay--;



            this.addOneDay( cc.p(80*i-330, 60), 0, newlastDay--, false, false )
        }

        var hasData = 0;
		var newCurrentDay = 1;
        for (var i = firstDay+1; i <= 7; i++) {
            var _node = this.node.getChildByName('days').getChildByName(`button${i}`);
            var isToday = newCurrentDay == NOW_DAY;

            if(window[NOW_YEAR+"_"+NOW_MONTH+"_"+newCurrentDay]){hasData = 1;}else{hasData = 0;}
                
            this.addOneDay( cc.p(80*i-330, 60), hasData, newCurrentDay++, true, isToday )
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


            if(window[NOW_YEAR+"_"+NOW_MONTH+"_"+i]){hasData = 1;}else{hasData = 0;}
            this.addOneDay( cc.p(80*number-330, 65 - num * 75 ), hasData, i, true, i == NOW_DAY )

          
        }


        if (number < 7) {
            var index = 1;


            for (var i = number; i <=6; i++) {
            	cc.log("number:", number);
            	cc.log("index:", index);

            	number++;
                this.addOneDay( cc.p(80*number-330, 65 - num * 75 ), 0, index++, false )
                
            }
        }
    },
    addOneDay:function(p, type, num, isThisMonth, isToady = false)
    {
    	// 使用给定的模板在场景中生成一个新节点
        var day = cc.instantiate(this.Day);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.getChildByName("days").addChild(day);

        day.setPosition( p );

        day.getComponent("DayButton").SetProperty(type, num, isThisMonth, isToady);
        day.getComponent("DayButton").MAIN = this;
        //
        this.DaysArr.push(day);
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
    	cc.log(event, index);
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
