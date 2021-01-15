;(function(window) {

  function logWarn(res, len, callback) {
    if (res.c) {
      if (len) {
        return callback(res, len)
      }
      return res.valueOf();
    } else {
      console.warn(`结果不存在`);
    }
  }

  function FedAlgor() {
    // 加法
    this.plus = function(a, b, len) {
      var _a = new Big(+a);
      var res = _a.plus(b);
      return logWarn(res, len, this.toFixed);
    }
    // 减法
    this.minus = function(a, b, len) {
      var _a = new Big(a);
      var res = _a.minus(b);
      return logWarn(res, len, this.toFixed);
    }
    // 乘法
    this.times = function(a, b, len) {
      var _a = new Big(a);
      var res = _a.times(b);
      return logWarn(res, len, this.toFixed);
    }
    // 除法
    this.div = function(a, b, len) {
      var _a = new Big(a);
      var res = _a.div(b);
      return logWarn(res, len, this.toFixed);
    }

    // toFixed
    this.toFixed = function(num, len = 2) {
      var _num = new Big(num);
      return _num.toFixed(len).valueOf();
    }
  }

  if (typeof module === "object" && module && typeof module.exports === "object") {
    module.exports = FedAlgor;
  } else {
    window.FedAlgor = window.__FedAlgor = FedAlgor;
  }

})(window)