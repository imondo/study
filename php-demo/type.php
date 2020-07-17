<?php
  // 数据类型
  $urls = 'imondo.cn';
  $string = "Mondo是 {$urls}"; // 双引号可以做模板字符串
  echo $string;

  $_string =<<<str
  这是使用定界符输入的内容sss
  str;
  echo $_string;

  # 连接符
  $name = 'Mondo';
  $url = 'imondo.cn';
  echo $name.$url; // Mondoimondo.cn

  # 转义
  echo  "变量定义 \$name = 'imondo.cn',学会了吗？";

  # 常用函数

  ## 取得字符串长度
  echo strlen('Mondo'); // 5

  ## 根据字符编码获取长度
  echo mb_strlen('Mondo', 'utf8'); // 5

  ## 截去字符串首尾的内容
  echo trim(' Mondo ', ' moc'); # 从前后删除 moc和空格字符

  echo rtrim(' imondo.cn ', ' cn');
  echo rtrim('imondo.cn ', ' cn');

  echo mb_substr('Mondo', 1, 2, 'utf-8'); // on

  echo strpos('imondo.cn', 'o'); // 2

  echo strrpos('imondo.cn', 'o'); // 5

  echo str_replace('imondo', 'mondo', 'imondo.cn'); //返回 mondo.cn
?>