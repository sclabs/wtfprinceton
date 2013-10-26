Router.configure({
  layoutTemplate: 'body'
});

Router.map(function () {
  this.route('all', {
    path: '/'
  });

  this.route('category', {
    path: '/category/:name'
  });

  this.route('submit', {
    path: '/submit'
  });

  this.route('issue', {
    path: '/issue/:_id'
  });
});

