var HomeController = {
  Index: function(req, res) {
    res.render('index', { title: 'Acebook' });
  }
};

module.exports = HomeController;
