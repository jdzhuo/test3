// pages/index/index.js

//获取应用实例
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
       
    },

    onGetUserInfo: function (e) {
        if (!this.data.logged && e.detail.userInfo) {
            this.setData({
                logged: true,
                UserInfo: e.detail.userInfo,
                nickName: e.detail.userInfo.nickName,
                avatarUrl: e.detail.userInfo.avatarUrl,
            })
            app.globalData.userInfo = e.detail.userInfo
            this.onGetOpenid
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (!wx.cloud) {
            wx.showModal({
                title: '初始化失败',
                content: '请使用2.2.3或以上的基础库以使用云能力',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            return
        }

        //获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.getUserInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                logged: true,
                                nickName: res.userInfo.nickName,
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.UserInfo
                            })
                            app.globalData.userInfo = res.userInfo
                            this.onGetOpenid
                        }
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            //来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '番茄时钟',
            path: '/pages/index/index',
            success: function (res) {}
        }
    }
})