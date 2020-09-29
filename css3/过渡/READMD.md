# 过渡

## 动画属性

不是所有属性都拥有过渡效果，可[支持过度效果的属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animated_properties)

我们看到边框实线 -> 虚线 这个状态是没有过渡效果的

## transition-property

设置元素某些属性应用过渡效果

* `all` 默认所有属性都发生过渡效果

* 多个属性设置使用 `,` 逗号分隔

## transitionend

用于控制过渡结束后执行的JS事件

## transition-duration

用于设置过渡时间，需要注意以下几点

- 可使用单位为 ms 毫秒、s 秒
- 默认值为 `0s` 不产生过渡效果
- 一个值时，所有属性使用同样的时间
- 二个值时，奇数属性使用第一个，偶数属性使用第二个
- 变化属性数量大于时间数量时，后面的属性再从第一个时间开始重复使用

## transition-timing-function

设置过渡效果的速度，控制运行轨迹

可以参考[https://cubic-bezier.com/](https://cubic-bezier.com/)网站体验效果

### steps

步进速度，步进帧动画过渡效果；过渡使用阶梯形式呈现

## transition-delay

设置延迟过渡时间

- 默认为0s即立刻开始过渡
- 值可以为负数
- 变化属性数量大于时间数量时，后面的属性再从第一个时间开始重复使用

## transition

统一设置过渡规则

- 必须设置过渡时间
- 延迟时间放在逗号或结束前

```css
transition: width linear 2s,
  height ease 2s 2s,
  background ease-in 2s 4s,
  border-radius 2s 6s;
```