const Router = require('koa-router');
const loginCtrl = require('./../controller/login');
const userCtrl = require('./../controller/users');
const router = new Router({
  prefix: '/api'
});

router.post('/login', loginCtrl.login);
router.get('/user', userCtrl.getUser);
router.get('/user/detail/:id', userCtrl.getDetailUser);
router.post('/user/add', userCtrl.addUser);
router.put('/user/put', userCtrl.putUser);
router.delete('/user/del/:id', userCtrl.delUser);

module.exports = router;