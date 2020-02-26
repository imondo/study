function Car() {
    console.log('构造函数')
}

var car = new Car()

console.log(Car.prototype, car.__proto__);


console.log(car.__proto__ === Car.prototype); // 构造函数的实例对象 === 构造函数的原型

console.log(`=========================`)

// 原型
const o = { a: 1 };
console.log(o); // __proto__ 就是原型


const obj = Object.create(null, {
    name: {
        value: 'test'
    }
})

console.log(obj) // 没有__proto__对象

function User() {}

console.dir(User)

/**
 * 作为函数调用 找 __proto__ 服务于函数对象自己
 * prototype 作为实例对象 添加方法 服务于无线个实例对象
 * 
 * 构造函数的prototype属性 指向 实例对象的 __proto__ 原型
 */

 User.__proto__.view = function() {
    console.log('存在于Function原型上')
 }

 const user = new User()

 console.dir(user)

 console.log(User.prototype === user.__proto__)

 console.log(User.prototype.constructor === User)

 console.log(User.prototype.__proto__ === Object.prototype)

 console.log(User.__proto__ === Function.prototype)

 function fn() {}
 console.dir(fn)
 fn.view()
 console.dir(Function)
 console.log(fn.__proto__ === Function.prototype)

 console.dir(Function.__proto__ === Function.prototype)

 /**
  * 设置原型
  * 获取原型
  */

const cd = { name: 'cd' }
const parent = { 
    name: 'parent',
    show() {
        console.log('parent方法 ' + this.name)
    }
}

Object.setPrototypeOf(cd, parent)

Object.getPrototypeOf(cd)

cd.show() // 'cd'

parent.show() // 'parent'