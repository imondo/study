<?php
  // 数据类型
  $urls = 'houdunren.com';
  $string = "后盾人网址是 {$urls}"; // 双引号可以做模板字符串
  echo $string;

  $_string =<<<str
  这是使用定界符输入的内容sss
  str;
  echo $_string;

  $name = 'Mondo';
  $url = 'imondo.cn';
  echo $name.$url;

  echo  "变量定义 \$name = 'houdunren.com',学会了吗？";
?>