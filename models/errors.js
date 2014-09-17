define(['backbone', 'models/error'], function(Backbone, Error) {
  return Backbone.Collection.extend({
    model: Error
  });
});
