const fs = require('fs');
const router = require('koa-router')();

const addMappping = (router, mapping) => {
  let {method, url, asyncFn} = mapping;
  router[method](url, asyncFn);
}

const addController = (router, dir) => {
  fs.readdirSync(__dirname + `./../${dir}`).filter((f) => {
    return f.endsWith('.js');
  }).forEach((f) => {
    let mapping = require(__dirname + `./../${dir}/${f}`);
    addMappping(router, mapping);
  });
}

module.exports = (dir) => {
  let controller_dir = dir || 'controllers';
  addController(router, controller_dir);
  return router.routes();
}
