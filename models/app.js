define(
  [
    'underscore',
    'backbone',
    'models/errors',
    'models/permissions',
    'models/data-models',
    'models/apis',
    'models/endpoints'
  ], function(_, Backbone, Errors, Permissions, DataModels, APIs, Endpoints) {
    return Backbone.Model.extend({
      url: 'data/app.json',
      loadData: function(opts) {
        // Load all of the documentation into this app model as a series of
        //  sub-collections.
        var 
          app = this,
          success = _.after(
            app.get('models').length + Object.keys(app.get('apis')).length + 2,
            function() {
              app.evaluateData();
              (opts && opts.success ? opts.success() : undefined);
            }
          );

        app.errors = new Errors();
        app.errors.url = app.get('errors');
        app.errors.fetch({success: success});

        app.permissions = new Permissions();
        app.permissions.url = app.get('permissions');
        app.permissions.fetch({success: success});

        _.each(app.get('models'), function(modelFile) {
          var models = new DataModels();

          models.url = modelFile;
          models.fetch({success: function() {
            var newModels = models.models;

            if (app.models) {
              newModels = app.models.models.concat(newModels);
            }
            app.models = new DataModels(newModels);

            success();
          }});
        });

        app.apis = new APIs(app.get('apis'));
        app.apis.each(function(api) {
          var
            endpointFile = api.get('endpoints'),
            endpoints = new Endpoints();

          endpoints.url = endpointFile;
          endpoints.fetch({success: function() {
            var newEndpoints = endpoints.models;

            api.endpoints = endpoints;
            if (app.endpoints) {
              newEndpoints = app.endpoints.models.concat(newEndpoints);
            }
            app.endpoints = new Endpoints(newEndpoints);

            success();
          }});
        });
      },
      evaluateData: function() {
        // Evaluates any links between the data provided in endpoints and
        //  models (e.g populates submodels, populates models into endpoints'
        //  in/out, ...).
        var app = this;

        this.models.each(function(model) {model.evaluate(app);});
        this.endpoints.each(function(endpoint) {endpoint.evaluate(app);});
      }
    });
  }
);
