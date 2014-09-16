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
        this.$('.endpoint-link').hide();
      },
      scroll: function(loc) {
        var scroll = (loc ? $(loc).offset().top : 0);
        $('html, body').animate({ scrollTop: scroll });
      },
      events: {
        'click .topper': 'scrollTop',
        'click .endpoints-toggle': 'toggleEndpoints'
      },
      scrollTop: function(e) {
        e.preventDefault();
        this.scroll();
      },
      toggleEndpoints: function(e) {
        e.preventDefault();
        var
          $el = $(e.target),
          api_name = $el.parents('.api-link').data('api'),
          endpoint_links = this.$('.' + api_name + '-endpoint-link');

        endpoint_links.slideToggle();
      }
    });
  }
);
