// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { comments } = require('./data/comments');
const { users } = require('./data/users');
const { posts } = require('./data/posts');

app.use(bodyParser.json());

app.get('/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  const post = posts[postId];
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const postComments = post.comments;
  const commentsData = postComments.map((commentId) => {
    return comments[commentId];
  });
  res.json(commentsData);
});

app.post('/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  const post = posts[postId];
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const newComment = req.body;
  const newCommentId = comments.length;
  comments.push(newComment);
  post.comments.push(newCommentId);
  res.json(newComment);
});

app.put('/posts/:postId/comments/:commentId', (req, res) => {
  const postId = req.params.postId;
  const post = posts[postId];
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const commentId = req.params.commentId;
  const comment = comments[commentId];
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  const updatedComment = req.body;
  comments[commentId] = updatedComment;
  res.json(updatedComment);
});

app.delete('/posts/:postId/comments/:commentId', (req, res) => {
  const postId = req.params.postId;
  const post = posts[postId];
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const commentId = req.params.commentId;
  const comment = comments[commentId];
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  comments[commentId] = null;
  post.comments = post.comments.filter((id) =>
    id !== parseInt(commentId, 10)
  );
    res.json({ message: 'Comment deleted' });
}
);