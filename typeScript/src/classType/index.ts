// 类类型 接口描述了类的公共部分，而不是公共和私有两部分。
interface ClockInit {
  startTime: Date;
  setTime(d: Date): void;
}

export class Clock implements ClockInit {
  startTime: Date;
  setTime(d: Date) {
    this.startTime = d;
    console.log(this.startTime);
  }
  constructor(h: number, m: number) {
    console.log(h, m);
  }
}

export class Clock2 implements ClockInit {
  startTime: Date;
  setTime(d: Date) {
    this.startTime = d;
  }
  constructor() {
    console.log(`this is a Clock2`);
  }
}

// 继承
class Dog {
  name: string;
  constructor(thName: string) {
    this.name = thName;
  }
  say(word: string = `this is a dog`) {
    console.log(word);
  }
}

class ColorDog extends Dog {
  constructor(name: string) {
    super(name);
  }
  sayWo() {
    console.log(`speak one`);
  }
}

// 访问继承类的方法与属性
class NameDog extends Dog {
  constructor(name: string) {
    console.log(name, '``````');
    super(name);
    super.say(`继承访问`);
  }
  say() {
    console.log(`改变了继承的say方法`);
  }
}

const dog = new ColorDog(``);
dog.say(`a dog`);
dog.sayWo();

const name = new NameDog('小黄');
name.say();

// 公共，私有与受保护的修饰符
interface AnimalType {
  name: string;
  age: number;
  color: string;
  speak?: string;
}

class Animal {
  public name: string;
  private age: number; // only Animal read
  protected color: string; // only Animal Snake read
  readonly speak: string = 'haha'; // only read not edit
  constructor(type: AnimalType) {
    this.name = type.name;
    this.age = type.age;
    this.color = type.color;
  }
}

class Snake extends Animal {
  constructor(type: AnimalType) {
    super(type);
    console.log(this.color);
  }
}
const animal = new Animal({ name: 'dog', age: 18, color: 'block' });
const snake = new Snake({ name: 'Snake', age: 18, color: 'blue' });
snake.name = 'new Snake';

console.log(snake);

// 存取器
class Employee {
  private _fullName: string;
  passcode: string = `aaa`;
  get fullName(): string {
    console.log(this._fullName);
    return this._fullName;
  }
  set fullName(newName: string) {
    if (this.passcode === `aaa`) {
      this._fullName = newName;
      console.log(`存取器${newName}`);
    } else {
      console.log(`this is error passcode`);
    }
  }
}

const employee = new Employee();
employee.passcode = 'c';
employee.fullName = 'Bob Smith';

// 静态属性存在于类本身上面而不是类的实例上
class Grid {
  static origin = { x: 1, y: 5 };
  org = { a: 1 };
  getOrigin() {
    console.log(`static访问需要加上类名`, Grid.origin, this.org);
  }
}

new Grid().getOrigin();

// 抽象类
abstract class Car {
  abstract start(): void;
  abstract stop(): void;
  move(): void {
    console.log(`this is abstract`);
  }
}

class Stagecoach extends Car {
  constructor() {
    super();
  }
  start(): void {
    console.log(`马车启动`);
  }
  stop(): void {
    console.log(`拉紧绳子停车`);
  }
}

class Bus extends Car {
  constructor() {
    super();
  }
  start(): void {
    console.log(`加油启动`);
  }
  stop(): void {
    console.log(`刹车`);
  }
}

const car1 = new Bus();
const car2 = new Stagecoach();

let cars = [car1, car2];
cars.forEach(element => {
  element.move();
});

// 把类当做接口使用
class Point {
  x: number;
  y: number;
}
interface Point3d extends Point {
  z?: number;
}
const point3d: Point3d = {
  x: 1,
  y: 2
  // z: 3
};
console.log(`把类当做接口使用${point3d}`);
