
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

function parser(arr) {
    const flat = arr.flat(Infinity) // 扁平数组
    const ary = [...new Set(flat)] // 去重
    return ary.sort((a, b) => {
        return a - b
    })
}
console.log(parser(arr));

console.log('====================')

// 构造函数是同步执行 then是异步函数，异步执行
new Promise((resolve, reject) => {
    console.log(2)
    resolve()
    console.log(1);
    
}).then(() => {
    console.log(3);
    
})

console.log('====================')

async function async1() {
    console.log('async1 start 2'); // 2
    await async2();
    console.log('async1 end 6'); // 6
}
async function async2() {
    console.log('async2 3'); // 3
}
console.log('script start 1'); // 1
setTimeout(function () {
    console.log('setTimeout 8'); // 8
}, 0)
async1();
new Promise(function (resolve) {
    console.log('promise1 4'); // 4 
    resolve();
}).then(function () {
    console.log('promise2 7'); // 7
});
console.log('script end 5'); // 5

console.log('====================')


