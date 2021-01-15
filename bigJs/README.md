# 简单的计算

依赖 [bigJs](https://github.com/MikeMcl/big.js/)

只做简单的封装

```html
<script src='https://cdn.jsdelivr.net/npm/big.js@6.0.0/big.min.js'></script>
<script src="./algor.js"></script>
```

```js
const $algor = new FedAlgor();
console.log('加法: ', $algor.plus(5, 4)) // 9
console.log('减法: ', $algor.minus('0.3', 0.1)) // 0.2
console.log('乘法: ', $algor.times(4, 2)) // 8
console.log('除法: ', $algor.div(1, 34, 7)) // 0.0294118
console.log('toFixed: ', $algor.toFixed(0.555, 2)) // 0.56

// 添加自定义方法
FedAlgor.prototype.mult = function(a, b) {
  return 'mult'
}

console.log($algor)
```
