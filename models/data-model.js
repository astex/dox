define(['underscore', 'backbone'], function(_, Backbone) {
  return Backbone.Model.extend({
    evaluate: function(app) {
      // Evaluates submodels referenced by this model.
      var model = this;

      // Don't evaluate the model if it has already been evaluated. We have to
      //  check this here since models can be evaluated both directly and
      //  indirectly (e.g if needed as a submodel).
      if (model.evaluated) {
        return;
      }

      var evaluate = function(obj) {
        if (typeof obj === 'string') {
          var dot = obj.indexOf('.');

          if (dot === -1) {
            // The object is not a reference.  Return it.
            return obj;
          }

          var
            name = obj.substring(0, dot),
            obj_model = app.models.findWhere({name: name});

          if (!obj_model) {
            // The object is a reference to a non-existant model.  Return it.
            return obj;
          }

          var
            payloadKey = obj.substring(dot+1),
            obj_payload = obj_model.get('payload.' + payloadKey);

          if (!obj_payload) {
            if (payloadKey in obj_model.get('payload')) {
              // Evaluate only that reference on the model if it is defined.
              obj_payload = evaluate(obj_model.get('payload')[payloadKey]);
              obj_model.set('payload.' + payloadKey, obj_payload);
            } else {
              // The object is a reference to a non-existent key on the model.
              //  Return it.
              return obj;
            }
          }

          return obj_payload;
        } else if (obj instanceof Array) {
          return _.map(obj, function(sub_obj) {
            return evaluate(sub_obj);
          });
        } else if (typeof obj === 'object') {
          var new_obj = {};
          for (var key in obj) {
            new_obj[key] = evaluate(obj[key]);
          }
          return new_obj;
        } else {
          return obj;
        }
      };

      for (var payloadKey in model.get('payload')) {
        // Set the evaluated payload to the word payload followed by the key
        //  (e.g 'payload.get').
        if (!model.get('payload.' + payloadKey)) {
          model.set(
            'payload.' + payloadKey,
            evaluate(model.get('payload')[payloadKey])
          );
        }
      }

      model.evaluated = true;
    }
  });
});
