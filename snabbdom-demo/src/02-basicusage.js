import { init } from 'snabbdom/build/package/init';
import { h } from 'snabbdom/build/package/h';
import { thunk } from 'snabbdom/build/package/thunk';

let patch = init([])

let vNode = h('div#containor', [
  h('h1', 'hello mondo'),
  h('p', 'imondo.cn')
])

let app = document.querySelector('#app')

let oldVnode = patch(app, vNode);

setTimeout(() => {
  vNode = h('div#containor', '重置')
  patch(oldVnode, vNode)

  patch(oldVnode, h('!')) // 清除节点
  
}, 2000)