// 定义对象
interface obj {
  a: string;
  b: number;
}

let objs: obj = {
  a: 'ss',
  b: 11
};

console.log(objs);

interface PersonType {
  name: string;
  sex?: string;
  age?: number;
  [propName: string]: any; // 额外的属性检查
}

interface returnVal {
  father: string;
}

// 定义数组对象
interface Org {
  name: string;
  val: number;
}

let myList:Org[] = [
  {name: 'arr org', val: 1}
]
console.log(`定义数组对象`, myList);

// 只读属性 赋值后不可更改
interface readVal {
  readonly onlyRead: boolean;
  readv?: any;
}

// 函数类型
interface setPerson {
  (name: string, sex?: string, age?: number): PersonType;
}

// 可索引的类型
interface listArr {
  [index: number]: string;
  name?: string;
}

// 继承接口
interface Share {
  color: string;
}

interface Square extends Share {
  size: number;
}

let square = <Square>{};
square.color = '#fff';
square.size = 322;

// 混合类型
interface Counter {
  (start: number): string;
  names: string;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function(s: number) {
    console.log(`混合类型${s}`);
  };
  counter.names = '混合类型';
  counter.reset = function() {};
  return counter;
}

let counter = getCounter();
counter(10);
console.log(counter.names);

// 接口继承类
class Control {
  private color: string;
  state: number;
}

interface SelectControl extends Control {
  select(): void;
}

class Button extends Control implements SelectControl {
  select() {}
  constructor(s: number) {
    super();
    this.state = s;
    console.log(`访问私有${this.state}`);
  }
}

class TextBox extends Control {
  select() {}
}

new Button(111);
new TextBox();

// 类型别名
type Numbers = number;
const num:Numbers = 11;
type Methods = 'GET' | 'POST';
const types:Methods = 'POST';
console.log(num, types);

export default class Person {
  getPerson(type: PersonType): returnVal {
    const newPerson = { father: type.name };
    console.log(type);
    return newPerson;
  }

  readLable(): void {
    const readData: readVal = {
      onlyRead: true,
      readv: 'this is not readonly'
    };
    console.log(readData);
    readData.readv = 'not readonly';
    console.log(readData.readv);
  }

  setPerson() {
    let setPerson: setPerson = (src, souce) => {
      let result = src.search(souce);
      console.log(result, src);
      return { name: src, sex: souce };
    };
    const newPeron = setPerson('Fn', 'man');
    console.log(newPeron);
  }

  listArr() {
    let list: listArr = ['a', 'b'];
    console.log(list, list[0]);
  }
}
