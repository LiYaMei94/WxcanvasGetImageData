//index.js
//获取应用实例
var upng = require('../../utils/UPNG.js');
const app = getApp();

Page({
  data: {
    img:''
  },

  onLoad: function() {

  },
  canvasIdErrorCallback: function(e) {
    console.error(e.detail.errMsg)
  },
  onReady: function(e) {
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext('firstCanvas');
    const platform = wx.getSystemInfoSync().platform;
    const that=this;
    context.setStrokeStyle("#333333");
    context.setFillStyle("#FFFF00");

    //  绘制大圆脸
    context.moveTo(210, 100);
    context.arc(150, 100, 60, 0, 2 * Math.PI, true);
    context.fill();

    // 绘制嘴巴
    context.moveTo(190, 100);
    context.arc(150, 100, 40, 0, Math.PI, false);
    context.stroke();

    // 绘制左眼
    context.moveTo(125, 80);
    context.arc(120, 80, 5, 0, 2 * Math.PI, true);
    context.stroke();

    // 绘制右眼
    context.moveTo(185, 80);
    context.arc(180, 80, 5, 0, 2 * Math.PI, true);
    context.stroke();

    context.draw();

    setTimeout(function(){
      // wx.canvasToTempFilePath({
      //   canvasId:'firstCanvas',
      //   success(res){
      //     console.log(res.tempFilePath)
      //     that.setData({
      //       img: res.tempFilePath
      //     },()=>{
      //       console.log(res.tempFilePath)
      //     })
      //   }
      // })
      wx.canvasGetImageData({
        canvasId: 'firstCanvas',
        x: 0,
        y: 0,
        width: 250,
        height: 250,
        success (res) {
          // console.log(res)
          let pngData = upng.encode([res.data.buffer], res.width, res.height);
          let bs64 = wx.arrayBufferToBase64(pngData);
          that.setData({
            img: 'data:image/jgp;base64,' + bs64
          }, () => {
            console.log(that.data.img)
          })
          // console.log(bs64)
        }
      })
    })
  }
})