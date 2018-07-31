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

     onLoad () {
    	var date = new Date()
        var newyear = date.getFullYear();
        var newmonth = date.getMonth();
        var newday = date.getDate();

        // 获取这月有多少天
        var currentDay = this.getMonthsDay(newyear, newmonth);

        // 获取当月第一天星期几
        var firstDay = this.getMonthFirst(newyear, newmonth);
        


                cc.log("currentDay", currentDay, "firstDay:", firstDay);



        var lastMonth = (newmonth - 1) >= 0 ? (newmonth - 1) : 12;
        
        this.node.getChildByName(`year`).getComponent(cc.Label).string = newyear;
        this.node.getChildByName(`month`).getComponent(cc.Label).string = (newmonth + 1) + " 月";


        var lastDay = this.getMonthsDay(newyear, lastMonth);
        var newlastDay = lastDay;
        for(var i = firstDay; i >= 1; i--) {
            this.node.getChildByName('days').getChildByName(`button${i}`).getChildByName(`1`).color = new cc.Color(155,155,155);
          	this.node.getChildByName('days').getChildByName(`button${i}`).getChildByName(`1`).getComponent(cc.Label).string = newlastDay--;
        }


		var newCurrentDay = 1;
        for (var i = firstDay+1; i <= 7; i++) {
            if (newCurrentDay == newday) {
                this.node.getChildByName('days').getChildByName(`button${i}`).getChildByName(`1`).color = new cc.Color(65,205,225);
            }
            this.node.getChildByName('days').getChildByName(`button${i}`).getChildByName(`1`).getComponent(cc.Label).string = newCurrentDay++;
        }

        var num = 0;
        var number = 0;


        cc.log("newCurrentDay", newCurrentDay);
        cc.log("currentDay", currentDay);

        for(var i = newCurrentDay; i <= currentDay; i++) {
            if ((i - newCurrentDay) % 7 === 0) {
                num++;
                number = 0;
            }

            number++;

            var idx = number + num*7;
            if (i == newday) {
                this.node.getChildByName('days').getChildByName(`button${idx}`).getChildByName(`1`).color = new cc.Color(65,205,225);
            }
             this.node.getChildByName('days').getChildByName(`button${idx}`).getChildByName(`1`).getComponent(cc.Label).string = i;
        }


        if (number < 7) {
            var index = 1;


            for (var i = number; i <=6; i++) {
            	var idx = number + num*7 + 1;
                this.node.getChildByName(`days`).getChildByName(`button${idx}`).getChildByName(`1`).color = new cc.Color(155,155,155);
                this.node.getChildByName(`days`).getChildByName(`button${idx}`).getChildByName(`1`).getComponent(cc.Label).string = index++;
            	number++;
                
            }
        }



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
