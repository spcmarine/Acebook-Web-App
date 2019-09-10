var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Acebook' });
  }
};

module.exports = HomeController;
