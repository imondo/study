const fs = require('fs');
const router = require('koa-router')();

const addMapping = (router, mapping) => {
  let {method, url, asyncFn} = mapping;
  router[method]('/api' + url, asyncFn);
}

const addController = (router, dir) => {
  fs.readdirSync(__dirname + `./../${dir}`).filter((f) => {
    return f;
  }).forEach((f) => {
    fs.readdirSync(__dirname + `./../${dir}/${f}`).filter((j) => {
      return j.endsWith('.js');
    }).forEach((i) => {
      let mapping = require(__dirname + `./../${dir}/${f}/${i}`);
      addMapping(router, mapping);
    })
  })
}

module.exports =  (dir) => {
  let _dir = dir || 'controllers';
  addController(router, _dir);
  return router.routes();
}