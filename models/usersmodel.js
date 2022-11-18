const {model, Schema} = require("mongoose");
const bcrypt = require("bcrypt");
const validate = require("validator");
const jwt = require("jsonwebtoken");


const userSchema = new Schema({

    username: {
        type: String,
        required: [true, "Please enter a name."],
        minlength: [3, "username must be minimum of three(3) characters long"],
        maxlength: [20, "username must be at most 20 characters"],
        trim: true,
    },
    email: {
        type: String,
        unique : [true, "Email already exists"],
        validate: [validate.isEmail, "Please enter a valid"],
        required: [true, "Email is required"],
    },
    role: {
        type: String,
        enum : {
            values: ["user", "admin", "super"],
        },
        defaults : "user",
    },
    password : {
        type : String,
        minlength: [8, "password must be at least 8 characters"],
        required: [true, "Password is required"],
        trim: true, 
        select : false,
    },
    createdAt : {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken : String,
    resetPasswordTokenExpire : Date,

},

{timestamps : true},
);

// hashing password just before saving to Db
userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password,10);
    next();
});

// Generating jsonwebtoken
userSchema.methods.generateJwtToken = async function(){
    const token = await jwt.sign({
        id : this._id,
        username: this.username,
        role: this.role,
    },
    process.env.JWT_SECRET,

    {expiresIn: process.env.Expires_In}

    );
}

module.exports = model("User", userSchema);