define(['backbone', 'models/data-model'], function(Backbone, DataModel) {
  return Backbone.Collection.extend({
    model: DataModel
  });
});
