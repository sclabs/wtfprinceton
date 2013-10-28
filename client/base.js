Template.body.events({
  "click .action-login": function(e, t) {
    Meteor.loginWithGoogle({
      requestPermissions: ['email']
    }, function(err) {
      if (err) {
        // error handling
      } else {
        // login successful!
      }
    });
  },
  
  "click .action-logout": function(e, t) {
    Meteor.logout(function(err) {
      if (err) {
        // error handling
      } else {
        // login successful!
      }
    });
  }
});

Template.category_list.categories = function() {
  return Categories.find({});
};

Template.category.active = function() {
  return Session.equals('category', this.name) ? 'active' : '';
}

Template.navbar.active_all = function() {
  return Session.equals('category', 'all') ? 'active' : '';
}

Template.navbar.active_browse = function() {
  return Session.equals('state', 'browse') ? 'active' : '';
}

Template.navbar.active_submit = function() {
  return Session.equals('state', 'submit') ? 'active' : '';
}

Template.navbar.active_about = function() {
  return Session.equals('state', 'about') ? 'active' : '';
}

Template.navbar.active_changelog = function() {
  return Session.equals('state', 'changelog') ? 'active' : '';
}

Template.category_sidebar.active_all = function() {
  return Session.equals('category', 'all') ? 'active' : '';
}

Template.category_sidebar.rendered = function() {
  $('#sidebar').affix();
}
