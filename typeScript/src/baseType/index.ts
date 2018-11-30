export class baseType {
  getType() {
    // boolean
    const hasTure: boolean = false;

    // string
    const str: string = 'this is a string';

    // number
    const num: number = 15;

    // array
    const arr: number[] = [1, 2];
    const list: Array<string> = ['1', '2'];
    const items: Array<any> = [1, '2'];

    // Tuple 表示一个已知元素和类型的数组
    const arrs: [string, number] = ['1', 1];

    // 枚举 enum
    enum Car {
      Postion1 = 1,
      Postion2,
      Postion3
    }

    console.log(Car[1], Car.Postion1);

    // Any 任意类型 允许在编译时可选择地包含或移除类型检查
    let number: any = '111';
    let nums: any[] = [1, '1'];

    console.log(nums);

    // Void 没有任何类型
    function warnUser(): void {
      console.log(`not return type`);
    }

    warnUser();

    // Null 和 Undefined Never
    let u: undefined = undefined;
    let n: null = null;

    function error(message: string): never {
      throw new Error(message);
    }

    // Object
    function create(o: object): void {
      console.log(o);
    }
    create({ test: 0 });
    create(null);

    // 类型断言
    let someVal: string = 'this is a string';
    let someLen: number = (<string>someVal).length;
    let someLens: number = (someVal as string).length;
    console.log(someLen, someLens);

    // 解构与展开
    const lists: Array<any> = [1, '2', undefined];
    const [a, b, c] = lists;
    console.log(a, b, c);

    interface objDemo {
      x: number;
      y: string;
      z?:any
    }
    const obj: objDemo = {
      x: 1,
      y: '1',
      z: '解构'
    };
    const { x, ...o }: { x: number; y: string } = obj;
    console.log(x, o);

    // 处理json和字符串
    interface JsonModule {
      name: string,
      Age: number
    }
    let person = '{"name":"Sam","Age":"20","sex": "man"}';

    let jsonConverted:JsonModule = JSON.parse(person);

    const jsonParse: ((key: string, value: any) => any) | undefined = undefined;
    let objectConverted = JSON.parse(person, jsonParse);
    console.log(objectConverted, jsonConverted, `json处理`);

    let aS:any = {
      b: '1'
    }
    let bs:any = aS;
    bs.a = '2';
    console.log(aS, `指针问题`); 

  }
}

export function asModule() {
  console.log(`as module`);
}
