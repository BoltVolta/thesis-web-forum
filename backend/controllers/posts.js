// require the model
const posts = require('../models/posts');

// async method that uses the functions in the model.
const getPosts = async (req, res) => {
  const response = await posts.findAll();
  if (response) {
    res.send(response);
  }
};

// export named functions
module.exports = {
  getPosts
};