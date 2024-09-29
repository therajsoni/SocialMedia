const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter name"],
  },
  avatar: {
    public_id: String,
    url: String,
  },
  email: {
    type: String,
    required: [true, "Please enter a password"],
    unique: [true, "Email already exiests"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "password must be at least 6 characters"],
    select: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
  ]
});

userSchema.pre("save",async function (next){

  if(this.isModified('password')){
  this.password = await bcrypt.hash(this.password,10);
  }
  next();
});

userSchema.methods.matchpassword = async function(password){
return await bcrypt.compare(password,this.password);
}

userSchema.methods.generatetoken = async function(){
return jsonwebtoken.sign({_id:this._id},process.env.SECRET)  
}

module.exports = mongoose.model("User", userSchema);
