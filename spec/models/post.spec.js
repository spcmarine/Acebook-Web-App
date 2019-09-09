var Post = require('../../models/post.js');

test('has a message', () => {
  var post = new Post('some message');
  expect(post.message).toEqual('some message');
});
