// generator 中间件使用

function log(ctx) {
  console.log(ctx.method, ctx.header.host + ctx.url);
}

module.exports = function() {
  return function *(next) {
    log(this);
    if (next) {
      yield next;
    }
  }
}