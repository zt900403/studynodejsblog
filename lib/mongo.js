/**
 * Created by zhang on 2017/7/19.
 */
var config = require('config-lite')(__dirname);
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
    name: {type: 'string'},
    password: {type: 'string'},
    avatar: {type: 'string'},
    gender: {type: 'string', enum: ['m', 'f', 'x']},
    bio: {type: 'string'}
});
exports.User.index({name: 1}, {unique: true}).exec();


var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');
mongolass.plugin('addCreateAt', {
   afterFind: function(results) {
       results.forEach(function(item) {
           item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
       });
       return results;
   },
    afterFindOne: function(result) {
        if(result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});