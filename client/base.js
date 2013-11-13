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
  },

  "keypress .search-query": function(e, t) {
    if (e.which == 13) {
      e.preventDefault();
      query = $("#search-input").val();
      if (query) {
        Meteor.call('searchIssues', query, function(e, result) {
          if (typeof e === undefined)
            Session.set('searchResults', result);
          else {
            // TODO: handle the error
            console.log('an error occured while executing your search query');
          }
        });
      }
    }
  }
});

Template.category_list.categories = function() {
  return Categories.find({});
};

// active states

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

// bootstrap affix the sidebar

Template.category_sidebar.rendered = function() {
  $('#sidebar').affix();
}
