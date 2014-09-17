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
        this.$('.error').tooltip();
      },
      scroll: function(loc) {
        var scroll = (loc ? $(loc).offset().top : 0);
        $('html, body').animate({ scrollTop: scroll });
      },
      search: function(q) {
        if (!q) {
          this.$('.api').show();
          this.$('.endpoint').show();
          return;
        }

        q = q.split(' ');

        this.$('.api').each(function() {
          var api = $(this);
          if (
              !_.all(q, function(term) {
                return api.text().toLowerCase().indexOf(
                  term.toLowerCase()
                ) !== -1;
              })
            ) {
            api.hide();
          } else {
            api.show();
          }
        });

        this.$('.endpoint').each(function() {
          var endpoint = $(this);
          if (
              !_.all(q, function(term) {
                return endpoint.text().toLowerCase().indexOf(
                  term.toLowerCase()
                ) !== -1;
              })
            ) {
            endpoint.hide();
          } else {
            endpoint.show();
          }
        });
      },
      events: {
        'click .topper': 'scrollTop',
        'click .endpoints-toggle': 'toggleEndpoints',
        'keyup #search': 'triggerSearch'
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
      },
      triggerSearch: function(e) {
        this.search(this.$('#search').val());
      }
    });
  }
);
