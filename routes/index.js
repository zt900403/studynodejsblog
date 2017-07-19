/**
 * Created by zhang on 2017/7/19.
 */
module.exports = function(app) {
    app.get('/', function(req, res) {
       res.redirect('/posts');
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
};