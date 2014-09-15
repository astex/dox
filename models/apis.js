define(['backbone', 'models/api'], function(Backbone, API) {
  return Backbone.Collection.extend({
    model: API
  });
});
