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

Template.category.events({
  "click .action-category": function(e, t) {
    console.log(this.name);
  }
});
