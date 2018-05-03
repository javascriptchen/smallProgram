const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function ajax(url, params, method) {
  let promise = new Promise((resolve, reject) => {
    let method = method ? 'POST' : 'GET'
    wx.request({
      url: url,
      data: params,
      method: method,
      success: (res) => {
        resolve(res.data);
      },
      fail: (res) => {
        reject(res)
      }
    })
  });
  return promise
}
module.exports = {
  formatTime,
  ajax
}
