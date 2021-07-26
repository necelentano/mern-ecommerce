const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
  const { email, name, picture } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );
  if (user) {
    console.log('USER UPDATED', user);
    res.status(200).json(user);
  } else {
    const newUser = await new User({
      email,
      name,
      picture,
    }).save();
    console.log('USER CREATED', newUser);
    res.status(200).json(newUser);
  }
};
