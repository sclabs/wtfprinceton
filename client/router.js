Router.configure({
  layoutTemplate: 'body'
});

Router.map(function() {
  this.route('all', {
    path: '/',

    action: function() {
      Session.set('state', 'browse');
      Session.set('category', 'all');
      this.render();
    },

    data: function() {
      return Issues.find();
    }
  });

  this.route('category', {
    path: '/category/:name',

    action: function() {
      Session.set('state', 'browse');
      Session.set('category', this.params.name);
      this.render();
    },

    data: function() {
      return Issues.find({category: this.params.name});
    }
  });

  this.route('submit', {
    path: '/submit',

    action: function () {
      Session.set('state', 'submit');
      Session.set('category', null);
      this.render();
    }
  });

  this.route('issue', {
    path: '/issue/:_id',

    action: function() {
      Session.set('state', 'browse');
      Session.set('category', this.getData().category);
      this.render();
    },

    data: function() {
      return Issues.findOne(this.params._id);
    }
  });

  this.route('about', {
    path: '/about',

    action: function() {
      Session.set('state', 'about');
      Session.set('category', null);
      this.render();
    }
  });
});

