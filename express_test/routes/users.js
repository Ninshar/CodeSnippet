var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.redirect('/users/list')
});


router.get('/list', function(req, res, next) {
  // var list = [{_id: 1, username: 'linxin', email: '123123@qq.com'}];
  userModel.find(function(err, data){
    if(err){return console.log(err)}
    res.render('UserList',{
      user:data
    })
  })
});

//进入用户添加页
router.get('/add', function(req, res, next) {
  res.render('UserAdd');
});
//提交用户添加表单
router.post('/add', function(req, res, next) {
  var newUser = new userModel({
    username:req.body.username,
    email:req.body.email
  });
  console.log(req)
  newUser.save(function(err, data){
    if(err){return console.log(err)}
    // res.redirect('/users/list')
    res.json({code:200,msg:'添加成功'})
  })

});
// 删除用户
router.delete('/del', function (req, res) {
  var id = req.query.id;
  userModel.remove({_id: id}, function (err, data) {
    if(err){ return console.log(err); }
    res.json({code: 200, msg: '删除成功',
      data:data
    });
  })
})
//详情
router.get('/detail/:id',function(req, res){
  var id = req.params.id;
  userModel.findOne({_id:id},function(err, data){
    if(err){ return console.log(err); }
    res.render('UserDetail',{
      user: data
    })
  })
})
//编辑
router.get('/edit/:id',function(req, res){
  var id = req.params.id;
  userModel.findOne({_id:id},function(err, data){
    if(err){ return console.log(err); }
    res.render('UserEdit',{
      user: data
    })
  })
})

router.post('/update',function(req, res){
  var id = req.body.id;
  userModel.findById(id, function(err, data){
    if(err){ return console.log(err); }
    data.username = req.body.username;
    data.email = req.body.email;
    data.save(function(err, data){
      if(err){ return console.log(err); }
      res.redirect('/users/list')
    })
  })
})


module.exports = router;
