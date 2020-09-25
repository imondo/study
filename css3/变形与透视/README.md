# 变形与透视

## transform

使用 `transform` 控制元素的变形，包括控制移动、旋转、倾斜、3D转换等

- `translateX` 和 `translateY` 可以使用负数和百分数

- `translateZ` 表示纵深，只能写具体的数值

- 小技巧控制元素居中

```css
position: absolute;
left: 50%;
top: 50%;
/* margin-left: -100px;
margin-top: -100px; */
transform: translate(-50%, -50%);
width: 300px;
height: 300px;
```

- `rotate3d` 按向量值控制旋转

- `transform` 的参数叠加与顺序对变形有不同的结果
  
  - 参数不会叠加，只会发生覆盖

  - 顺序的不同，结果呈现也不同

## transform-origin

变形参考点，设置元素的 X/YZ 操作的基点，用于控制旋转、倾斜等操作

- 旋转默认以元素中心进行旋转，改变基点后可控制旋转点位置

- 元素移动不受变形基点所影响

属性值为：`top`、`bottom`、`left`、`right`、`center` 或者是 `百分数` | `具体数值`

默认值: `center center`

```css
transform-origin: left center 300px;
```

## perspective

控制元素的透视深度

* `perspective(900px)` 作为函数规则控制单个元素，每个元素的透视效果是一样的 

* `perspective: 900px` 作为规则用于将父级整个做为透视元素，会造成里面的每个子元素的透视是不一样的。就像现实中摆一排杯子，是使用统一透视的，每个杯子的透视不一样，造成有大有小

推荐设置作为函数设置，规避透视造成元素大小不一致：`transform: perspective(600px);`

## preserve-3d

三维空间视角，对元素设置 `Z轴` 效果时需要呈现三维空间效果

```css
transform-style: preserve-3d;
```

## perspective-origin

控制视线的角度，就像我们眼睛看物体时的聚焦点

需要设置 `perspective` 规则才能看到效果

## backface-visibility

控制是否可以看到元素的背面

- 一般设置在元素上而不是父级元素上
- 需要父级元素设置 `transform-style: preserve-3d`

可选属性：

- `visible`	背面可见
- `hidden`	背面隐藏

