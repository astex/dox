define(
  [
    'jquery', 'underscore', 'backbone', 'text!templates/index.utpl',
    'css!styles/index'
  ], function($, _, Backbone, IndexTemplate) {
    return Backbone.View.extend({
      template: _.template(IndexTemplate),
      el: $('body'),
      render: function() {
        this.$el.html(this.template({app: this.model}));
      }
    });
  }
);
