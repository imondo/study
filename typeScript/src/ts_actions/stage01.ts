abstract class Animal {
  eat() {
    console.log('eat')
  }
  abstract sleep(): void
}

// let animal = new Animal()

class Dog extends Animal {
  constructor(name: string){
    super();
    this.name = name;
  }
  public name: string;
  private run() {
    console.log('run')
  };
  protected pro() {}
  readonly legs: number = 4
  static food: string = 'bones'
  sleep() {
    console.log('dog sleep')
  }
}

console.log(Dog.prototype)
let dog = new Dog('dog');
// console.log(dog.food, Dog.food)
// dog.run()

// 派生类
class Husky extends Dog {
  constructor(name: string, public color: string) {
    // 派生类需强行调用 super
    super(name)
    // this 需要在 super 调用
    this.color = color;
  }
  // color: string
}

let husky = new Husky('husky', 'red')
console.log(husky)
console.log(Husky.prototype, Husky.food)
// husky.run()

class Cat extends Animal {
  sleep() {
    console.log('cat sleep');
  }
}

let cat = new Cat()

let animal: Animal[] = [dog, cat]

animal.forEach(el => {
  el.sleep()
});

class WorkFlow {
  sleep1() {
    return this;
  }
  sleep2() {
    return this;
  }
}

new WorkFlow().sleep1().sleep2()