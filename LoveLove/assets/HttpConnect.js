// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const IP = "http://47.92.50.232/"
const PLATFORM_WEIXIN = 1;

// Simulator: "id" : 18,
// Simulator: "year" : 2018,
// Simulator: "month" : 8,
// Simulator: "day" : 16,
// Simulator: "userId" : 5,
// Simulator: "weekday" : 4,
// Simulator: "nums" : 2,
// Simulator: "times" : 6,
// Simulator: "consume" : 1,
// Simulator: "shareTimes" : 5,
// Simulator: "power" : 3,
// Simulator: "powerScore" : 4

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
        Token:{
            get () {
                return this._token;
            },
            set (value) {
                this._token = value;
            }
        },
        
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
    	window.HTTPCONNECT = this;
    	cc.log("connect start.......")
        this.login();
    },


    login(){
        this.sendPostRequest({
            "keyId": "微信用户001",
            "platform": PLATFORM_WEIXIN,
            "remark":{name:"LOGIN"}
        }, "user/login", true, this.postResCallBack, this)
    },

    sendMessage( data, link, post ){
        this.sendPostRequest(data, link, post, this.postResCallBack, this)
    },

	sendPostRequest(str,link, post, callback, arg) 
    {

		var xhr = cc.loader.getXMLHttpRequest();
		xhr.setRequestHeader("Content-Type","application/json");
        if(this.Token){
            xhr.setRequestHeader("X-Auth-Token",this.Token);
        }



        if(post){
       //     console.log('发送消息POST')
            var sendstr=JSON.stringify(str);
            var linkStr = IP+link;
            xhr.open("POST", linkStr);//x-www-form-urlencoded
            xhr.send(sendstr);
        }
        else{
        //    console.log('发送消息GET')
            var linkStr = IP+link;
            xhr.open("GET", linkStr);
            xhr.send();
        }
        //
		xhr.onreadystatechange = function () 
		{
		//	if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) 
			//{
            console.log('收到了返回消息:' + xhr.responseText) 
            var result = JSON.parse(xhr.responseText);
            //
            //
            if(result.status=="OK")
            {
                console.log("data:", result.data);
                callback(arg, result);
            }
            else
            {
                console.log("网络状况！")
            }
		//	}
		};

		console.log('sendPostRequest!!')
	},



    postResCallBack(arg, result){

        console.log('收到了返回消息:!!' + result)


        switch(result.remark.name)
        {
            case "LOGIN":
                console.log('登录成功:!!' + result.data)
                arg.Token = result.data;

                var date = new Date()
                arg.getMonthData(date.getFullYear(), date.getMonth()+1);
                break;
            case "ALLDATA":
                break;

            case "YEARDATA":
                break;

            case "MONTHDATA":
                if(result.data.length>0)
                {
                    var varName = result.data[0].year + "_" + (result.data[0].month-1);
                    //
                    console.log("varName:", varName);
                    window[varName] = result.data;
                    //
                    for(var i = 0; i < result.data.length; i++)
			        {
			        	if(!window[varName + "_" + result.data[i].day])
			        	{
			        		window[varName + "_" + result.data[i].day] = []
			        	}
			            //console.log( _data[i].day );
			            window[varName + "_" + result.data[i].day].push(result.data[i]);
			        }

                    window.Main.loginOkAndGotData();
                }
                // for(var i = 0; i < result.data.length; i++)
                // {
                //     console.log("data[i]:", result.data[i].id)
                // }

                //arg.UpLoadData(1, 2, 3, 4, 5, 6);
                break;
            case "DAYDATA":
                break;
            case "UPLOAD":
                console.log("上传成功！！！")
                break;

        }
    },

    getDayData(y, m, d){
        this.sendMessage( {year:y, month:m, "remark":{"name":"DAYDATA"}}, "userData/data", true );
    },
    getMonthData(y, m){
        this.sendMessage( {year:y, month:m, "remark":{"name":"MONTHDATA"}}, "userData/data", true );
    },
    getYearData(y){
        this.sendMessage( {year:y, "remark":{"name":"YEARDATA"}}, "userData/data", true );
    },
    getAllData(){
        this.sendMessage( {"remark":{"name":"ALLDATA"}}, "userData/data", true );
    },
    // update (dt) {},

    UpLoadData( consume, nums, power, pwoerScore, shareTimes, times){
        this.sendMessage( {"consume": consume,
                              "nums": nums,
                              "power": power,
                              "powerScore": pwoerScore,
                              "shareTimes": shareTimes,
                              "times": times,
                              "remark": {name:"UPLOAD"}}, "userData/saveOrModify", true );
        
    }
});
