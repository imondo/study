import { init } from 'snabbdom/build/package/init';
import { h } from 'snabbdom/build/package/h';
import { thunk } from 'snabbdom/build/package/thunk';
// import { vnode } from 'snabbdom/build/package/vnode';

// 参数： 数组 模块
// 返回值：patch 函数，作用对比两个 vnode 的差异更新到真实 DOM
let patch = init([]);

// 第一个参数： 标签 + 选择器
// 第二个参数：如果是字符串的话就是标签中的内容
let vNode = h('div#container.cls', 'hello world')

let app = document.querySelector('#app')

// 第一个参数：可以是 DOM 元素，内部会把 DOM 元素转换成 VNode
// 第二个参数：VNode
// 返回 VNode
let oldVnode = patch(app, vNode)

vNode = h('div', 'hello mondo')

patch(oldVnode, vNode)