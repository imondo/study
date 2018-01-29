const fs = require('fs');
const router = require('koa-router')();
const loginCtrl = require('./../controller/login');
const userCtrl = require('./../controller/users');

router.post('/api/login', loginCtrl.login);
router.get('/api/user', userCtrl.getUser);
router.get('/api/user/detail/:id', userCtrl.getDetailUser);
router.post('/api/user/add', userCtrl.addUser);
router.put('/api/user/put', userCtrl.putUser);
router.delete('/api/user/del/:id', userCtrl.delUser);

module.exports = router;