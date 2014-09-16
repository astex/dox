require.config({
  paths: {
    'jquery': 'lib/js/jquery-1.10.2.min',
    'underscore': 'lib/js/underscore',
    'backbone': 'lib/js/backbone',
    'require-css': 'lib/js/require-css.min',
    'require-text': 'lib/js/require-text',
    'bootstrap': 'lib/js/bootstrap.min',
    'prism': 'lib/js/prism'
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
    },
    bootstrap: {
      deps: [
        'jquery', 'css!lib/css/bootstrap.min',
        'css!lib/css/bootstrap-theme.min'
      ]
    },
    prism: {
      deps: ['css!lib/css/prism']
    }
  },
  map: {
    '*': {
      'css': 'require-css',
      'text': 'require-text'
    }
  }
});

require(
  [
    'backbone', 'models/app', 'bootstrap'
  ], function(Backbone, App) {
    var app = new App();

    app.fetch({
      success: function() {
        app.loadData({
          success: function() {
            // The application doesn't actually render until here.
            require(['router'], function(router) {
              router.app = app;
              Backbone.history.start();
            });
          }
        });
      }
    });
  }
);
