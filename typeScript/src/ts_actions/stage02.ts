interface Human {
  name: string;
  eat():void;
}

class Asian implements Human {
  constructor(name: string) {
    this.name = name;
  }
  name: string
  eat() {}
}

interface Man extends Human {
  run(): void
}

interface Child {
  cry(): void
}

interface Boy extends Man, Child {}

let boy: Boy = {
  name: 'boy',
  run() {},
  eat() {},
  cry() {}
}

class Auto {
  constructor() {}
  state = 1
  bark() {}
}

interface AutoInterface extends Auto {
  run(): void
}

class C implements AutoInterface {
  state = 2
  run() {} 
  bark() {} 
}

class Bus extends Auto implements AutoInterface {
  run() {}
}

console.log(new Bus(), Bus.prototype)