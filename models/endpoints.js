define(['backbone', 'models/endpoint'], function(Backbone, Endpoint) {
  return Backbone.Collection.extend({
    model: Endpoint
  });
});
