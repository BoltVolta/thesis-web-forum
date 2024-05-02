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
const getPostCount = async (req, res) => {
  try {
    const topic_id = parseInt(req.params.id);
    const response = await posts.findAllWithTopicId(topic_id);
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
  const postId = parseInt(req.params.id);
  const post = {
    body: req.body.body,
    updated: req.body.updated
  }

  try {
    const response = await posts.editPost(post, postId);
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

const addLike = async (req, res, next) => {
  const postId = parseInt(req.params.id);
  const { userId, vote } = req.body;

  const post = await posts.findById(postId);
  if (!post) {
    const error = new Error(`Post with ID ${postId} not found`);
    error.statusCode = 404;
    return next(error);
  }
  const userLiked = post.wholiked && post.wholiked[userId];
  if (userLiked) {
    const error = new Error(`You have already liked this reply`);
    error.statusCode = 400;
    return next(error);
  }
  const like = await posts.addLikeById(vote, userId, postId);
  if (!like) {
    const error = new Error(`Something went wrong`);
    error.statusCode = 404;
    return next(error);
  }

  post.likes = post.likes + vote;
  post.wholiked = userId;
  res.json({ post });
};


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
  addLike,
  editPost,
  deletePostByTopicId,
  getPostsByTopicId,
  getPostCount
};