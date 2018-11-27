console.log(`==== 枚举 ====`);

// 数字枚举
enum Num {
  zore = 0,
  one,
  tow
}

console.log(Num, Num.zore);

enum Msg {
  success,
  err
}
const getMsg = (msg: Msg) => {
  console.log(msg);
};
getMsg(Msg.err);

// 字符串枚举
enum Str {
  up = 'up',
  down = 'down'
}

// 异构枚举
enum BooleanStr {
  hasBoolean = 0,
  str = 'str'
}

// 联合枚举与枚举成员的类型
enum DogColor {
  color,
  Kind
}

interface Color {
  kind: DogColor.Kind;
  radius: number;
}

interface Kind {
  sideLength: number;
}

let c: Color = {
  kind: DogColor.Kind,
  radius: 1
};

console.log(c);