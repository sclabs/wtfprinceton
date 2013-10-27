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
  return Session.equals('state', this.name) ? 'active' : '';
}

Template.navbar.active_all = function() {
  return Session.equals('state', null) ? 'active' : '';
}

Template.category_sidebar.active_all = function() {
  return Session.equals('state', null) ? 'active' : '';
}
