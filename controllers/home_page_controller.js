var HomePageController = {
  Index: function(req, res, next) {
    res.render('index', { title: 'Acebook' });
  }
};

module.exports = HomePageController;
