const monogoose = require("mongoose");
const User = monogoose.model("User");

exports.getUsers = async(req,res) => {
    const users = await User.find().select("_id name email createAt updateAt");
    res.json(users);
};

exports.getAuthUser = () => {};

exports.getUserById = () => {};

exports.getUserProfile = () => {};

exports.getUserFeed = () => {};

exports.uploadAvatar = () => {};

exports.resizeAvatar = () => {};

exports.updateUser = () => {};

exports.deleteUser = () => {};

exports.addFollowing = () => {};

exports.addFollower = () => {};

exports.deleteFollowing = () => {};

exports.deleteFollower = () => {};
