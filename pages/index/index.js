const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const network = require('../../utils/util.js');

Page({
  data: {
    latitude: '',
    longitude: '',
    controls: [{
      id: 1,
      iconPath: "../../images/location.png",
      position: {
        left: wx.getSystemInfoSync().windowWidth / 2 - 25,
        top: wx.getSystemInfoSync().windowHeight / 2 - 45,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    if (e.type === "end") {
      this.mapCtx.getCenterLocation({
        success: (res) => {
          this.setData({
            latitude: res.latitude,
            longitude: res.longitude
          })
          this.myLocation()
        }
      })
    }
  },
  moveToLocation() {
    this.mapCtx.moveToLocation();
  },
  myLocation() {
    var mapDemo = new QQMapWX({
      key: 'II5BZ-YLEK3-2ID3I-YZ7MB-6UWR2-BEBOX' // 必填
    });
    let location = this.data.longitude + ',' + this.data.latitude
    let data = {
      key: 'b2b69d499ffb2670e23f79f9c5c12a6d',
      location: location
    }
    network.ajax('https://restapi.amap.com/v3/geocode/regeo', data).then(res => {
      console.log(res.regeocode.formatted_address)
      wx.showModal({
        content: res.regeocode.formatted_address,
      })
    }).catch(function (err) {
      console.error(err)
    })
    // mapDemo.reverseGeocoder({
    //   location: {
    //     latitude: this.data.latitude,
    //     longitude: this.data.longitude
    //   },
    //   success: function (res) {
    //     console.log(res.result.address);
    //     wx.showModal({
    //       title: '提示',
    //       content: res.result.address,
    //       success: function (res) {
    //         if (res.confirm) {
    //           console.log('用户点击确定')
    //         }
    //       }
    //     })
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   },
    //   complete: function (res) {
    //     console.log(res);
    //   }
    // });

  },
  onLoad: function () {
    this.mapCtx = wx.createMapContext('map')
  },
  onReady: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res)
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        this.myLocation()
        setTimeout(()=>{
          this.moveToLocation();
        })
      }
    })
  }
})
