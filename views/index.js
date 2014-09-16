define(
  [
    'jquery', 'underscore', 'backbone', 'text!templates/index.utpl',
    'css!styles/index', 'prism'
  ], function($, _, Backbone, IndexTemplate) {
    return Backbone.View.extend({
      template: _.template(IndexTemplate),
      el: $('body'),
      render: function() {
        this.$el.html(this.template({app: this.model}));
        $(document).prop('title', this.model.get('title'));
      },
      scroll: function(loc) {
        var scroll = (loc ? $(loc).offset().top : 0);
        $('html', 'body').animate({scrollTop: scroll}, 2000);
      }
    });
  }
);
