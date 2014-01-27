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

  "click .action-sort-hot": function(e, t) {
    Session.set('sort', {name: 'Hot', specifier: {hot: -1}});
  },

  "click .action-sort-new": function(e, t) {
    Session.set('sort', {name: 'New', specifier: {timestamp: -1}});
  },

  "keyup .search-query": function(e, t) {
    if (e.which == 13)
      e.preventDefault();
    if (Session.get('state') != 'browse') {
      Router.go('all');
    }
    query = $("#search-input").val();
    if (query) {
      Meteor.call('searchIssues', query, function(e, result) {
        if (result)
          Session.set('searchResults', result);
        else {
          // TODO: handle the error
          console.log('an error occured while executing your search query');
        }
      });
    }
    else
      Session.set('searchResults', null);
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

Template.navbar.sort = function() {
  sort = Session.get('sort');
  if (sort && sort.name)
    return sort.name;
  Session.set('sort', {name: 'Hot', specifier: {hot: -1}});
  return 'Hot'
}

Template.navbar.active_hot = function() {
  sort = Session.get('sort');
  if (sort && sort.name == 'Hot')
    return 'active'
  return ''
}

Template.navbar.active_new = function() {
  sort = Session.get('sort');
  if (sort && sort.name == 'New')
    return 'active'
  return ''
}

// bootstrap affix the sidebar

Template.category_sidebar.rendered = function() {
  $('#sidebar').affix();
}
