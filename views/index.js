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
        this.$('.error, .permission').tooltip();
        this.$('.endpoint .body').hide();
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

        var matches = function(obj) {
          return _.all(q, function(term) {
            return $(obj).text().toLowerCase().indexOf(
              term.toLowerCase()
            ) !== -1;
          });
        };

        this.$('.endpoint').each(function() {
          if (!matches(this)) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });

        this.$('.api').each(function() {
          if (!_.any($(this).find('.endpoint'), matches)) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
      },
      events: {
        'click .topper': 'scrollTop',
        'click .endpoints-toggle': 'toggleEndpointLinks',
        'click .endpoint>.head': 'toggleEndpoint',
        'click .endpoint>.method': 'toggleEndpoint',
        'keyup #search': 'triggerSearch'
      },
      scrollTop: function(e) {
        e.preventDefault();
        this.scroll();
      },
      toggleEndpointLinks: function(e) {
        e.preventDefault();
        var
          $el = $(e.target),
          api_name = $el.parents('.api-link').data('api'),
          endpoint_links = this.$('.' + api_name + '-endpoint-link');

        endpoint_links.slideToggle();
      },
      toggleEndpoint: function(e) {
        var
          head = $(e.target),
          endpoint = head.parents('.endpoint'),
          body = endpoint.find('.body'),
          wasHidden = body.is(':hidden');

        body.slideToggle();
        // Scroll to the newly visible element.
        if (wasHidden) {
          this.scroll(endpoint);
        }
      },
      triggerSearch: function(e) {
        this.search(this.$('#search').val());
      }
    });
  }
);
