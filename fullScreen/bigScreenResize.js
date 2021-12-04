// eslint-disable-next-line no-unused-expressions
!(function (window) {
  function setStyle (options) {
    Object.keys(options).forEach(function (key) {
      document.body.style[key] = options[key]
    })
  }

  function BigScreenResize (config) {
    var resizePage = function () {
      var _config = Object.assign(
        {
          width: 1920 + 'px',
          height: 1040 + 'px',
          ratioMode: 'height'
        },
        config || {}
      )

      setStyle({
        width:
          typeof _config.width === 'number'
            ? _config.width + 'px'
            : _config.width,
        height:
          typeof _config.height === 'number'
            ? _config.height + 'px'
            : _config.height
      })

      // 获取 window 的高度
      var _H = {
        height: {
          clientH: window.innerHeight,
          clientHeight: document.body.clientHeight
        },
        width: {
          clientH: window.innerWidth,
          clientHeight: document.body.clientWidth
        }
      }
      var clientH = _H[_config.ratioMode] ? _H[_config.ratioMode].clientH : window.innerHeight

      // 初始 window 与 body 的比值
      var ratio = clientH / (_H[_config.ratioMode] ? _H[_config.ratioMode].clientHeight : document.body.clientHeight)

      /*
       * document.documentElement.clientWidth (获取浏览器窗口文档显示区域的宽度，不包括滚动条。)
       * 求得 body 与可视化区域的差值，除以二可得body居中的 marginLeft 的值
       */

      var clientWidth = document.documentElement.clientWidth
      var marginLeft =
        (parseFloat(clientWidth) -
          parseFloat(document.body.clientWidth) * ratio) /
        2

      var styles = {
        // overflow: 'hidden',
        margin: 0,
        transform: 'scale(' + ratio + ')',
        'transform-origin': 'left top 0', // body 旋转基点设置
        'margin-left': marginLeft + 'px'
      }

      setStyle(styles)
    }

    resizePage(config)

    window.onresize = function () {
      resizePage(config)
    }
  }

  if (
    typeof module === 'object' &&
    module &&
    typeof module.exports === 'object'
  ) {
    module.exports = BigScreenResize
  } else {
    window.BigScreenResize = BigScreenResize
  }
})(window)
