define(['jquery', 'backbone'], function($, Backbone) {
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index'
    },
    render: function(viewFile) {
      var router = this;

      require([viewFile], function(View) {
        router.view = new View({model: router.app});
        router.view.render();
      });
    },
    index: function() {
      this.render('views/index');
    }
  });

  return new Router;
});
