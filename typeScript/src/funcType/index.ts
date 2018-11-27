/**
 * 函数就是定义行为的地方
 * */
console.log(`==== 函数 ====`);

/**
 * 函数类型包含两部分：参数类型和返回值类型
 * 推断类型
 */
function add(x: number, y: number): number {
  return x + y;
}

const myAdd: (baseVal: number, incremtent: number) => number = function(
  x: number,
  y: number
): number {
  return x + y;
};

console.log(myAdd(1, 3));

/**
 * 可选参数和默认参数
 * 可选参数必须跟在必须参数后面
 * 可选参数与末尾的默认参数共享参数类型。
 */

const buildName = (fistName: string, lastName?: string): string => {
  return fistName + (lastName || '');
};

console.log(buildName('Bob'));
console.log(buildName('Bob', 'Jack'));

const buildNameMone = (fistName: string, lastName = 'Mone'): string => {
  return fistName + (lastName || '');
};

console.log(buildNameMone('Mondo', null));

// 剩余参数
const fullName = (fistName: string, ...restofName: string[]): void => {
  console.log(fistName, restofName);
};

fullName('Joseph', 'Samuel', 'Lucas', 'MacKinzie');
