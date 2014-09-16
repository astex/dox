define(['jquery', 'backbone'], function($, Backbone) {
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'api/:api': 'api',
      'endpoint/:endpoint': 'endpoint'
    },
    render: function(loc) {
      var
        router = this,
        success = function() {
          router.view.scroll(loc);
        };

      if (!router.view) {
        require(['views/index'], function(View) {
          router.view = new View({model: router.app});
          router.view.render();
          success();
        });
      } else {
        success();
      }
    },
    index: function() { this.render(); },
    api: function(api) { this.render('#' + api + '-api'); },
    endpoint: function(endpoint) { this.render('#' + endpoint + '-endpoint'); }
  });

  return new Router;
});
