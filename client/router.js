Router.configure({
  layoutTemplate: 'body'
});

Router.map(function () {
  this.route('all', {
    path: '/',

    action: function () {
      Session.set('state', null);
      this.render();
    }
  });

  this.route('category', {
    path: '/category/:name',

    action: function () {
      Session.set('state', this.params.name);
      this.render();
    }
  });

  this.route('submit', {
    path: '/submit',

    action: function () {
      Session.set('state', 'submit');
      this.render();
    }
  });

  this.route('issue', {
    path: '/issue/:_id',

    action: function () {
      Session.set('state', this.params._id);
      this.render();
    }
  });
});

