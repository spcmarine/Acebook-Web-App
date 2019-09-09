var Post = require('../../models/post.js');

test('has a message', function() {
  var post = new Post('some message');
  expect(post.message).toEqual('some message');
});

test('can list all posts', function() {
  var posts = Post.all();
  expect(posts).toEqual([]);
});

test('can save a post', function() {
  var post = new Post('some message');
  post.save();
  expect(Post.all()).toContain(post);
});
