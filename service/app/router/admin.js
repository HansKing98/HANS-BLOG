module.exports = app => {
    const { router, controller } = app
    const adminauth = app.middleware.adminauth();
    router.get('/admin/index', adminauth, controller.admin.main.index)
    router.post('/admin/checkLogin', controller.admin.main.checkLogin)
    router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo)
}