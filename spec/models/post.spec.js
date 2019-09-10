var Post = require('../../models/post');

describe('Post model', function() {
  it('has a message', function() {
    var post = new Post('some message');
    expect(post.message).toEqual('some message');
  });

  it('can list all posts', function() {
    var posts = Post.all();
    expect(posts).toEqual([]);
  });

  it('can save a post', function() {
    var post = new Post('some message');
    post.save();
    expect(Post.all()).toContain(post);
  });
});
