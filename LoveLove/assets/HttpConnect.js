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
    },

    start () {
    	cc.log("connect start.......")
    	this.sendPostRequest("", this.postResCallBack);
    },

    postResCallBack(result){

		console.log('收到了返回消息:!!' + result)
    },

	sendPostRequest(str,callback) 
    {
		var sendstr=JSON.stringify(str);
		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("POST", "https://httpbin.org/post");
		//xhr.open("GET", ServerLink+link+"?"+parm,false);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(sendstr);
		xhr.onreadystatechange = function () 
		{
			if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) 
			{
				var result = JSON.parse(xhr.responseText);
				//if(result["act"]=="erro")
				//{
				//	errcall(result["msg"]);
				//	return;
				//}
				callback(result);
			}
		};

		console.log('sendPostRequest!!')
	},

    // update (dt) {},
});
