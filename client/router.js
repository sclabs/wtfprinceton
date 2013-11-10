Router.configure({
  layoutTemplate: 'body'
});

Router.map(function() {
  this.route('all', {
    path: '/',

    template: 'browse',

    action: function() {
      Session.set('state', 'browse');
      Session.set('category', 'all');
      this.render();
    },

    data: function() {
      issues = Issues.find({});
      return {
        issues: issues,
        count: issues.count()
      };
    }
  });

  this.route('category', {
    path: '/category/:name',

    template: 'browse',

    action: function() {
      Session.set('state', 'browse');
      Session.set('category', this.params.name);
      this.render();
    },

    data: function() {
      issues = Issues.find({category: this.params.name});
      return {
        issues: issues,
        count: issues.count()
      };
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

    template: 'issue_detail',

    notFoundTemplate: 'issueNotFound',

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

  this.route('changelog', {
    path: '/changlog',

    action: function() {
      Session.set('state', 'changelog');
      Session.set('category', null);
      this.render();
    }
  });
});

