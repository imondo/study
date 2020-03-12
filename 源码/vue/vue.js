/* Vue 构造类 */
class Vue {
  constructor(options) {
    this.$data = options.data;
    observer(this.$data);
    // 新建 Watcher 观察者，这时候 Dep.target 会指向 Watcher 对象
    new Watcher();
    // 模拟 render过程
    console.log('render', this.$data);
  }
}


/* 实现 observer 观察对象*/
function observer(value) {
  if (!value || typeof value !== 'object') {
    return;
  }

  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key]);
  });

}

/* 响应式 */
function defineReactive(obj, key, val) {

  // 声明依赖
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可修改
    get: function() {
      // 在初始化的时候，依赖收集 Watcher
      dep.addSub(Dep.target);
      return val;
    },
    set: function(newVal) {
      if (newVal === val) return;
      // cb(newVal, val);
      // 在 set 时触发 dep 通知所有的 Watcher 对象更新视图
      dep.notify();
    }
  })
}


/* 视图渲染 */
function cb(val, oldval) {
  console.log(val, oldval, ' 视图更新');
}


/* 订阅者 */
class Dep {
  constructor() {
    // 依赖收集 存放 watcher 对象数组
    this.subs = [];
  }

  /* 在 subs 中添加 watcher 对象 */
  addSub(sub) {
    this.subs.push(sub)
  }

  /* 通知 watcher 对象更新视图*/
  notify() {
    console.log(this.subs);
    this.subs.forEach(sub => {
      sub.update(sub);
    })
  }
}

Dep.target = null;

/* 观察者 */
class Watcher {
  constructor() {
    // 在 new 一个 Watcher 对象时将对象赋值给 Dep.target，get 时用到
    Dep.target = this;
  }

  /* 更新视图 */
  update(sub) {
    console.log(sub, ' 视图更新');
  }
}
