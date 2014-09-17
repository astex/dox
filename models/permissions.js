define(['backbone', 'models/permission'], function(Backbone, Permission) {
  return Backbone.Collection.extend({
    model: Permission
  });
});
