define(['jquery', 'backbone'], function($, Backbone) {
  var Router = Backbone.Router.extend({
    routes: {
      '/': 'index'
    },
    render: function(controllerFile) {
      var router = this;

      require([controllerFile], function(controller) {
        if (router.view) {
          $('body').removeClass(router.view.class_);
        }

        router.view = controller();
        router.view.render();

        $(document).prop(
          'title',
          'Dox - ' + router.view.title
        );

        $('body').addClass(router.view.class_);
      });
    },
    index: function() {
      this.render('views/index');
    }
  });

  return new Router();
});
