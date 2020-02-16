function Car() {
    console.log('构造函数')
}

var car = new Car()

console.log(Car.prototype, car.__proto__);


console.log(car.__proto__ === Car.prototype); // 构造函数的实例对象 === 构造函数的原型
