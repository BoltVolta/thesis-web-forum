// require the model
const posts = require('../models/posts');

// async method that uses the functions in the model.
const getPosts = async (req, res) => {
  const response = await posts.findAll();
  if (response) {
    res.send(response);
  }
};
const getPostsById = async (req, res) => {
  const response = await posts.findById();
  if (response) {
    res.send(response);
  }
};

const createPost = async (req, res) => {
  const post = {
    topic_id: req.body.topic_id,
    parent_id: req.body.parent_id,
    body: req.body.body,
    created_by: req.body.created_by,
    likes: req.body.likes
  }

  try {
    const response = await posts.save(post);
    if (response) {
      post.id = response.insertId;
      res.status(201).send(post);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};
const editPost = async (req, res) => {
  const post = {
    body: req.body.body,
    created_by: req.body.created_by,
    likes: req.body.likes
  }

  try {
    const response = await posts.editPost(post);
    if (response) {
      res.status(201).send(post);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const deletePostById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await posts.deleteById(id);
    if (response) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

const updateLikes = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const likes = parseInt(req.params.likes);
    const response = await posts.updateLikesOnPost(likes, id);
    if (response) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
}

// export named functions
module.exports = {
  getPosts,
  getPostsById,
  createPost,
  deletePostById,
  updateLikes,
  editPost
};