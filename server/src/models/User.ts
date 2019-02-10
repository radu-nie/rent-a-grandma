// export interface User {
//     id: string;
//     userName: string;
//     firstName: string;
//     lastName: string;
//     token: string
// }

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    salt: String,
    active: Boolean,
    date_added: Date,
    last_modified: Date,
    last_password: String,
    token: String
})

var User = mongoose.model('User', UserSchema);
module.exports = User;
