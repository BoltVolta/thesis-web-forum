// require the model
const posts = require('../models/posts');

// async method that uses the functions in the model.
const getPosts = async (req, res) => {
  try {
    const response = await posts.findAll();
    if (response) {
      res.send(response);
    }
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
const getPostsById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await posts.findById(id);
    if (response) {
      res.send(response);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getPostsByTopicId = async (req, res) => {
  try {
    const topic_id = parseInt(req.params.id);
    const response = await posts.findByTopicId(topic_id);
    if (response) {
      res.send(response);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const createPost = async (req, res) => {
  const post = {
    topic_id: req.body.topic_id,
    body: req.body.body,
    created_by: req.body.created_by,
    likes: req.body.likes
  }
  console.log(post);
  try {
    const response = await posts.save(post);
    if (response) {
      post.id = response.insertId;
      res.status(201).send(post);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
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
    res.status(500).send(err);
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
    res.status(500).send(err);
  }
};

const updateLikes = async (req, res) => {
  const post = {
    likes: req.body.likes
  }
  try {
    const id = parseInt(req.params.id);
    post.id = id;
    posts.likes = post.likes + 1;
    const response = await posts.updateLikesOnPost(post);
    if (response) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

const deletePostByTopicId = async (req, res) => {
  try {
    const topic_id = parseInt(req.params.id);
    const response = await posts.deleteByTopicId(topic_id);
    if (response) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};


// export named functions
module.exports = {
  getPosts,
  getPostsById,
  createPost,
  deletePostById,
  updateLikes,
  editPost,
  deletePostByTopicId,
  getPostsByTopicId
};