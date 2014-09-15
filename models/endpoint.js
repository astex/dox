define(['underscore', 'backbone'], function(_, Backbone) {
    return Backbone.Model.extend({
      initialize: function() {
        _.bindAll(this, 'evaluateModel');
      },
      evaluateModel: function(endpoint_key, app) {
        // Evaluate references to a model at a given key.
        var
          endpoint = this,
          reference = this.get(endpoint_key);

        if (!reference) {
          return;
        }

        var
          dot = reference.indexOf('dot'),
          name = reference.substring(0,dot),
          model = app.models.findWhere({name: name});

        if (!model) {
          return;
        }

        var
          key = in_.substring(dot+1),
          payload = model.get('payload.' + key);

        if (!payload) {
          return;
        }

        endpoint.set(endpoint_key, payload);
      },
      evaluate: function(app) {
        // Evaluates references from in/out, errors, etc.
        var endpoint = this;

        _.each(['in', 'out'], function(key) {
          endpoint.evaluateModel(key, app);
        });
      }
    });
  }
);
