const User = require("../models/User");
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: "sample_id", url: "sampleurl" },
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exits if not account signUp please",
      });
    }
    const isMatch = await user.matchpassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "password not matched",
      });
    }

    const token = await user.generatetoken();
    const option = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, option).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if (!userToFollow) {
    return   res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    if(loggedInUser.following.includes(userToFollow._id)){
      console.log('1');      
      const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id); 
      console.log('2');      
      console.log('3');     
      loggedInUser.following.splice(indexFollowing,1);
      userToFollow.followers.splice(indexFollowers,1);

      await loggedInUser.save();
      await userToFollow.save();
      res.status(200).json({
        success : true,
        message : "User Unfollowed",
      })
    }
    else{
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);
      await loggedInUser.save();
      await userToFollow.save();
      res.status(200).json({
        success : true,
        message : "User followed",
      })
    }


     
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
