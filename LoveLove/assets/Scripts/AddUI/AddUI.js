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
        log("=============================================")
        this.startCalcu();
    },

    startCalcu:function(){
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
        this.fuckStart = true;
    },

    stopCalcu:function(){
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },


    onDestroy () {
        this.stopCalcu();
    },
    
    onDeviceMotionEvent (event) {
        var accelX = event.acc.x;
        var accelY = event.acc.y;
        var accelZ = event.acc.z;
        //
        this.deltaX = abs(this.prevX - accelX);
        this.deltaY = abs(this.prevY - accelY);
        this.deltaZ = abs(this.prevZ - accelZ);
        //
        this.totalX += deltaX;
        this.totalY += deltaY;
        this.totalZ += deltaZ;
        //
        this.totalValueX.push(this.deltaX);
        this.totalValueY.push(this.deltaY);
        this.totalValueZ.push(this.deltaZ);
        //
        if(this.fuckStart)
        {
        	this.fuckContinueFrame++;
        	if(this.fuckContinueFrame%100==0)
        	{
        		this.totalPower.push(this.averageTotal)
        	}
        	//超过 this.averageValue 后开始记录
        	if(++this.count > this.averageValue)
        	{
        		this.averageX = totalX/averageValue;
        		this.averageY = totalY/averageValue;
        		this.averageZ = totalZ/averageValue;
        		//
        		averageTotal = averageX + averageY + averageZ;
        		//
        		if(this.maxPower < averageTotal)
        		{
        			this.maxPower = averageTotal;
        		}
        		//（可以不要）
        		this.count--;
        		//--------------
        		totalX -= totalValueX[0];
        		totalY -= totalValueY[0];
        		totalZ -= totalValueZ[0];
        		//
        		totalValueX.splice(0, 1);
        		totalValueY.splice(0, 1);
        		totalValueZ.splice(0, 1);
        	}









        	//判断结束逻辑
        	if(this.continueCountToEnd > 0)this.continueCountToEnd--;
        	//
        	if(this.averageTotal<this.powerInStart/2)
        	{
        		this.continueCountToEnd+=3;
        		//
        		if(this.continueCountToEnd>500)
        		{
        			this.FuckEnded();
        		}
        	}
        }


        this.prevX = accelX;
        this.prevY = accelX;
        this.prevZ = accelX;
        //
        log("totalX:" + totalX + "totalY" + totalY + "totalZ" + totalZ);
    },


    //Fuck结束
    FuckEnded:function(){
    	log("fuck结束------")
        this.fuckStart = false;
        cc.systemEvent.setAccelerometerEnabled(false);
        this.stopCalcu();
    },

    //
    reset() {
    	this.maxPower = 0;
    	this.averageValue = 100;
    	this.count = 0;
        this.prevX = 0;
        this.prevY = 0;
        this.prevZ = 0;
        //
        this.totalX = 0;
        this.totalY = 0;
        this.totalZ = 0;
        //
        this.averageX = 0;
        this.averageY = 0;
        this.averageZ = 0;
        //
        this.averageTotal = 0;
        this.totalValueX = [];
        this.totalValueY = [];
        this.totalValueZ = [];
        this.totalPower = [];
        this.fuckContinueFrame = 0;
        this.continueCountToEnd = 0;
    },
    //
    start () {
        this.reset();
        this.fuckStart = false;
    },

    // update (dt) {},
});
