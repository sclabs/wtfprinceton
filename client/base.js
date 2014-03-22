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

  "click .action-theme-princeton": function(e, t) {
    Session.set('theme', 'princeton');
  },

  "click .action-theme-bootstrap": function(e, t) {
    Session.set('theme', 'bootstrap');
  },

  "keydown .search-query": function(e, t) {
    if (e.which == 13)
      e.preventDefault();
    if (Session.get('state') != 'browse') {
      query = $("search-input").val(); 
      Router.go('all');
      $("#search-input").val(query);
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

Template.user_loggedin.netid = function() {
  return Meteor.user().profile.email.split('@')[0];
}

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

Template.user_loggedin.active_theme_princeton = function() {
  return Session.equals('theme', 'princeton') ? 'active' : '';
}

Template.user_loggedin.active_theme_bootstrap = function() {
  return Session.equals('theme', 'bootstrap') ? 'active' : '';
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

// apply theme as necessary
Deps.autorun(function() {
  if (Session.equals('theme', 'princeton')) {
    document.styleSheets[document.styleSheets.length - 1].disabled = false;
    Meteor.users.update(Meteor.userId(), {$set: {'profile.theme': 'princeton'}});
  }
  else if (Session.equals('theme', 'bootstrap')) {
    document.styleSheets[document.styleSheets.length - 1].disabled = true;
    Meteor.users.update(Meteor.userId(), {$set: {'profile.theme': 'bootstrap'}});
  }
  else {
    if (Meteor.user()) {
      if (Meteor.user().profile.theme)
        Session.set('theme', Meteor.user().profile.theme);
      else {
        document.styleSheets[document.styleSheets.length - 1].disabled = false;
        Session.set('theme', 'princeton');
        Meteor.users.update(Meteor.userId(), {$set: {'profile.theme': 'princeton'}});
      }
    }
  } 
});

// bootstrap affix the sidebar

Template.category_sidebar.rendered = function() {
  $('#sidebar').affix();
}
