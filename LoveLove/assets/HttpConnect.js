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
        Token:{
            get () {
                return this._token;
            },
            set (value) {
                this._token = value;
            }
        },
        IP:"http://47.92.50.232/"
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
    	cc.log("connect start.......")
        this.login();


//     



},


    login(){
        this.sendPostRequest({
            "keyId": "微信用户001",
            "platform": 1
        }, "user/login", true, this.loginResult, this)
    },
    //
    loginResult(arg, result){
        console.log('登录成功:!!' + result.data)
        arg.Token = result.data;

        arg.sendMessage( "", "userData/data", false );

//         arg.sendMessage( {
//   "consume": 0,
//   "nums": 0,
//   "power": 0,
//   "powerScore": 0,
//   "shareTimes": 10,
//   "times":10
// }, "userData/saveOrModify", 
// true, );

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
        console.log('发送消息POST')
            var sendstr=JSON.stringify(str);
            var linkStr = this.IP+link;
            xhr.open("POST", linkStr);//x-www-form-urlencoded
            xhr.send(sendstr);
        }
        else{
        console.log('发送消息GET')
            var linkStr = this.IP+link;
            xhr.open("GET", linkStr);
            xhr.send();
        }
        //
        console.log("linkStr:", linkStr);
        // new Uint8Array([]) 
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
                }
		//	}
		};

		console.log('sendPostRequest!!')
	},



    postResCallBack(arg, result){

        console.log('收到了返回消息:!!' + result)
        console.log("data:", result.data)
        //
        for(var i = 0; i < result.data.length; i++)
        {
            console.log("data[i]:", result.data[i].id)
        }
    },

    // update (dt) {},
});
