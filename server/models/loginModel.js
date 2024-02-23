// requiring  important dependencies
const mongoose = require("mongoose");

// schema design
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
},
{timestamps:true}
);

const loginModel = mongoose.model('logins',userSchema);
module.exports = loginModel;
