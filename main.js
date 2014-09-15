require.config({
  paths: {
    'jquery': 'lib/jquery-1.10.2.min',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'require-css': 'lib/require-css.min',
    'require-text': 'lib/require-text',
  },
  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  },
  map: {
    '*': {
      'css': 'require-css',
      'text': 'require-text'
    }
  }
});

require(['backbone', 'models/app'], function(Backbone, App) {
  var app = new App();

  app.fetch({
    success: function() {
      app.loadData({
        success: function() {
          // The application doesn't actually render until here.
          require(['router'], function(router) {
            Backbone.history.start();
          });
        }
      });
    }
  });
});
