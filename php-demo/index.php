<?php 
  $_name = "Mondo";
  echo $_name;

  $a = 1;
  $b = &$a;
  $b = 2;
  echo $a; // 2

  $b = 'hello'; // 普通变量
  $$b = 'world'; // 可变变量
  echo "$b, ${$b}"; // hello world
  echo "$b, $hello"; // hello world


  function get() {
    global $_name; // 全局变量
    unset($_name);
    echo $_name;
    echo $GLOBALS['$_name'];
  }
  echo $_name;
  get();

  var_dump($_a); // NULL
  var_dump(isset($_a)); // false 判断变量是否定义

  $name='imondo.cn';
  unset($name); // 删除变量

  echo $name;

  // 静态变量
  function calculate() {
      static $a=1;
      return $a++;
  }
  calculate();
  echo calculate(); // 2

?>