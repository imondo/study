/**
 * 泛型来创建可重用的组件，一个组件可以支持多种类型的数据
 * 传入的类型与返回的类型应该是相同的
 * 保持准确性，传入数值类型并返回数值类型
 */

console.log(`==== 泛型 ====`);

const identify = (x: any): any => {
  return x;
};

const identifyFx = <T>(arg: T): T => {
  console.log(arg);
  return arg;
};

identifyFx<string>('this is genericity');
identifyFx(2);

const logIdentify = <T>(arg: T[]): T[] => {
  console.log(arg.length);
  return arg;
};
const list: Array<any> = [1, '2'];
logIdentify(list);

// 泛型接口
interface GetIdentify<U> {
  (x: number, y: number): U;
}

const newIdentify: GetIdentify<number> = (x, y) => {
  console.log(`泛型接口${x},${y}`);
  return x + y;
};

newIdentify(1, 2);

// 泛型类
class GenerNumber<U> {
  baseVal: U;
  add: (x: U, y: U) => U;
  static del: (x: number, y: number) => number; // 静态属性存在于类本身上面而不是类的实例上
}

let myGenerNum = new GenerNumber<number>();
myGenerNum.baseVal = 0;
myGenerNum.add = (x, y) => x + y;
console.log(myGenerNum.add(1, 2));

let myStrGenerNum = new GenerNumber<string>();
myStrGenerNum.baseVal = '1';
myStrGenerNum.add = (x, y) => x + y;
console.log(myStrGenerNum.add('1', '2'));

// 泛型约束
interface Len {
  length: number;
}
const arrList = <T extends Len>(arg: T): T => {
  console.log(`泛型约束`, arg);
  return arg;
};

arrList({ length: 2, val: [1, 2] });
