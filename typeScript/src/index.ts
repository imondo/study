import Person from './interface/index';

// 将整个模块导入到一个变量，并通过它来访问模块的导出部分
import * as BaseType from './baseType/index';

import * as ClassType from './classType/index';

console.log(`==== 基础类型 ====`);

console.log(BaseType);

const base = new BaseType.baseType();

base.getType();

console.log(`==== 接口 ====`);

const person = new Person();

let lili = {
  name: 'lili',
  sexi: 'wuman'
};

const fatherPerson = person.getPerson(lili);

console.log(fatherPerson);

person.readLable();
person.setPerson();
person.listArr();

console.log(`==== 类 ====`);

const clock = new ClassType.Clock(1, 2);
clock.setTime(new Date());

const clock2 = new ClassType.Clock2();